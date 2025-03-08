import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterForm from './RegisterForm';

const state = { message: 'Error creating account', success: false };
let pending = false;

const mocks = vi.hoisted(() => {
  return {
    signup: vi.fn(() => state),
    useActionState: vi.fn(() => [state, pending, vi.fn()]),
  };
});

vi.mock('../lib/actions', () => ({ signup: mocks.signup }));

vi.mock('react', () => ({ useActionState: mocks.useActionState }));

describe('RegisterForm', () => {
  it('renders form elements correctly', () => {
    render(<RegisterForm />);

    expect(
      screen.getByText('Account registration', { selector: 'h2' })
    ).toBeDefined();
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Email address')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
    expect(screen.getByLabelText('Agree the terms and policy.')).toBeDefined();
    expect(screen.getByText('Already have account?')).toBeDefined();
  });

  it('shows error message when account creation fails', () => {
    cleanup();
    render(<RegisterForm />);
    fireEvent.submit(
      screen.getByRole('button', { name: /create new account/i })
    );

    expect(screen.getByText('Account not created')).toBeDefined();
    expect(screen.getByText('Error creating account')).toBeDefined();
  });

  it('shows success message when account is created', () => {
    state.success = true;

    cleanup();
    render(<RegisterForm />);
    fireEvent.submit(
      screen.getByRole('button', { name: /create new account/i })
    );

    expect(screen.getByText('Account created')).toBeDefined();
    expect(
      screen.getByText('Your account has been created successfuly')
    ).toBeDefined();
    expect(screen.getByText('Go to login')).toBeDefined();
  });

  it('disables submit button when pending', () => {
    pending = true;

    cleanup();
    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', {
      name: /create new account/i,
    });

    expect(submitButton.classList.contains('disabled')).toEqual(true);
  });
});
