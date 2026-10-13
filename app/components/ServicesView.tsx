import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card as ParkCard } from '@/components/ui';

export interface ServicesData {
  heading: string;
  tagline: string;
  intro: string;
  services: Array<{
    id: string;
    title: string;
    tagline: string;
    summary: string;
    benefitsTitle: string;
    benefits: Array<{ label: string; text: string }>;
    deliverable: string;
    cta: string;
  }>;
  closing: { heading: string; text: string; cta: string };
}

type Service = ServicesData['services'][number];

function BenefitList({
  benefits,
}: Readonly<{ benefits: Service['benefits'] }>) {
  return (
    <ul className={css({ pl: '1.25rem', color: 'ink.muted' })}>
      {benefits.map((item) => (
        <li key={item.label} className={css({ mb: '0.75rem' })}>
          <strong>{item.label}:</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}

function ServiceDetails({ service }: Readonly<{ service: Service }>) {
  return (
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
      <p className={css({ color: 'ink.muted', lineHeight: '1.8' })}>
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
      <BenefitList benefits={service.benefits} />

      <p className={css({ color: 'ink.muted', fontStyle: 'italic' })}>
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
  );
}

function ServiceCard({ service }: Readonly<{ service: Service }>) {
  return (
    <section
      id={service.id}
      aria-label={service.title}
      className={css({ scrollMarginTop: '6rem' })}
    >
      <ParkCard.Root>
        <ParkCard.Body>
          <ServiceDetails service={service} />
        </ParkCard.Body>
      </ParkCard.Root>
    </section>
  );
}

/** The Services page body. Takes validated content so any framework can render it. */
export function ServicesView({ data }: Readonly<{ data: ServicesData }>) {
  const { heading, tagline, intro, closing } = data;

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
          {data.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
