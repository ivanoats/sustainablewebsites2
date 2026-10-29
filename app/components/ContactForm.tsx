'use client';

import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { Button, Field, Input, Textarea } from '@/components/ui';
import { type FormEvent, useEffect, useRef, useState } from 'react';

// Netlify's Next.js Runtime v5 only records submissions POSTed to a static
// file, so we send the form to the blueprint in public/forms.html via fetch.
export const FORM_ENDPOINT = '/forms.html';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function toUrlEncoded(formData: FormData): string {
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') params.append(key, value);
  }
  return params.toString();
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const successRef = useRef<HTMLOutputElement>(null);

  // The form unmounts on success, so move focus to the confirmation to keep
  // keyboard users in place and have screen readers announce it.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus('submitting');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: toUrlEncoded(formData),
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
      <output
        ref={successRef}
        tabIndex={-1}
        aria-live="polite"
        className={stack({ gap: '0.75rem', outline: 'none' })}
      >
        <span
          className={css({ fontSize: 'xl', fontWeight: 'bold', color: 'ink' })}
        >
          Thanks, your message is on its way.
        </span>
        <span className={css({ color: 'ink.muted' })}>
          We&apos;ll get back to you within 24 hours.
        </span>
      </output>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      action={FORM_ENDPOINT}
      data-netlify-honeypot="bot-field"
      data-netlify="true"
      onSubmit={handleSubmit}
      className={stack({ gap: '1.25rem' })}
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className={css({ display: 'none' })}>
        <label htmlFor="bot-field">Don&apos;t fill this out</label>
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
        <p
          role="alert"
          className={css({ color: { base: 'red.700', _dark: 'red.300' } })}
        >
          Sorry, your message didn&apos;t send. Please try again in a moment.
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
        We&apos;ll get back to you within 24 hours.
      </p>
    </form>
  );
}
