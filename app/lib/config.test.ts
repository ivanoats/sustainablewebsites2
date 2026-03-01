import { describe, it, expect } from 'vitest';
import { siteConfig } from './config';

describe('siteConfig', () => {
  it('has correct name', () => {
    expect(siteConfig.name).toBe('Sustainable Websites');
  });

  it('has valid description', () => {
    expect(siteConfig.description).toBeTruthy();
    expect(typeof siteConfig.description).toBe('string');
  });

  it('has navbar array', () => {
    expect(Array.isArray(siteConfig.navbar)).toBe(true);
    expect(siteConfig.navbar.length).toBeGreaterThan(0);
  });

  it('has home link as first item', () => {
    expect(siteConfig.navbar[0]).toEqual({
      label: 'Home',
      href: '/',
    });
  });

  it('includes Services link', () => {
    const servicesLink = siteConfig.navbar.find(
      (link) => link.href === '/services'
    );
    expect(servicesLink).toBeDefined();
    expect(servicesLink?.label).toBe('Services');
  });

  it('includes About link', () => {
    const aboutLink = siteConfig.navbar.find((link) => link.href === '/about');
    expect(aboutLink).toBeDefined();
    expect(aboutLink?.label).toBe('About');
  });

  it('includes Contact link', () => {
    const contactLink = siteConfig.navbar.find(
      (link) => link.href === '/contact'
    );
    expect(contactLink).toBeDefined();
    expect(contactLink?.label).toBe('Contact');
  });

  it('includes WSG Check link', () => {
    const wsgLink = siteConfig.navbar.find(
      (link) => link.href === '/wsg-check'
    );
    expect(wsgLink).toBeDefined();
    expect(wsgLink?.label).toBe('WSG Check');
  });

  it('all navbar items have required properties', () => {
    siteConfig.navbar.forEach((link) => {
      expect(link).toHaveProperty('label');
      expect(link).toHaveProperty('href');
      expect(typeof link.label).toBe('string');
      expect(typeof link.href).toBe('string');
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href.length).toBeGreaterThan(0);
    });
  });

  it('all navbar links are unique', () => {
    const hrefs = siteConfig.navbar.map((link) => link.href);
    const uniqueHrefs = new Set(hrefs);
    expect(uniqueHrefs.size).toBe(hrefs.length);
  });

  it('navbar links start with /', () => {
    siteConfig.navbar.forEach((link) => {
      expect(link.href).toMatch(/^\//);
    });
  });
});
