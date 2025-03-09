import { prismaMock } from '@/prisma/singleton';
import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { signup, validateAllowRegistration } from './actions';

const mocks = vi.hoisted(() => ({
  loadSettings: vi.fn(),
  hashPassword: vi.fn().mockReturnValue('mocked-hash'),
  SignupFormSchema: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('@/app/admin/lib/actions', () => ({
  loadSettings: mocks.loadSettings,
}));

vi.mock('@/utils/crypto', async () => ({
  hashPassword: mocks.hashPassword,
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

describe('signup', () => {
  const securePassword = 'SecurePassword123#';
  const unsecurePassword = 'UnsecurePassword';
  const mockFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  it('should return errors if form data is invalid', async () => {
    const formData = mockFormData({
      name: '',
      email: '',
      password: '',
      terms: '',
    });

    const result = await signup({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('should return errors if password is insecure', async () => {
    const formData = mockFormData({
      name: 'John',
      email: 'john@example.com',
      password: unsecurePassword,
      terms: 'on',
    });

    const result = await signup({}, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.password).toBeDefined();
  });

  it('should return error if user already exists', async () => {
    const formData = mockFormData({
      name: 'John',
      email: 'john@example.com',
      password: securePassword,
      terms: 'on',
    });

    mocks.SignupFormSchema.mockReturnValue({
      data: formData,
    });

    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      name: null,
      email: '',
      password: '',
      terms: '',
      secret: null,
      mfa: false,
      role: '',
    });

    const result = await signup({}, formData);

    expect(result.success).toEqual(false);
    expect(result.message).toBe('User already exists.');
  });

  it('should create a new user if data is valid and user does not exist', async () => {
    const data = {
      name: 'John',
      email: 'john@example.com',
      password: securePassword,
      terms: 'on',
    };
    const formData = mockFormData(data);
    mocks.SignupFormSchema.mockReturnValue({
      success: true,
      data: formData,
    });
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await signup({}, formData);

    expect(result.success).toBe(true);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: { ...data, password: 'mocked-hash', terms: 'accept' },
    });
  });

  it('should return error if an exception occurs', async () => {
    const formData = mockFormData({
      name: 'John',
      email: 'john@example.com',
      password: securePassword,
      terms: 'on',
    });
    mocks.SignupFormSchema.mockReturnValue({
      success: true,
      data: formData,
    });
    prismaMock.user.findUnique.mockRejectedValue(new Error('DB error'));

    const result = await signup({}, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'An error occurred while creating your account.'
    );
  });
});

describe('validateAllowRegistration', () => {
  it('should redirect to login if registration is not allowed', async () => {
    mocks.loadSettings.mockResolvedValue({ allowReg: false });

    await validateAllowRegistration();
    expect(redirect).toHaveBeenCalledWith('login');
  });

  it('should not redirect if registration is allowed', async () => {
    mocks.loadSettings.mockResolvedValue({ allowReg: true });

    await validateAllowRegistration();
    expect(redirect).not.toHaveBeenCalled();
  });
});
