import Admin from '@/app/admin/page';
import { Note } from '@prisma/client';
import { cleanup, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotePage from './page';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  getNote: vi.fn(),
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('../lib/actions', () => ({
  getNote: mocks.getNote,
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/components/Page', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageBody', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageContainer', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageHeader');
vi.mock('@/components/NavHeader');
vi.mock('@/components/NavMenu');
vi.mock('./partials/NoteEditorClientWrapper', () => ({
  default: vi.fn(({ note }: { note: Note }) => <div>{note.title}</div>),
}));

describe('Note Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should redirect to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });
    mocks.getNote.mockResolvedValue(null);

    await NotePage({ params: Promise.resolve({ noteId: '1' }) });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should render note if user is authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getNote.mockResolvedValue({ id: 1, title: 'Test Note' });

    render(await NotePage({ params: Promise.resolve({ noteId: '1' }) }));

    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  const mocks = vi.hoisted(() => ({
    getCurrentSession: vi.fn(),
    getNote: vi.fn(),
  }));

  vi.mock('@/app/login/lib/actions', () => ({
    getCurrentSession: mocks.getCurrentSession,
  }));

  vi.mock('../lib/actions', () => ({
    getNote: mocks.getNote,
  }));

  vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
  }));

  vi.mock('@/components/Page', () => ({
    default: vi.fn(({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )),
  }));

  vi.mock('@/components/PageBody', () => ({
    default: vi.fn(({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )),
  }));

  vi.mock('@/components/PageContainer', () => ({
    default: vi.fn(({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    )),
  }));

  vi.mock('@/components/PageHeader');
  vi.mock('@/components/NavHeader');
  vi.mock('@/components/NavMenu');
  vi.mock('./partials/NoteEditorClientWrapper', () => ({
    default: vi.fn(({ note }: { note: Note }) => <div>{note.title}</div>),
  }));

  vi.mock('@/app/admin/partials/AdminTabs', () => ({
    default: vi.fn(() => <div>AdminTabs</div>),
  }));

  vi.mock('@/app/admin/partials/SecurityTab', () => ({
    default: vi.fn(() => <div>SecurityTab</div>),
  }));

  vi.mock('@/app/admin/partials/UserModal', () => ({
    default: vi.fn(() => <div>UserModal</div>),
  }));

  vi.mock('@/app/admin/partials/UsersTable', () => ({
    default: vi.fn(({ currentUserId }: { currentUserId: number }) => (
      <div>UsersTable for user {currentUserId}</div>
    )),
  }));

  describe('Note Page', () => {
    beforeEach(() => {
      cleanup();
    });

    it('should redirect to login if user is not authenticated', async () => {
      mocks.getCurrentSession.mockResolvedValue({ user: null });
      mocks.getNote.mockResolvedValue(null);

      await NotePage({ params: Promise.resolve({ noteId: '1' }) });

      expect(redirect).toHaveBeenCalledWith('/login');
    });

    it('should render note if user is authenticated', async () => {
      mocks.getCurrentSession.mockResolvedValue({
        user: { id: 1, name: 'Test User' },
      });
      mocks.getNote.mockResolvedValue({ id: 1, title: 'Test Note' });

      render(await NotePage({ params: Promise.resolve({ noteId: '1' }) }));

      expect(screen.getByText('Test Note')).toBeInTheDocument();
    });

    it('should redirect to login if user is not authenticated on admin page', async () => {
      mocks.getCurrentSession.mockResolvedValue({ user: null });

      await Admin();

      expect(redirect).toHaveBeenCalledWith('/login');
    });

    it('should redirect to home if user is not an admin', async () => {
      mocks.getCurrentSession.mockResolvedValue({
        user: { id: 1, name: 'Test User', role: 'user' },
      });

      await Admin();

      expect(redirect).toHaveBeenCalledWith('/');
    });

    it('should render admin page if user is an admin', async () => {
      mocks.getCurrentSession.mockResolvedValue({
        user: { id: 1, name: 'Admin User', role: 'admin' },
      });

      render(await Admin());

      expect(screen.getByText('AdminTabs')).toBeInTheDocument();
      expect(screen.getByText('UsersTable for user 1')).toBeInTheDocument();
    });
  });
});
