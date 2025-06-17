import { z } from 'zod';

export const InitSignupFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, { message: t('nameError') })
      .trim(),
    email: z
      .string()
      .email({ message: t('emailError') })
      .trim(),
    password: z
      .string()
      .min(8, { message: t('passwordHint.0') })
      .regex(/[a-zA-Z]/, { message: t('passwordHint.1') })
      .regex(/[0-9]/, { message: t('passwordHint.2') })
      .regex(/[^a-zA-Z0-9]/, {
        message: t('passwordHint.3'),
      })
      .trim(),
  });

export type InitFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
