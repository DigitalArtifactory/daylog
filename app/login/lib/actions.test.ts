import { prismaMock } from '@/prisma/singleton';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  getUserMFA,
  invalidateSession,
  signin,
  validateAdminUserNotExists,
  validateMFA,
  validateSessionToken,
} from './actions';

const mocks = vi.hoisted(() => ({
  getSettings: vi.fn(),
  encodeBase32: vi.fn().mockReturnValue('mocked-token'),
  encodeHex: vi.fn().mockReturnValue('mocked-session-id'),
  hashPassword: vi.fn().mockReturnValue('mocked-hash'),
  validateTOTP: vi.fn().mockReturnValue(true),
  SigninFormSchema: {
    safeParse: vi.fn(),
  },
  ValidateMFAFormSchema: {
    safeParse: vi.fn(),
  },
  revalidatePath: vi.fn(),
  redirect: vi.fn(),
  setSessionTokenCookie: vi.fn(),
  cookies: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue({ value: 'mocked-token' }),
  }),
}));

vi.mock('@/app/admin/lib/actions', () => ({
  getSettings: mocks.getSettings,
}));

vi.mock('@/utils/crypto', () => ({
  encodeBase32: mocks.encodeBase32,
  encodeHex: mocks.encodeHex,
  hashPassword: mocks.hashPassword,
}));

vi.mock('@/utils/totp', () => ({
  validateTOTP: mocks.validateTOTP,
}));

vi.mock('@/utils/delay', () => ({
  randomDelay: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('next/cache', () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('next/headers', () => ({
  cookies: mocks.cookies,
}));

vi.mock('./cookies', () => ({
  setSessionTokenCookie: mocks.setSessionTokenCookie,
}));

describe('validateAdminUserNotExists', () => {
  it('should redirect to /register/init if no admin user exists', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    await validateAdminUserNotExists();

    expect(redirect).toHaveBeenCalledWith('/register/init');
  });

  it('should not redirect if an admin user exists', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      id: 1,
      role: 'admin',
      name: null,
      email: '',
      password: '',
      secret: null,
      mfa: false,
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
      failedAttempts: null,
      lockUntil: null,
    });

    await validateAdminUserNotExists();

    expect(redirect).not.toHaveBeenCalled();
  });
});

describe('generateSessionToken', () => {
  it('should generate a session token', async () => {
    const token = await generateSessionToken();

    expect(token).toBe('mocked-token');
  });
});

describe('createSession', () => {
  it('should create a session', async () => {
    const session = await createSession('mocked-token', 1);

    expect(session).toEqual({
      id: 'mocked-session-id',
      userId: 1,
      expiresAt: expect.any(Date),
    });
    expect(prismaMock.session.create).toHaveBeenCalledWith({
      data: session,
    });
  });
});

describe('validateSessionToken', () => {
  it('should return session and user if token is valid', async () => {
    const mockSession = {
      id: 'mocked-session-id',
      userId: 1,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      user: { id: 1, email: 'test@example.com' },
    };
    prismaMock.session.findUnique.mockResolvedValue(mockSession);

    const result = await validateSessionToken('mocked-token');

    expect(result).toEqual({
      session: {
        id: 'mocked-session-id',
        userId: 1,
        expiresAt: expect.any(Date),
      },
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('should return null if token is invalid', async () => {
    prismaMock.session.findUnique.mockResolvedValue(null);

    const result = await validateSessionToken('mocked-token');

    expect(result).toEqual({ session: null, user: null });
  });
});

describe('invalidateSession', () => {
  it('should delete the session', async () => {
    await invalidateSession('mocked-session-id');

    expect(prismaMock.session.delete).toHaveBeenCalledWith({
      where: { id: 'mocked-session-id' },
    });
  });
});

describe('signin', () => {
  const mockFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout'], shouldAdvanceTime: true });
  });

  it('should return errors if form data is invalid', async () => {
    mocks.SigninFormSchema.safeParse.mockReturnValue({
      success: false,
      error: { flatten: () => ({ fieldErrors: { email: 'Invalid email' } }) },
    });

    const formData = mockFormData({ email: '', password: '' });
    const result = await signin({}, formData);

    expect(result.errors).toBeDefined();
  });

  it('should redirect to /login/otp if MFA is enabled', async () => {
    mocks.SigninFormSchema.safeParse.mockReturnValue({
      success: true,
      data: { email: 'test@example.com', password: 'password' },
    });
    prismaMock.user.findFirst.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'mocked-hash',
      mfa: true,
      name: null,
      secret: null,
      role: '',
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
      failedAttempts: null,
      lockUntil: null,
    });
    mocks.getSettings.mockResolvedValue({ mfa: true });

    const formData = mockFormData({
      email: 'test@example.com',
      password: 'password',
    });

    await signin({}, formData);

    expect(mocks.revalidatePath).toHaveBeenCalledWith('/login/otp/1');
    expect(redirect).toHaveBeenCalledWith('/login/otp/1');
  });

  it('should redirect to / if signin is successful', async () => {
    mocks.SigninFormSchema.safeParse.mockReturnValue({
      success: true,
      data: { email: 'test@example.com', password: 'password' },
    });
    prismaMock.user.findFirst.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'mocked-hash',
      mfa: false,
      name: null,
      secret: null,
      role: '',
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
      failedAttempts: null,
      lockUntil: null,
    });
    mocks.getSettings.mockResolvedValue({ mfa: false });

    const formData = mockFormData({
      email: 'test@example.com',
      password: 'password',
    });
    await signin({}, formData);

    expect(mocks.revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });
});

describe('getCurrentSession', () => {
  it('should return session and user if token is valid', async () => {
    const mockSession = {
      id: 'mocked-session-id',
      userId: 1,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      user: { id: 1, email: 'test@example.com' },
    };
    prismaMock.session.findUnique.mockResolvedValue(mockSession);

    const result = await getCurrentSession();

    expect(result).toEqual({
      session: {
        id: 'mocked-session-id',
        userId: 1,
        expiresAt: expect.any(Date),
      },
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('should return null if token is invalid', async () => {
    prismaMock.session.findUnique.mockResolvedValue(null);

    const result = await getCurrentSession();

    expect(result).toEqual({ session: null, user: null });
  });
});

describe('validateMFA', () => {
  const mockFormData = (data: Record<string, string>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  it('should return errors if form data is invalid', async () => {
    mocks.ValidateMFAFormSchema.safeParse.mockReturnValue({
      success: false,
      error: {
        flatten: () => ({ fieldErrors: { password: 'Invalid password' } }),
      },
    });

    const formData = mockFormData({ id: '1', password: '' });
    const result = await validateMFA({}, formData);

    expect(result.errors).toBeDefined();
  });

  it('should redirect to / if MFA validation is successful', async () => {
    mocks.ValidateMFAFormSchema.safeParse.mockReturnValue({
      success: true,
      data: { id: 1, password: '123456' },
    });
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      secret: 'mocked-secret',
      name: null,
      email: '',
      password: '',
      mfa: false,
      role: '',
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
      failedAttempts: null,
      lockUntil: null,
    });

    const formData = mockFormData({ id: '1', password: '123456' });
    await validateMFA({}, formData);

    expect(mocks.revalidatePath).toHaveBeenCalledWith('/');
    expect(redirect).toHaveBeenCalledWith('/');
  });
});

describe('getUserMFA', () => {
  it('should return MFA status of the user', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      mfa: true,
      name: null,
      email: '',
      password: '',
      secret: null,
      role: '',
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
      failedAttempts: null,
      lockUntil: null,
    });

    const result = await getUserMFA(1);

    expect(result).toBe(true);
  });

  it('should return false if user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await getUserMFA(1);

    expect(result).toBe(false);
  });
});
