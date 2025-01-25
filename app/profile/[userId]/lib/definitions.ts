import { z } from 'zod';

export const ProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
});

export const PasswordFormSchema = z.object({
  current: z
    .string()
    .min(1, { message: 'Current password is required.' })
    .trim(),
  password: z.string().min(1, { message: 'New password is required.' }).trim(),
  confirm: z
    .string()
    .min(1, { message: 'Password confirmation is required.' })
    .trim(),
});

export const BackupFormSchema = z.object({ userId: z.number() });

export type PasswordFormState =
  | {
      errors?: {
        current?: string[];
        password?: string[];
        confirm?: string[];
      };
      message?: string;
    }
  | undefined;

export type ProfileFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export type BackupFormState =
  | {
      errors?: {
        userId?: string[];
      };
      message?: string;
    }
  | undefined;
