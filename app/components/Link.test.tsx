import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('renders with required props', () => {
    render(<Link href="/test">Click here</Link>);

    const link = screen.getByRole('link', { name: 'Click here' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('uses primary variant by default', () => {
    const { container } = render(<Link href="/test">Primary Link</Link>);

    const link = screen.getByRole('link', { name: 'Primary Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies nav variant styles', () => {
    const { container } = render(
      <Link href="/services" variant="nav">
        Services
      </Link>
    );

    const link = screen.getByRole('link', { name: 'Services' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/services');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies brand variant styles', () => {
    const { container } = render(
      <Link href="/" variant="brand">
        Brand
      </Link>
    );

    const link = screen.getByRole('link', { name: 'Brand' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies subtle variant styles', () => {
    const { container } = render(
      <Link href="/help" variant="subtle">
        Help
      </Link>
    );

    const link = screen.getByRole('link', { name: 'Help' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/help');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles external links with target and rel', () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>
    );

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target and rel for internal links', () => {
    render(<Link href="/about">About</Link>);

    const link = screen.getByRole('link', { name: 'About' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('merges custom className with variant class', () => {
    const { container } = render(
      <Link href="/test" className="custom-class">
        Merged
      </Link>
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass('custom-class');
  });

  it('renders children content', () => {
    render(
      <Link href="/test">
        <span>Nested content</span>
      </Link>
    );

    expect(screen.getByText('Nested content')).toBeInTheDocument();
  });

  it('supports all variant options', () => {
    const variants = ['primary', 'nav', 'brand', 'subtle'] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <Link href="/" variant={variant}>
          {variant}
        </Link>
      );

      expect(screen.getByText(variant)).toBeInTheDocument();
      expect(container.querySelector('a')).toBeInTheDocument();
    });
  });
});
