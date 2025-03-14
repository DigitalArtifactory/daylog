import { prismaMock } from '@/prisma/singleton';
import { cleanup } from '@testing-library/react';
import nodemailer from 'nodemailer';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reset } from './actions';

const mocks = vi.hoisted(() => ({
  hashPassword: vi.fn().mockReturnValue('mocked-hash'),
  createTransport: vi.fn(),
  sendMail: vi.fn(),
  ResetFormSchema: vi.fn(),
}));

vi.mock('@/utils/crypto', () => ({
  hashPassword: mocks.hashPassword,
}));

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mocks.createTransport.mockReturnValue({
      sendMail: mocks.sendMail,
    }),
  },
}));

vi.mock('nodemailer/lib/smtp-transport', () => ({
  default: vi.fn().mockImplementation(() => ({})),
}));

describe('reset', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should return errors if form data is invalid', async () => {
    const formData = new FormData();
    formData.append('email', 'invalid-email');

    const result = await reset({}, formData);

    expect(result.errors).toBeDefined();
  });

  it('should return message if email is not registered', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    prismaMock.user.findFirst.mockResolvedValue(null);

    const result = await reset({}, formData);

    expect(result.message).toBe('This email is no registered.');
  });

  it('should reset password and send email if email is registered', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    const user = {
      id: 1,
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123#',
      mfa: false,
      role: 'user',
      terms: 'accept',
      secret: '',
    };
    prismaMock.user.findFirst.mockResolvedValue(user);
    mocks.sendMail.mockResolvedValue({ messageId: '123' });

    const result = await reset({}, formData);

    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: user.id },
      data: { password: 'mocked-hash' },
    });
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: `"daylog accounts" <${process.env.SMTP_SERVER_USER}>`,
      to: user.email,
      subject: 'Account password reset',
      text: expect.stringContaining('Your account password has been reset'),
    });
    expect(result.success).toBe(true);
  });

  it('should return error message if an exception occurs', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    vi.spyOn(console, 'error').mockImplementation(() => {});
    prismaMock.user.findFirst.mockRejectedValue(new Error('Database error'));

    const result = await reset({}, formData);

    expect(result.message).toBe(
      'An error occurred while reseting your account.'
    );
  });
});
