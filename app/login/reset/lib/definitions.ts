import { z } from 'zod';

export const ResetFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t('emailError') }).trim(),
  });

export type FormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;
