import { cleanup, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Profile from './page';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  getProfile: vi.fn(),
  loadSettings: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('../../login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('./lib/actions', () => ({
  getProfile: mocks.getProfile,
  loadSettings: mocks.loadSettings,
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('@/components/Page', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageContainer', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageHeader', () => ({
  default: vi.fn(({ preTitle, title }: { preTitle: string; title: string }) => (
    <div>
      <div>{preTitle}</div>
      <div>{title}</div>
    </div>
  )),
}));

vi.mock('@/components/PageBody', () => ({
  default: vi.fn(),
}));

vi.mock('@/components/NavHeader', () => ({
  default: vi.fn(() => <div>NavHeader</div>),
}));

vi.mock('@/components/NavMenu', () => ({
  default: vi.fn(() => <div>NavMenu</div>),
}));

describe('Profile Page', () => {
  const mockParams = { userId: '1' };

  beforeEach(() => {
    cleanup();
  });

  it('should redirect to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });

    await Profile({ params: Promise.resolve(mockParams) });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should render "No profile page found" if profile is null', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: { id: 1 } });
    mocks.getProfile.mockResolvedValue(null);

    render(await Profile({ params: Promise.resolve(mockParams) }));

    expect(screen.getByText('No profile page found')).toBeDefined();
  });

  it('should render profile information if profile is found', async () => {
    const mockProfile = { id: 1, name: 'John Doe' };
    const mockSettings = { mfa: true };

    mocks.getCurrentSession.mockResolvedValue({ user: { id: 1 } });
    mocks.getProfile.mockResolvedValue(mockProfile);
    mocks.loadSettings.mockResolvedValue(mockSettings);

    render(await Profile({ params: Promise.resolve(mockParams) }));

    expect(screen.getByText('Profile')).toBeDefined();
    expect(screen.getByText('User data')).toBeDefined();
  });
});
