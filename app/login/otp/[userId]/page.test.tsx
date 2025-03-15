import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import OTPLogin from './page';

const mocks = vi.hoisted(() => ({
  getUserMFA: vi.fn(),
}));

vi.mock('../../lib/actions', () => ({
  getUserMFA: mocks.getUserMFA,
}));
vi.mock('./partials/OTPLoginForm', () => ({
  default: vi.fn(() => <div>OTPLoginForm</div>),
}));

describe('Home', () => {
  it('renders the OTPLoginForm when MFA is enabled', async () => {
    mocks.getUserMFA.mockResolvedValue(true);
    const params = Promise.resolve({ userId: '1' });

    render(await OTPLogin({ params }));

    expect(await screen.findByText('OTPLoginForm')).toBeInTheDocument();
  });

  it('renders "Not allowed." when MFA is not enabled', async () => {
    mocks.getUserMFA.mockResolvedValue(false);
    const params = Promise.resolve({ userId: '1' });

    render(await OTPLogin({ params }));

    expect(await screen.findByText('Not allowed.')).toBeInTheDocument();
  });
});
