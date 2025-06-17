import { z } from 'zod';

export const SigninFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email({ message: t('emailError') })
      .trim(),
    password: z
      .string()
      .min(1, { message: t('passwordError') })
      .trim(),
  });

export const ValidateMFAFormSchema = (t: (key: string) => string) =>
  z.object({
    password: z
      .string()
      .min(1, { message: t('passwordError') })
      .trim(),
  });

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type ValidateMFAFormState =
  | {
      errors?: {
        password?: string[];
      };
      message?: string;
    }
  | undefined;
