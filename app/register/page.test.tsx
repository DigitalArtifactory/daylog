import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { validateAdminUserNotExists } from '../login/lib/actions';
import { validateAllowRegistration } from './lib/actions';
import Page from './page';

const mocks = vi.hoisted(() => {
  return {
    validateAdminUserNotExists: vi.fn(),
    validateAllowRegistration: vi.fn(),
  };
});

vi.mock('../login/lib/actions', () => ({
  validateAdminUserNotExists: mocks.validateAdminUserNotExists,
}));

vi.mock('./lib/actions', () => ({
  validateAllowRegistration: mocks.validateAllowRegistration,
}));

vi.mock('./partials/RegisterForm', () => ({
  default: vi.fn(() => <div>RegisterForm</div>),
}));

describe('Page', () => {
  it('renders RegisterForm after validations', async () => {
    vi.mocked(mocks.validateAdminUserNotExists).mockResolvedValueOnce(true);
    vi.mocked(mocks.validateAllowRegistration).mockResolvedValueOnce(true);

    render(await Page());

    expect(validateAdminUserNotExists).toHaveBeenCalled();
    expect(validateAllowRegistration).toHaveBeenCalled();
    expect(screen.getByText('RegisterForm')).toBeDefined();
  });
});
