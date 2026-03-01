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

  it('renders all navbar links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('brand link navigates to home', () => {
    const { container } = render(<Header />);

    const homeLink = Array.from(container.querySelectorAll('a')).find((link) =>
      link.textContent?.includes('Sustainable Websites')
    );
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('navbar link hrefs are correct', () => {
    render(<Header />);

    const servicesLink = screen.getByRole('link', { name: /Services/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const contactLink = screen.getByRole('link', { name: /Contact/i });

    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders with WSG Check link', () => {
    render(<Header />);

    const wsgLink = screen.getByRole('link', { name: /WSG Check/i });
    expect(wsgLink).toBeInTheDocument();
    expect(wsgLink).toHaveAttribute('href', '/wsg-check');
  });

  it('brand logo has correct dimensions', () => {
    render(<Header />);

    const logo = screen.getByAltText('Sustainable Websites logo');
    expect(logo).toHaveAttribute('width', '40');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('navigation is accessible', () => {
    const { container } = render(<Header />);

    const nav = container.querySelector('nav[aria-label="Primary navigation"]');
    expect(nav).toBeInTheDocument();

    // Verify nav contains links
    const linksInNav = nav?.querySelectorAll('a');
    expect(linksInNav?.length).toBeGreaterThan(0);
  });

  it('all navbar links are keyboard accessible', () => {
    render(<Header />);

    const navLinks = screen.getAllByRole('link');
    navLinks.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });
});
