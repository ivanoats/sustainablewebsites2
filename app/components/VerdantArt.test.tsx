import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VerdantMeadow, VerdantValley } from './VerdantArt';

describe('VerdantValley', () => {
  it('renders a decorative inline SVG hidden from assistive technology', () => {
    render(<VerdantValley />);

    const svg = screen.getByTestId('verdant-valley');
    expect(svg.tagName).toBe('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 560 440');
  });

  it('renders identical markup on every render (seeded geometry)', () => {
    const first = render(<VerdantValley />).container.innerHTML;
    const second = render(<VerdantValley />).container.innerHTML;
    expect(first).toBe(second);
  });
});

describe('VerdantMeadow', () => {
  it('renders a decorative inline SVG hidden from assistive technology', () => {
    render(<VerdantMeadow />);

    const svg = screen.getByTestId('verdant-meadow');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 600 120');
  });
});
