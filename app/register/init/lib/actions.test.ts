import { prismaMock } from '@/prisma/singleton';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { signupInit, validateAdminUserExists } from './actions';
import { InitFormState } from './definitions';

const mocks = vi.hoisted(() => ({
  redirect: vi.fn(),
  revalidatePath: vi.fn(),
  hashPassword: vi.fn().mockReturnValue('hashedPassword'),
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('next/cache', () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock('@/utils/crypto', () => ({
  hashPassword: mocks.hashPassword,
}));

describe('validateAdminUserExists', () => {
  const securePassword = 'SecurePassword123#';
  it('should redirect to /login if an admin user exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      role: 'admin',
      id: 0,
      name: null,
      email: '',
      password: '',
      secret: null,
      mfa: false,
      terms: '',
    });

    await validateAdminUserExists();

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should not redirect if no admin user exists', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    await validateAdminUserExists();

    expect(redirect).not.toHaveBeenCalled();
  });

  describe('validateAdminUserExists', () => {
    it('should redirect to /login if an admin user exists', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce({
        role: 'admin',
        id: 0,
        name: null,
        email: '',
        password: '',
        secret: null,
        mfa: false,
        terms: '',
      });

      await validateAdminUserExists();

      expect(redirect).toHaveBeenCalledWith('/login');
    });

    it('should not redirect if no admin user exists', async () => {
      prismaMock.user.findFirst.mockResolvedValueOnce(null);

      await validateAdminUserExists();

      expect(redirect).not.toHaveBeenCalled();
    });
  });

  describe('signupInit', () => {
    it('should return errors if form data is invalid', async () => {
      const formData = new FormData();
      formData.append('name', '');
      formData.append('email', 'invalid-email');
      formData.append('password', 'short');

      const state = {} as InitFormState;

      const result = await signupInit(state, formData);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should return message if user already exists', async () => {
      const formData = new FormData();
      formData.append('name', 'Admin');
      formData.append('email', 'admin@example.com');
      formData.append('password', securePassword);

      const state = {} as InitFormState;

      prismaMock.user.findUnique.mockResolvedValueOnce({
        role: 'admin',
        id: 0,
        name: 'Admin',
        email: 'admin@example.com',
        password: 'hashedPassword',
        secret: null,
        mfa: false,
        terms: 'accept',
      });

      const result = await signupInit(state, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('User already exists.');
    });

    it('should create a new admin user if valid data is provided', async () => {
      const formData = new FormData();
      formData.append('name', 'Admin');
      formData.append('email', 'admin@example.com');
      formData.append('password', securePassword);

      const state = {} as InitFormState;

      prismaMock.user.findUnique.mockResolvedValueOnce(null);

      const result = await signupInit(state, formData);

      expect(result.success).toBe(true);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          password: 'hashedPassword',
          terms: 'accept',
          role: 'admin',
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    });

    it('should return an error message if an exception occurs', async () => {
      const formData = new FormData();
      formData.append('name', 'Admin');
      formData.append('email', 'admin@example.com');
      formData.append('password', securePassword);

      const state = {} as InitFormState;

      prismaMock.user.findUnique.mockRejectedValueOnce(
        new Error('Database error')
      );

      const result = await signupInit(state, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe(
        'An error occurred while creating your admin account.'
      );
    });
  });
});
