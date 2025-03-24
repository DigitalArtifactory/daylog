import '@/utils/test/commonMocks';

import { cleanup, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Notes from './page';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  getNotes: vi.fn(),
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('./lib/actions', () => ({
  getNotes: mocks.getNotes,
}));

vi.mock('./components/NoteModalForm');
vi.mock('./components/NoteCard', () => ({
  default: vi.fn(({ noteId }: { noteId: number }) => <div>Note {noteId}</div>),
}));

describe('Home Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should redirect to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });
    mocks.getNotes.mockResolvedValue([]);

    await Notes({ params: Promise.resolve({ id: '1' }) });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should render notes if user is authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getNotes.mockResolvedValue([{ id: 1 }]);

    render(await Notes({ params: Promise.resolve({ id: '1' }) }));

    expect(screen.getByText('Note 1')).toBeInTheDocument();
  });

  it('should show empty notes message if no notes are available', async () => {
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getNotes.mockResolvedValue([]);

    render(await Notes({ params: Promise.resolve({ id: '1' }) }));

    expect(screen.getByText('Your notes are empty')).toBeInTheDocument();
  });
});
