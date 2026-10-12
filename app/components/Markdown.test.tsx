import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Markdown } from './Markdown';

describe('Markdown', () => {
  it('drops raw HTML instead of rendering it as text', () => {
    const { container } = render(
      <Markdown>{'Hello\n\n<aside>secret</aside>'}</Markdown>
    );
    expect(container.textContent).not.toContain('secret');
    expect(container.querySelector('aside')).toBeNull();
  });

  it('renders a real blockquote for quoted text', () => {
    const { container } = render(
      <Markdown>{'> **Heads up.** Quoted'}</Markdown>
    );
    const quote = container.querySelector('blockquote');
    expect(quote).not.toBeNull();
    expect(quote?.textContent).toContain('Quoted');
  });

  it('marks external links and leaves internal ones alone', () => {
    render(<Markdown>{'[a](https://example.com) [b](/contact)'}</Markdown>);
    expect(screen.getByText('a')).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('b')).not.toHaveAttribute('target');
  });

  it('renders checklist items with a decorative check', () => {
    const { container } = render(
      <Markdown checklist>{'- one\n- two'}</Markdown>
    );
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });
});
