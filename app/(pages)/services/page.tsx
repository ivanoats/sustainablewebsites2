import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card as ParkCard } from '@/components/ui';
import { loadContent, readList, readObject, readString } from '@/lib/content';
import type { Metadata } from 'next';

const services = loadContent('services', (data, file) => {
  const closing = readObject(data, 'closing', file);
  return {
    title: readString(data, 'title', file),
    description: readString(data, 'description', file),
    heading: readString(data, 'heading', file),
    tagline: readString(data, 'tagline', file),
    intro: readString(data, 'intro', file),
    services: readList(data, 'services', file).map((service) => ({
      id: readString(service, 'id', file),
      title: readString(service, 'title', file),
      tagline: readString(service, 'tagline', file),
      summary: readString(service, 'summary', file),
      benefitsTitle: readString(service, 'benefitsTitle', file),
      benefits: readList(service, 'benefits', file).map((benefit) => ({
        label: readString(benefit, 'label', file),
        text: readString(benefit, 'text', file),
      })),
      deliverable: readString(service, 'deliverable', file),
      cta: readString(service, 'cta', file),
    })),
    closing: {
      heading: readString(closing, 'heading', file),
      text: readString(closing, 'text', file),
      cta: readString(closing, 'cta', file),
    },
  };
});

export const metadata: Metadata = {
  title: services.data.title,
  description: services.data.description,
};

export default function ServicesPage() {
  const { heading, tagline, intro, closing } = services.data;

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
        aria-label="Services overview"
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
            {heading}
          </h1>
          <p
            className={css({
              fontSize: 'displaySm',
              color: 'ink.muted',
              lineHeight: '1.8',
            })}
          >
            {tagline}
          </p>
          <p
            className={css({
              fontSize: 'bodySm',
              color: 'ink.muted',
              mt: '1rem',
            })}
          >
            {intro}
          </p>
        </div>
      </section>

      <section
        className={css({ py: '4rem', px: '1rem' })}
        aria-label="Service details"
      >
        <div className={stack({ gap: '1.5rem', maxW: '4xl', mx: 'auto' })}>
          {services.data.services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              aria-label={service.title}
              className={css({ scrollMarginTop: '6rem' })}
            >
              <ParkCard.Root>
                <ParkCard.Body>
                  <div className={stack({ gap: '1rem' })}>
                    <h2
                      className={css({
                        fontSize: 'displayMd',
                        fontWeight: 'bold',
                        color: 'ink',
                      })}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={css({
                        fontSize: 'displaySm',
                        color: 'accent.strong',
                        fontWeight: '600',
                      })}
                    >
                      {service.tagline}
                    </p>
                    <p
                      className={css({ color: 'ink.muted', lineHeight: '1.8' })}
                    >
                      {service.summary}
                    </p>

                    <h3
                      className={css({
                        fontSize: 'displaySm',
                        fontWeight: 'bold',
                        color: 'ink',
                      })}
                    >
                      {service.benefitsTitle}
                    </h3>
                    <ul className={css({ pl: '1.25rem', color: 'ink.muted' })}>
                      {service.benefits.map((item) => (
                        <li key={item.label} className={css({ mb: '0.75rem' })}>
                          <strong>{item.label}:</strong> {item.text}
                        </li>
                      ))}
                    </ul>

                    <p
                      className={css({
                        color: 'ink.muted',
                        fontStyle: 'italic',
                      })}
                    >
                      <strong>Deliverable:</strong> {service.deliverable}
                    </p>

                    <div>
                      <CTAButton
                        text={service.cta}
                        href="/contact"
                        variant="primary"
                        size="md"
                      />
                    </div>
                  </div>
                </ParkCard.Body>
              </ParkCard.Root>
            </section>
          ))}
        </div>
      </section>

      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'surface.200',
          color: 'ink',
          textAlign: 'center',
        })}
        aria-label="Call to action"
      >
        <div
          className={css({
            maxW: '3xl',
            mx: 'auto',
          })}
        >
          <h2
            className={css({
              fontSize: 'displayMd',
              fontWeight: 'bold',
              mb: '1rem',
            })}
          >
            {closing.heading}
          </h2>
          <p
            className={css({
              fontSize: 'displaySm',
              mb: '2rem',
              lineHeight: '1.8',
              color: 'ink.muted',
            })}
          >
            {closing.text}
          </p>
          <CTAButton
            text={closing.cta}
            href="/contact"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
