import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm, FORM_ENDPOINT } from './ContactForm';

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText('Name *'), {
    target: { value: 'Ada Lovelace' },
  });
  fireEvent.change(screen.getByLabelText('Email *'), {
    target: { value: 'ada@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Tell us about your project *'), {
    target: { value: 'Greener servers, please.' },
  });
  fireEvent.submit(screen.getByRole('button', { name: 'Send Message' }));
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts URL-encoded fields to the static Netlify forms file', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);

    fillAndSubmit();

    expect(await screen.findByRole('status')).toHaveTextContent(
      'your message is on its way'
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(FORM_ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams(init.body);
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('name')).toBe('Ada Lovelace');
    expect(body.get('email')).toBe('ada@example.com');
    expect(body.get('message')).toBe('Greener servers, please.');
  });

  it('shows an error and keeps the form when the submission fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );
    render(<ContactForm />);

    fillAndSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent("didn't send");
    expect(screen.getByLabelText('Name *')).toHaveValue('Ada Lovelace');
  });
});
