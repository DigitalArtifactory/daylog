import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { validateAdminUserExists } from './lib/actions';
import Page from './page';

const mocks = vi.hoisted(() => ({
  validateAdminUserExists: vi.fn(),
  InitRegisterForm: vi.fn(),
}));

vi.mock('./lib/actions', () => ({
  validateAdminUserExists: mocks.validateAdminUserExists,
}));

vi.mock('./partials/InitRegisterForm', () => ({
  default: vi.fn(() => <div>InitRegisterForm</div>),
}));

describe('Page', () => {
  it('should call validateAdminUserExists and render InitRegisterForm', async () => {
    mocks.validateAdminUserExists.mockResolvedValueOnce(true);

    render(await Page());

    expect(validateAdminUserExists).toHaveBeenCalled();
    expect(screen.getByText('InitRegisterForm')).toBeDefined();
  });
});
