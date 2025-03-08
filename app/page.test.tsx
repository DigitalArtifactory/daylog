import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import { getCurrentSession } from './login/lib/actions';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('./login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('../components/Page', () => ({
  default: vi.fn(() => <div>Page</div>),
}));

describe('Home Page', () => {
  it('redirects to login if user is not authenticated', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({
      user: null,
      session: null,
    });

    render(await Home());

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('renders the home page if user is authenticated', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({
      user: {
        name: 'John Doe',
        id: 0,
        email: '',
        password: '',
        secret: null,
        mfa: false,
        role: '',
        terms: '',
      },
      session: {
        id: '',
        userId: 0,
        expiresAt: new Date(),
      },
    });

    render(await Home());

    expect(redirect).not.toHaveBeenCalledWith('/login');
    expect(screen.getByText('Page')).toBeDefined();
  });
});
