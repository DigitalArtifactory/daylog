import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { saveSettings } from '../lib/actions';
import PreferencesTab from './PreferencesTab';

const mocks = vi.hoisted(() => ({
  loadSettings: vi.fn(),
  saveSettings: vi.fn(),
}));

vi.mock('../lib/actions', () => ({
  loadSettings: mocks.loadSettings,
  saveSettings: mocks.saveSettings,
}));

describe('PreferencesTab', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders correctly', async () => {
    mocks.loadSettings.mockResolvedValue({
      mfa: true,
      allowReg: false,
      allowUnsplash: false,
    });

    render(<PreferencesTab />);

    expect(await screen.findByText('Security')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Force users to configure 2FA Authentication')
    ).toBeChecked();
    expect(screen.getByLabelText('Allow users to Sign Up')).not.toBeChecked();
    expect(
      screen.getByLabelText('Allow users to use Unsplash images')
    ).not.toBeChecked();
  });

  it('toggles MFA checkbox', async () => {
    mocks.loadSettings.mockResolvedValue({
      mfa: false,
      allowReg: false,
      allowUnsplash: false,
    });

    render(<PreferencesTab />);

    const mfaCheckbox = await screen.findByLabelText(
      'Force users to configure 2FA Authentication'
    );
    fireEvent.click(mfaCheckbox);

    expect(mfaCheckbox).toBeChecked();
  });

  it('toggles Allow Registration checkbox', async () => {
    mocks.loadSettings.mockResolvedValue({
      mfa: false,
      allowReg: false,
      allowUnsplash: false,
    });

    render(<PreferencesTab />);

    const allowRegCheckbox = await screen.findByLabelText(
      'Allow users to Sign Up'
    );
    fireEvent.click(allowRegCheckbox);

    expect(allowRegCheckbox).toBeChecked();
  });

  it('toggles Unsplash checkbox', async () => {
    mocks.loadSettings.mockResolvedValue({
      mfa: false,
      allowReg: false,
      allowUnsplash: false,
    });

    render(<PreferencesTab />);

    const unsplashCheckbox = await screen.findByLabelText(
      'Allow users to use Unsplash images'
    );
    fireEvent.click(unsplashCheckbox);

    expect(unsplashCheckbox).toBeChecked();
  });

  it('submits the form', async () => {
    mocks.loadSettings.mockResolvedValue({
      mfa: false,
      allowReg: false,
      allowUnsplash: false,
    });

    render(<PreferencesTab />);

    const saveButton = await screen.findByText('Save Settings');
    fireEvent.click(saveButton);

    expect(saveSettings).toHaveBeenCalled();
  });
});
