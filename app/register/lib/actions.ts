'use server';

import { PrismaClient } from '@prisma/client';
import { FormState, SignupFormSchema } from './definitions';

const prisma = new PrismaClient();

export async function signup(state: FormState, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    terms: formData.get('terms'),
  };

  const result = SignupFormSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      data: data,
      success: false,
    };
  }

  try {
    // Changes the "on" value of checkbox to "accept"
    result.data.terms = 'accept';

    // Check if the user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        message: 'User already exists.',
        success: false,
      };
    }

    await prisma.user.create({ data: result.data });

    return {
      success: true,
    };
  } catch (e) {
    return {
      data: result.data,
      message: 'An error occurred while creating your account.',
    };
  }
}
