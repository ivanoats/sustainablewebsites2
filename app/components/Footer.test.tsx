import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders footer content', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/Sustainable Websites/)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('displays current year dynamically', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument();
  });

  it('updates year when new Date is called', () => {
    vi.useFakeTimers();

    try {
      // Test with year 2025
      vi.setSystemTime(new Date('2025-03-15'));

      const { unmount } = render(<Footer />);
      expect(screen.getByText(/© 2025/)).toBeInTheDocument();
      unmount();

      // Test with year 2027
      vi.setSystemTime(new Date('2027-06-20'));

      render(<Footer />);
      expect(screen.getByText(/© 2027/)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('includes sustainability messaging', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /Built with performance, accessibility, and sustainability in mind/
      )
    ).toBeInTheDocument();
  });

  it('renders as semantic footer element', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
  });
});
