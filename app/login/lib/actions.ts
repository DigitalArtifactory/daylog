'use server';

import type { Session, User } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

import { loadSettings } from '@/app/admin/lib/script';
import { validateTOTP } from '@/utils/totp';
import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { createHash } from 'crypto';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { setSessionTokenCookie } from './cookies';
import {
  FormState,
  SigninFormSchema,
  ValidateMFAFormSchema,
  ValidateMFAFormState,
} from './definitions';

const prisma = new PrismaClient();

export async function validateAdminUserNotExists() {
  const admin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (!admin) redirect('/register/init');
}

export async function generateSessionToken(): Promise<string> {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export async function signin(state: FormState, formData: FormData) {
  const result = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  let goMFA = false;
  let userId: number | null = null;
  try {
    if (!result.success) {
      return {
        data: result.data,
        errors: result.error.flatten().fieldErrors,
      };
    }

    const hashedPassword = createHash('sha256')
      .update(result.data.password)
      .digest('hex');
    const record = await prisma.user.findFirst({
      where: { email: result.data.email, password: hashedPassword },
    });

    if (!record) {
      return {
        data: result.data,
        message: 'An error occurred while validating your credentials.',
      };
    }

    const settings = await loadSettings();
    if (record.mfa && settings?.mfa) {
      goMFA = record.mfa;
      userId = record.id;
    } else {
      await generateUserSession(record);
    }
  } catch (e) {
    console.error(e);
    return {
      data: result.data,
      message: 'An error occurred while sing in to your account.',
    };
  }
  if (goMFA && userId !== null) {
    revalidatePath(`/login/otp/${userId}`);
    redirect(`/login/otp/${userId}`);
  } else {
    revalidatePath('/');
    redirect('/');
  }
}

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);

export async function validateMFA(
  state: ValidateMFAFormState,
  formData: FormData
) {
  const data = {
    id: Number(formData.get('id')),
    password: formData.get('password'),
  };

  const result = ValidateMFAFormSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      data: data,
      success: false,
    };
  }

  try {
    const record = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!record) {
      throw new Error('User not found.');
    }

    const secret = record.secret;
    if (!secret) {
      throw new Error('Secret not found');
    }

    if (!validateTOTP(secret, result.data.password)) {
      return {
        data: result.data,
        message: 'OTP is not valid or is expired.',
      };
    }

    await generateUserSession(record);
  } catch (e) {
    return {
      data: result.data,
      message: 'An error occurred while validating your OTP.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

async function generateUserSession(record: {
  name: string | null;
  id: number;
  email: string;
  password: string;
  secret: string | null;
  mfa: boolean;
  role: string;
  terms: string;
}) {
  const token = await generateSessionToken();
  const session = await createSession(token, record!.id);
  await setSessionTokenCookie(
    token,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  );
}

export async function getUserMFA(userId: number) {
  try {
    const record = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!record) {
      throw new Error('User not found.');
    }

    return record.mfa;
  } catch (e) {
    return false;
  }
}
