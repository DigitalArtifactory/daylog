import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UsersTable from './UsersTable';

const mocks = vi.hoisted(() => ({
  getUsers: vi.fn(),
  setAdmin: vi.fn(),
  deleteUser: vi.fn(),
}));

vi.mock('../lib/actions', () => ({
  getUsers: mocks.getUsers,
  setAdmin: mocks.setAdmin,
  deleteUser: mocks.deleteUser,
}));

const mockUsers = [
  { id: 1, name: 'User One', email: 'userone@example.com', role: 'user' },
  { id: 2, name: 'User Two', email: 'usertwo@example.com', role: 'admin' },
];

describe('UsersTable', () => {
  beforeEach(() => {
    cleanup();
    mocks.getUsers.mockResolvedValue(mockUsers);
  });

  it('renders loading state initially', () => {
    render(<UsersTable currentUserId={1} />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders users after loading', async () => {
    render(<UsersTable currentUserId={1} />);
    await waitFor(() => {
      expect(
        screen.getByRole('cell', { name: 'User One' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('cell', { name: 'User Two' })
      ).toBeInTheDocument();
    });
  });

  it('handles role change', async () => {
    render(<UsersTable currentUserId={1} />);
    await waitFor(() =>
      expect(screen.getByText('User One')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Set as Admin'));
    await waitFor(() =>
      expect(mocks.setAdmin).toHaveBeenCalledWith(1, 'admin')
    );
  });

  it('handles user deletion', async () => {
    render(<UsersTable currentUserId={1} />);
    await waitFor(() =>
      expect(screen.getByText('User One')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Yes, delete'));
    await waitFor(() => expect(mocks.deleteUser).toHaveBeenCalledWith(2));
  });
});
