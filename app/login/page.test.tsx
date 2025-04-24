import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getSettings } from '../admin/lib/actions';
import { validateAdminUserNotExists } from './lib/actions';
import Page from './page';
import LoginForm from './partials/LoginForm';

const mocks = vi.hoisted(() => {
  return {
    loadSettings: vi.fn(),
    validateAdminUserNotExists: vi.fn(),
  };
});

vi.mock('../admin/lib/actions', () => ({
  loadSettings: mocks.loadSettings,
}));

vi.mock('./lib/actions', () => ({
  validateAdminUserNotExists: mocks.validateAdminUserNotExists,
}));

vi.mock('./partials/LoginForm', () => ({
  default: vi.fn(({ allowReg }) => (
    <div>
      LoginForm <div>allowReg: {allowReg ? 'true' : 'false'}</div>
    </div>
  )),
}));

describe('Login Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render LoginForm with allowReg as false when settings.allowReg is undefined', async () => {
    mocks.loadSettings.mockResolvedValueOnce({});

    render(await Page());

    expect(validateAdminUserNotExists).toHaveBeenCalled();
    expect(getSettings).toHaveBeenCalled();
    // Don't know why but it needs a second arg to be undefined...
    expect(LoginForm).toHaveBeenCalledWith({ allowReg: false }, undefined);
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
  });

  it('should render LoginForm with allowReg as true when settings.allowReg is true', async () => {
    mocks.loadSettings.mockResolvedValueOnce({ allowReg: true });

    render(await Page());

    expect(validateAdminUserNotExists).toHaveBeenCalled();
    expect(getSettings).toHaveBeenCalled();
    expect(LoginForm).toHaveBeenCalledWith({ allowReg: true }, undefined);
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
  });
});
