import { User } from '@prisma/client';
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
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

it('renders TimeDiff component', () => {
  const { container } = render(<TimeDiff updatedAt={new Date()} />);
  expect(container).toBeInTheDocument();
});

it('renders Placeholder component', () => {
  const { container } = render(<Placeholder />);
  expect(container).toBeInTheDocument();
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

it('renders PageContainer component', () => {
  const { container } = render(<PageContainer>Test Content</PageContainer>);
  expect(container).toBeInTheDocument();
});

it('renders PageBody component', () => {
  const { container } = render(<PageBody>Test Content</PageBody>);
  expect(container).toBeInTheDocument();
});

it('renders Page component', () => {
  const { container } = render(<Page>Test Content</Page>);
  expect(container).toBeInTheDocument();
});

it('renders OTPInputWrapper component', () => {
  const { container } = render(<OTPInputWrapper onChange={() => {}} />);
  expect(container).toBeInTheDocument();
});

it('renders NavHeader component', async () => {
  const { container } = render(<NavHeader />);
  expect(container).toBeInTheDocument();
});

it('renders NavBar component', () => {
  const { container } = render(
    <NavBar user={{ id: 1, role: 'user' } as User} />
  );
  expect(container).toBeInTheDocument();
});

it('renders Loader component', () => {
  const { container } = render(<Loader caption="Loading..." />);
  expect(container).toBeInTheDocument();
});

it('renders FormField component', () => {
  const { container } = render(<FormField label="Test Label" name="test" />);
  expect(container).toBeInTheDocument();
});
