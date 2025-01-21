'use server';

import type { Session, User } from '@prisma/client';

import { PrismaClient } from '@prisma/client';

import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { setSessionTokenCookie } from './cookies';
import { FormState, SigninFormSchema } from './definitions';

const prisma = new PrismaClient();

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
  try {
    if (!result.success) {
      return {
        data: result.data,
        errors: result.error.flatten().fieldErrors,
      };
    }

    const record = await prisma.user.findFirst({
      where: { email: result.data.email, password: result.data.password },
    });

    if (!record) {
      return {
        data: result.data,
        message: 'An error occurred while validating your credentials.',
      };
    }

    const token = await generateSessionToken();
    const session = await createSession(token, record!.id);
    await setSessionTokenCookie(
      token,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    );
  } catch (e) {
    console.error(e);
    return {
      data: result.data,
      message: 'An error occurred while sing in to your account.',
    };
  }

  revalidatePath('/boards');
  redirect('/boards');
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
