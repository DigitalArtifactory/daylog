import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import InitRegisterForm from './InitRegisterForm';

const state = {
  message: '',
  success: false,
  errors: {},
  data: {},
};

const mocks = vi.hoisted(() => {
  return {
    signupInit: vi.fn(() => state),
    useActionState: vi.fn(() => [state, mocks.signupInit, false]),
  };
});

vi.mock('../lib/actions', () => ({ signupInit: mocks.signupInit }));

vi.mock('react', () => ({ useActionState: mocks.useActionState }));

describe('InitRegisterForm', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the form correctly', () => {
    mocks.useActionState.mockReturnValueOnce([
      { data: {}, errors: {}, message: '', success: false },
      vi.fn(),
      false,
    ]);

    render(<InitRegisterForm />);
    expect(screen.getByText('Create admin account')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter name')).toBeDefined();
    expect(screen.getByPlaceholderText('Enter email')).toBeDefined();
    expect(screen.getByPlaceholderText('Password')).toBeDefined();
    expect(screen.getByText('Create admin account')).toBeDefined();
  });

  it('displays error messages when state has errors', () => {
    mocks.useActionState.mockReturnValueOnce([
      {
        data: {},
        errors: {
          name: 'Name is required',
          email: ['Email is required', 'Email is invalid'],
          password: ['Password is required'],
        },
        success: false,
        message: '',
      },
      vi.fn(),
      false,
    ]);

    render(<InitRegisterForm />);

    expect(screen.getByText('Name is required')).toBeDefined();
    expect(screen.getByText('Email is required')).toBeDefined();
    expect(screen.getByText('Email is invalid')).toBeDefined();
    expect(screen.getByText('Password is required')).toBeDefined();
  });

  it('displays a message when account creation fails', () => {
    mocks.useActionState.mockReturnValueOnce([
      {
        data: {},
        errors: {},
        success: false,
        message: 'Account creation failed',
      },
      vi.fn(),
      false,
    ]);

    render(<InitRegisterForm />);

    expect(screen.getByText('Account not created')).toBeDefined();
    expect(screen.getByText('Account creation failed')).toBeDefined();
  });

  it('submits the form with correct data', () => {
    const mockAction = vi.fn();
    mocks.useActionState.mockReturnValueOnce([
      {
        data: {},
        errors: {},
        success: true,
        message: '',
      },
      mockAction,
      false,
    ]);

    render(<InitRegisterForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'SecurePassword123#' },
    });

    fireEvent.click(screen.getByText('Create admin account'));

    expect(mockAction).toHaveBeenCalled();
  });

  it('disables the submit button when pending', () => {
    mocks.useActionState.mockReturnValueOnce([state, vi.fn(), true]);
    render(<InitRegisterForm />);

    const submitButton = screen.getByText('Create admin account');
    expect(submitButton).toBeDisabled();
  });
});
