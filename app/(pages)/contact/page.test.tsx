import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactPage from './page';

describe('ContactPage', () => {
  it('associates each visible label with its form control', () => {
    const { container } = render(<ContactPage />);

    expect(screen.getByLabelText('Name *')).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText('Email *')).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Company')).toHaveAttribute('id', 'company');
    expect(
      screen.getByLabelText('What service interests you?')
    ).toHaveAttribute('id', 'service');
    expect(
      screen.getByLabelText('Tell us about your project *')
    ).toHaveAttribute('id', 'message');

    const ids = Array.from(container.querySelectorAll('[id]')).map(
      ({ id }) => id
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
