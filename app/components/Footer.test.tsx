import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
    const realDate = Date;

    // Test with year 2025
    const MockDate2025 = class {
      constructor() {
        return new realDate('2025-03-15');
      }
      static now(): number {
        return new realDate('2025-03-15').getTime();
      }
    };

    global.Date = MockDate2025 as typeof Date;

    const { unmount } = render(<Footer />);
    expect(screen.getByText(/© 2025/)).toBeInTheDocument();
    unmount();

    // Test with year 2027
    const MockDate2027 = class {
      constructor() {
        return new realDate('2027-06-20');
      }
      static now(): number {
        return new realDate('2027-06-20').getTime();
      }
    };

    global.Date = MockDate2027 as typeof Date;

    render(<Footer />);
    expect(screen.getByText(/© 2027/)).toBeInTheDocument();

    // Restore original Date
    global.Date = realDate;
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
