import { Board } from '@prisma/client';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BoardModalForm from './BoardModalForm';

const mocks = vi.hoisted(() => ({
  createBoard: vi.fn(),
  updateBoard: vi.fn(),
  deleteImage: vi.fn(),
  saveImage: vi.fn(),
  resizeImage: vi.fn(),
  refresh: vi.fn(),
  getImageUrlOrFile: vi.fn(() => 'https://dummy.com/test.jpg'),
}));

vi.mock('@/app/boards/lib/actions', () => ({
  createBoard: mocks.createBoard,
  updateBoard: mocks.updateBoard,
  deleteImage: mocks.deleteImage,
  saveImage: mocks.saveImage,
}));

vi.mock('@/utils/image', () => ({
  resizeImage: mocks.resizeImage,
  getImageUrlOrFile: mocks.getImageUrlOrFile,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    refresh: vi.fn(),
  })),
}));

describe('BoardModalForm', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders create board form', () => {
    render(<BoardModalForm modalId="testModal" mode="create" />);

    expect(screen.getByText('Create board')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your board title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type any description')
    ).toBeInTheDocument();
  });

  it('renders update board form', () => {
    const board: Partial<Board> = {
      id: 1,
      title: 'Test Board',
      description: 'Test Description',
      imageUrl: 'test.jpg',
    };
    render(
      <BoardModalForm
        modalId="testModal"
        mode="update"
        board={board as Board}
      />
    );

    expect(screen.getByText('Update board')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Board')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('submits create board form', async () => {
    mocks.createBoard.mockResolvedValue(1);

    render(<BoardModalForm modalId="testModal" mode="create" />);

    fireEvent.change(screen.getByPlaceholderText('Your board title'), {
      target: { value: 'New Board' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type any description'), {
      target: { value: 'New Description' },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mocks.createBoard).toHaveBeenCalledWith({
        title: 'New Board',
        description: 'New Description',
        user: { connect: { id: 1 } },
      });
    });
  });

  it('submits update board form', async () => {
    const board: Partial<Board> = {
      id: 1,
      title: 'Test Board',
      description: 'Test Description',
      imageUrl: 'test.jpg',
    };

    render(
      <BoardModalForm
        modalId="testModal"
        mode="update"
        board={board as Board}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Your board title'), {
      target: { value: 'Updated Board' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type any description'), {
      target: { value: 'Updated Description' },
    });

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mocks.updateBoard).toHaveBeenCalledWith({
        id: 1,
        title: 'Updated Board',
        description: 'Updated Description',
      });
    });
  });

  it('handles image upload', async () => {
    mocks.resizeImage.mockImplementation((file, width, height, callback) => {
      callback('resizedDataUrl');
    });

    const board: Partial<Board> = {
      id: 1,
      title: 'Test Board',
      description: 'Test Description',
      imageUrl: 'test.jpg',
    };

    render(
      <BoardModalForm
        modalId="testModal"
        mode="update"
        board={board as Board}
      />
    );

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    fireEvent.change(
      screen.getByLabelText('Select image from your device (optional)'),
      {
        target: { files: [file] },
      }
    );

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mocks.saveImage).toHaveBeenCalledWith(
        1,
        'resizedDataUrl',
        'test.jpg'
      );
    });
  });

  it('handles image removal', async () => {
    const board: Partial<Board> = {
      id: 1,
      title: 'Test Board',
      description: 'Test Description',
      imageUrl: 'test.jpg',
    };

    render(
      <BoardModalForm
        modalId="testModal"
        mode="update"
        board={board as Board}
      />
    );

    fireEvent.click(screen.getByText('Remove image'));
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mocks.deleteImage).toHaveBeenCalledWith(1, 'test.jpg');
    });
  });
});
