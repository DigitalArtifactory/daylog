import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NoteEditorPlaceholder from './EditorPlaceholder';

function mockNote(
  element: Element | null,
  className: string,
  colClassName: string
): boolean {
  if (!element) return false;
  return (
    element.classList.contains(className) &&
    element.classList.contains(colClassName)
  );
}

describe('NoteEditorPlaceholder', () => {
  it('renders the placeholder elements correctly', () => {
    render(<NoteEditorPlaceholder />);

    // Check for the presence of placeholder elements
    expect(
      screen.getByText((_, element) =>
        mockNote(element, 'placeholder', 'col-9')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        mockNote(element, 'placeholder-xs', 'col-10')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        mockNote(element, 'placeholder-xs', 'col-11')
      )
    ).toBeInTheDocument();
  });
});
