import { z } from 'zod';

export const ProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, { message: t('nameError') })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  });

export const PasswordFormSchema = (t: (key: string) => string) =>
  z.object({
    current: z
      .string()
      .min(1, { message: t('currentError') })
      .trim(),
    password: z
      .string()
      .min(1, { message: t('newError') })
      .trim(),
    confirm: z
      .string()
      .min(1, { message: t('confirmError') })
      .trim(),
  });

export const UpdateMFAFormSchema = z.object({
  secret: z
    .string()
    .trim()
    .min(1, { message: 'Secret has not been generated.' }),
  password: z.string().trim().min(1, { message: 'TOTP is required.' }),
});

export const DeleteMFAFormSchema = z.object({
  password: z.string().trim().min(1, { message: 'TOTP is required.' }),
});

export const BackupFormSchema = z.object({ userId: z.number() });

export const DeleteAccountFormSchema = (t: (key: string) => string) =>
  z.object({
    userId: z.number(),
    password: z
      .string()
      .min(1, { message: t('passwordError') })
      .trim(),
  });

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

export type DeleteAccountFormState =
  | {
      errors?: {
        userId?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type MFAFormState =
  | {
      errors?: {
        secret?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type MFAValidationFormState =
  | {
      errors?: {
        password?: string[];
      };
      message?: string;
    }
  | undefined;
