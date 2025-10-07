import '@/utils/test/commonMocks';

import { Note } from '@/prisma/generated/client';
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

vi.mock('./partials/NoteEditorClientWrapper', () => ({
  default: vi.fn(({ note }: { note: Note }) => (
    <div data-testid="note">{note.title}</div>
  )),
}));

describe('Note Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should redirect to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });
    mocks.getNote.mockResolvedValue(null);

    await NotePage({ params: Promise.resolve({ id: '1', noteId: '1' }) });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should render note if user is authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({
      user: { id: 1, name: 'Test User' },
    });
    mocks.getNote.mockResolvedValue({ id: 1, title: 'Test Note' });

    render(await NotePage({ params: Promise.resolve({ id: '1', noteId: '1' }) }));

    expect(screen.getByTestId('note')).toBeInTheDocument();
  });
});
