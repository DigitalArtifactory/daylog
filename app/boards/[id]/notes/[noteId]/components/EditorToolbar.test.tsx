import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import EditorToolbar from './EditorToolbar';

describe('EditorToolbar', () => {
  it('should call onExecute with correct arguments when buttons are clicked', () => {
    const mockOnExecute = vi.fn();

    const { getByTitle } = render(<EditorToolbar onExecute={mockOnExecute} />);

    fireEvent.click(getByTitle('Heading'));
    expect(mockOnExecute).toHaveBeenCalledWith('# ', '', 'heading');

    fireEvent.click(getByTitle('Bold'));
    expect(mockOnExecute).toHaveBeenCalledWith('**', '**', 'bold');

    fireEvent.click(getByTitle('Italic'));
    expect(mockOnExecute).toHaveBeenCalledWith('_', '_', 'italic');

    fireEvent.click(getByTitle('Strikethrough'));
    expect(mockOnExecute).toHaveBeenCalledWith('~~', '~~', 'strikethrough');

    fireEvent.click(getByTitle('Quote'));
    expect(mockOnExecute).toHaveBeenCalledWith('> ', '', 'quote');

    fireEvent.click(getByTitle('Ordered List'));
    expect(mockOnExecute).toHaveBeenCalledWith('1. ', '', 'ordered-list');

    fireEvent.click(getByTitle('Unordered List'));
    expect(mockOnExecute).toHaveBeenCalledWith('- ', '', 'unordered-list');

    fireEvent.click(getByTitle('Image'));
    expect(mockOnExecute).toHaveBeenCalledWith('![', '](url)', 'image');
  });
});