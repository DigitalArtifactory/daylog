import '@/utils/test/commonMocks';

import Home from '@/app/page';
import { cleanup, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCurrentSession } from './login/lib/actions';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  getBoardsCount: vi.fn(),
}));

vi.mock('./login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('./lib/actions', () => ({
  getBoardsCount: mocks.getBoardsCount,
}));

vi.mock('./partials/HomeTabs', () => ({
  default: vi.fn(({ showFav }: { showFav: boolean }) => (
    <div>
      <div data-testid="HomeTabs">HomeTabs</div>
      <div>showFav: {showFav.toString()}</div>
    </div>
  )),
}));

vi.mock('./components/BoardFavToggle', () => ({
  default: vi.fn(() => <div>BoardFavSwitch</div>),
}));

describe('Home Page', () => {
  const defaultUser = {
    user: {
      name: 'John Doe',
      id: 0,
      email: '',
      password: '',
      secret: null,
      mfa: false,
      role: '',
      terms: '',
      sortBoardsBy: 'created_desc',
      sortNotesBy: 'created_desc',
    },
    session: {
      id: '',
      userId: 0,
      expiresAt: new Date(),
    },
  };

  beforeEach(() => {
    cleanup();
  })

  it('redirects to login if user is not authenticated', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({
      user: null,
      session: null,
    });

    render(await Home({ searchParams: Promise.resolve({}) }));

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('renders the home page if user is authenticated', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue(defaultUser);

    render(await Home({ searchParams: Promise.resolve({}) }));

    expect(redirect).not.toHaveBeenCalledWith('/login');
    expect(screen.getByText('Welcome John Doe')).toBeDefined();
  });

  it('renders BoardFavSwitch when boards count is greater than 0', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue(defaultUser);

    mocks.getBoardsCount.mockResolvedValueOnce(5);

    render(await Home({ searchParams: Promise.resolve({ showFav: 'true' }) }));

    expect(screen.getByText('BoardFavSwitch')).toBeDefined();
  });

  it('does not render BoardFavSwitch when boards count is 0', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue(defaultUser);

    mocks.getBoardsCount.mockResolvedValueOnce(0);

    render(await Home({ searchParams: Promise.resolve({ showFav: 'false' }) }));

    expect(screen.queryByText('BoardFavSwitch')).toBeNull();
  });

  it('passes showFav parameter correctly to HomeTabs', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue(defaultUser);

    mocks.getBoardsCount.mockResolvedValueOnce(3);

    render(await Home({ searchParams: Promise.resolve({ showFav: 'true' }) }));

    expect(screen.getByText('HomeTabs')).toBeDefined();
    expect(screen.getByText('showFav: true')).toBeDefined();
  });
});
