import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BoardCardType } from './components/BoardCard';
import Boards from './page';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  getBoards: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('../login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('./lib/actions', () => ({
  getBoards: mocks.getBoards,
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

vi.mock('@/components/NavHeader');
vi.mock('@/components/NavMenu');

vi.mock('@/components/PageHeader', () => ({
  default: vi.fn(({ preTitle, title }: { preTitle: string; title: string }) => (
    <div>
      <div>{preTitle}</div>
      <div>{title}</div>
    </div>
  )),
}));

vi.mock('@/components/PageBody', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    Suspense: vi.fn(({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )),
  };
});

vi.mock('@/app/boards/components/BoardCard', () => ({
  default: vi.fn(({ boardId }: BoardCardType) => (
    <div data-testid={boardId}>{boardId}</div>
  )),
}));

describe('Boards Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('redirects to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });
    render(await Boards());

    expect(mocks.redirect).toHaveBeenCalledWith('/login');
  });

  it('renders boards if user is authenticated', async () => {
    const mockBoards = [{ id: 1, name: 'Test Board' }];
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getBoards.mockResolvedValue(mockBoards);

    render(await Boards());

    await waitFor(() => {
      expect(screen.getByTestId(mockBoards[0].id)).toBeInTheDocument();
    });
  });

  it('shows empty state if no boards are available', async () => {
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getBoards.mockResolvedValue([]);

    render(await Boards());

    await waitFor(() => {
      expect(screen.getByText('Your boards are empty')).toBeInTheDocument();
    });
  });
});
