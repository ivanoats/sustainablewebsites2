import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import {
  Button,
  Card as ParkCard,
  Field,
  Input,
  Textarea,
} from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch for a free consultation on sustainable web services.',
};

export default function ContactPage() {
  return (
    <div>
      <section
        className={css({
          py: { base: '3rem', md: '4rem' },
          px: '1rem',
          bg: 'surface.100',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderColor: 'border',
        })}
        aria-label="Contact us"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h1
            className={css({
              fontSize: { base: '3xl', md: '4xl' },
              fontWeight: 'bold',
              mb: '1rem',
              color: 'ink',
            })}
          >
            Get in Touch
          </h1>
          <p className={css({ fontSize: 'displaySm', color: 'ink.muted' })}>
            Schedule a free consultation to discuss how we can help optimize
            your digital products.
          </p>
        </div>
      </section>

      <section
        className={css({
          py: '4rem',
          px: '1rem',
        })}
      >
        <div
          className={css({
            maxW: '2xl',
            mx: 'auto',
          })}
        >
          <ParkCard.Root>
            <ParkCard.Body>
              <form
                name="contact"
                method="POST"
                netlify-honeypot="bot-field"
                data-netlify="true"
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
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                  />
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
                  <Field.Label htmlFor="service">
                    What service interests you?
                  </Field.Label>
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

                <div>
                  <Button type="submit" variant="solid" size="md">
                    Send Message
                  </Button>
                </div>

                <p className={css({ fontSize: 'bodySm', color: 'ink.muted' })}>
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </ParkCard.Body>
          </ParkCard.Root>
        </div>
      </section>
    </div>
  );
}
