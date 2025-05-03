import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NoteEditorPlaceholder from './EditorPlaceholder';

describe('NoteEditorPlaceholder', () => {
  it('renders the placeholder elements correctly', () => {
    render(<NoteEditorPlaceholder />);

    // Check for the presence of placeholder elements
    expect(
      screen.getByText((_, element) => {
        if (!element) return false;
        return (
          element.classList.contains('placeholder') &&
          element.classList.contains('col-9')
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        if (!element) return false;
        return (
          element.classList.contains('placeholder-xs') &&
          element.classList.contains('col-10')
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => {
        if (!element) return false;
        return (
          element.classList.contains('placeholder-xs') &&
          element.classList.contains('col-11')
        );
      })
    ).toBeInTheDocument();
  });
});
