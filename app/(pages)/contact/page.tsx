import { css } from '@/styled-system/css';
import { Card as ParkCard } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';
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
              <ContactForm />
            </ParkCard.Body>
          </ParkCard.Root>
        </div>
      </section>
    </div>
  );
}
