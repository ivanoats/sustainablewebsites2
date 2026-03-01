import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    priority: _priority,
    ...props
  }: {
    src: string | { src: string };
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
  }) =>
    React.createElement('img', {
      src: typeof src === 'string' ? src : src.src,
      alt,
      width: `${width}`,
      height: `${height}`,
      ...props,
    }),
}));

import { Header } from './Header';

describe('Header', () => {
  it('renders as semantic header element', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('renders logo image with alt text', () => {
    render(<Header />);

    const logo = screen.getByAltText('Sustainable Websites logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders site name', () => {
    render(<Header />);

    expect(screen.getByText('Sustainable Websites')).toBeInTheDocument();
  });

  it('renders primary navigation', () => {
    render(<Header />);

    const nav = screen.getByLabelText('Primary navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders all navbar links with correct hrefs', () => {
    render(<Header />);

    const navLinks = [
      { name: /Home/i, href: '/' },
      { name: /Services/i, href: '/services' },
      { name: /About/i, href: '/about' },
      { name: /WSG Check/i, href: '/wsg-check' },
      { name: /Contact/i, href: '/contact' },
    ];

    for (const { name, href } of navLinks) {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('brand link navigates to home', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', {
      name: /Sustainable Websites logo/i,
    });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Sustainable Websites');
    expect(
      screen.getByAltText('Sustainable Websites logo')
    ).toBeInTheDocument();
  });

  it('brand logo has correct dimensions', () => {
    render(<Header />);

    const logo = screen.getByAltText('Sustainable Websites logo');
    expect(logo).toHaveAttribute('width', '40');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('all navbar links are keyboard accessible', () => {
    render(<Header />);

    const navLinks = screen.getAllByRole('link');
    navLinks.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });
});
