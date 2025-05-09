import { User } from '@/prisma/generated/client';
import { cleanup, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { beforeEach, expect, it, vi } from 'vitest';
import FormField from './FormField';
import Loader from './Loader';
import NavBar from './NavBar';
import NavHeader from './NavHeader';
import OTPInputWrapper from './OTPInputWrapper';
import Page from './Page';
import PageBody from './PageBody';
import PageContainer from './PageContainer';
import PageFooter from './PageFooter';
import PageFooterSponsor from './PageFooterSponsor';
import PageHeader from './PageHeader';
import Placeholder from './Placeholder';
import TimeDiff from './TimeDiff';

vi.mock('input-otp', () => ({
  __esModule: true,
  OTPInput: ({ onChange }: { onChange: (value: string) => void }) => (
    <input
      data-testid="mocked-input-otp"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  SlotProps: ({ char, isActive }: { char: string; isActive: boolean }) => (
    <div className={`slot ${isActive ? 'active' : ''}`}>{char}</div>
  ),
}));

vi.mock('@/app/login/lib/actions', () => ({
  getCurrentSession: () => {
    return {
      user: {
        id: 1,
        name: 'Test User',
        role: 'user',
      },
    };
  },
}));

describe('Component Tests', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders TimeDiff component', () => {
    const { container } = render(<TimeDiff updatedAt={new Date()} />);
    expect(container).toBeInTheDocument();
  });

  it('renders Placeholder component', () => {
    const { container } = render(<Placeholder />);
    expect(container).toBeInTheDocument();
  });

  it('renders Placeholder component with only background', () => {
    const { container } = render(<Placeholder background={true} />);
    expect(container).toBeInTheDocument();
    expect(container.querySelector('.card-body')).not.toBeInTheDocument();
  });

  it('renders PageHeader component', () => {
    const { container } = render(
      <PageHeader title="Test Title" breadcrumbs={[]} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders PageFooterSponsor component', () => {
    const { container } = render(<PageFooterSponsor />);
    expect(container).toBeInTheDocument();
  });

  it('renders PageFooter component', () => {
    const { container } = render(<PageFooter />);
    expect(container).toBeInTheDocument();
  });

  it('renders PageContainer component', async () => {
    const pageContainer = await PageContainer({ children: <div>Test</div> });
    const { container } = render(pageContainer);
    expect(container).toBeInTheDocument();
  });

  it('renders PageBody component', () => {
    const { container } = render(<PageBody>Test Content</PageBody>);
    expect(container).toBeInTheDocument();
  });

  it('renders Page component', async () => {
    const page = await Page({ children: <div>Test</div> });
    const { container } = render(page);
    expect(container).toBeInTheDocument();
  });

  it('renders OTPInputWrapper component', () => {
    const { container } = render(<OTPInputWrapper onChange={() => {}} />);
    expect(container).toBeInTheDocument();
  });

  it('renders OTPInputWrapper component with slots', () => {
    vi.mock('input-otp', () => ({
      __esModule: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      OTPInput: ({ render }: { render: any }) => {
        return <div>{render({ slots: [] })}</div>;
      },
      SlotProps: ({ char, isActive }: { char: string; isActive: boolean }) => (
        <div className={`slot ${isActive ? 'active' : ''}`}>{char}q</div>
      ),
    }));
    const { container } = render(<OTPInputWrapper onChange={() => {}} />);
    expect(container).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders NavHeader component', async () => {
    const navHeader = await NavHeader();
    const { container } = render(navHeader);
    expect(container).toBeInTheDocument();
  });

  it('renders NavBar component', () => {
    const { container } = render(
      <NavBar user={{ id: 1, role: 'user' } as User} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders NavBar component with admin role', () => {
    const { container } = render(
      <NavBar user={{ id: 1, role: 'admin' } as User} />
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('admin-nav')).toBeInTheDocument();
  });

  it('not shows admin nav for non-admin users', () => {
    const { container } = render(
      <NavBar user={{ id: 1, role: 'user' } as User} />
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByTestId('admin-nav')).not.toBeInTheDocument();
  });

  it('renders Loader component', () => {
    const { container } = render(<Loader caption="Loading..." />);
    expect(container).toBeInTheDocument();
  });

  it('renders FormField component', () => {
    const { container } = render(<FormField label="Test Label" name="test" />);
    expect(container).toBeInTheDocument();
  });
});
