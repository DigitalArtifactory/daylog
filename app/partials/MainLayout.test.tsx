import { cleanup, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MainLayout from './MainLayout';

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="theme-provider" data-bs-theme="light">
      {children}
    </div>
  ),
}));

describe('MainLayout', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render children when mounted', () => {
    render(
      <MainLayout>
        <div>Test Child</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // TODO: create test when should not render children when not mounted,
  // I don't know yet if it is possible...

  it('should use ThemeProvider with correct attribute', () => {
    render(
      <MainLayout>
        <div>Test Child</div>
      </MainLayout>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('data-bs-theme');
  });
});
