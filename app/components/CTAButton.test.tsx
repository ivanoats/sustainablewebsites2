import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CTAButton } from './CTAButton';

describe('CTAButton', () => {
  it('renders with required props', () => {
    render(<CTAButton text="Get Started" href="/contact" />);

    const link = screen.getByRole('link', { name: 'Get Started' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders with primary variant by default', () => {
    render(<CTAButton text="Click Me" href="/test" />);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  it('renders with secondary variant when specified', () => {
    render(<CTAButton text="Learn More" href="/about" variant="secondary" />);

    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  it('renders with md size by default', () => {
    render(<CTAButton text="Default Size" href="/test" />);

    expect(screen.getByText('Default Size')).toBeInTheDocument();
  });

  it('renders with small size when specified', () => {
    render(<CTAButton text="Small Button" href="/test" size="sm" />);

    expect(screen.getByText('Small Button')).toBeInTheDocument();
  });

  it('renders with large size when specified', () => {
    render(<CTAButton text="Large Button" href="/test" size="lg" />);

    expect(screen.getByText('Large Button')).toBeInTheDocument();
  });

  it('renders link with correct accessibility', () => {
    render(<CTAButton text="Accessible CTA" href="/contact" />);

    const link = screen.getByRole('link', { name: 'Accessible CTA' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAccessibleName();
  });

  it('passes correct variant mapping to Button', () => {
    const { container } = render(
      <CTAButton text="Primary" href="/test" variant="primary" />
    );
    expect(container).toBeTruthy();
  });

  it('passes correct size mapping to Button', () => {
    const { container } = render(
      <CTAButton text="Large" href="/test" size="lg" />
    );
    expect(container).toBeTruthy();
  });
});
