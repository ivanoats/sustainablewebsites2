'use client';

import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { Button, Field, Input, Textarea } from '@/components/ui';
import { type FormEvent, useState } from 'react';

// Netlify's Next.js Runtime v5 only records submissions POSTed to a static
// file, so we send the form to the blueprint in public/forms.html via fetch.
export const FORM_ENDPOINT = '/forms.html';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus('submitting');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          formData as unknown as Record<string, string>
        ).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className={stack({ gap: '0.75rem' })}>
        <h2
          className={css({ fontSize: 'xl', fontWeight: 'bold', color: 'ink' })}
        >
          Thanks, your message is on its way.
        </h2>
        <p className={css({ color: 'ink.muted' })}>
          We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      action={FORM_ENDPOINT}
      netlify-honeypot="bot-field"
      data-netlify="true"
      onSubmit={handleSubmit}
      className={stack({ gap: '1.25rem' })}
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className={css({ display: 'none' })}>
        <label htmlFor="bot-field">Don't fill this out</label>
        <input id="bot-field" name="bot-field" />
      </div>

      <Field.Root required>
        <Field.Label htmlFor="name">
          Name
          <Field.RequiredIndicator />
        </Field.Label>
        <Input id="name" name="name" type="text" autoComplete="name" required />
      </Field.Root>

      <Field.Root required>
        <Field.Label htmlFor="email">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </Field.Root>

      <Field.Root>
        <Field.Label htmlFor="company">Company</Field.Label>
        <Input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label htmlFor="service">What service interests you?</Field.Label>
        <Input
          id="service"
          name="service"
          type="text"
          placeholder="Digital Footprint Audit, Architecture, DevOps..."
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label htmlFor="message">
          Tell us about your project
          <Field.RequiredIndicator />
        </Field.Label>
        <Textarea id="message" name="message" rows={6} required />
      </Field.Root>

      {status === 'error' && (
        <p role="alert" className={css({ color: 'red.11' })}>
          Sorry, your message didn't send. Please try again in a moment.
        </p>
      )}

      <div>
        <Button
          type="submit"
          variant="solid"
          size="md"
          loading={status === 'submitting'}
          loadingText="Sending…"
        >
          Send Message
        </Button>
      </div>

      <p className={css({ fontSize: 'bodySm', color: 'ink.muted' })}>
        We'll get back to you within 24 hours.
      </p>
    </form>
  );
}
