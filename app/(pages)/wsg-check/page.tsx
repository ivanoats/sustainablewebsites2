import { css } from '@/styled-system/css';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WSG Check',
  description:
    'W3C Web Sustainability Guidelines audit and assessment tool for your website.',
};

export default function WSGCheckPage() {
  return (
    <div className={css({ bg: 'white' })}>
      {/* Hero Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textAlign: 'center',
        })}
        aria-label="WSG Check tool"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem' })}>
            W3C Web Sustainability Guidelines Check
          </h1>
          <p className={css({ fontSize: 'lg', lineHeight: '1.8' })}>
            Assess your website's alignment with the W3C Web Sustainability Guidelines and discover
            opportunities to improve.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          maxW: '4xl',
          mx: 'auto',
        })}
      >
        <div className={css({ color: 'gray.700', lineHeight: '1.8' })}>
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1.5rem', color: 'gray.900' })}>
            Coming Soon
          </h2>
          <p className={css({ mb: '2rem', fontSize: 'lg' })}>
            This tool will help you understand how your website aligns with the W3C Web Sustainability
            Guidelines. We're working on integrating an automated audit system that measures:
          </p>

          <ul
            className={css({
              mb: '2rem',
              listStyle: 'none',
            })}
          >
            {[
              'User experience efficiency',
              'Web development practices',
              'Hosting and infrastructure impact',
              'Business strategy alignment',
            ].map((item) => (
              <li key={item} className={css({ mb: '0.75rem', display: 'flex', gap: '0.75rem' })}>
                <span className={css({ color: 'green.600', fontWeight: 'bold' })}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className={css({ mb: '2rem' })}>
            In the meantime, we offer manual assessments as part of our Digital Footprint Audit
            service. Contact us to learn more.
          </p>

          <div className={css({ textAlign: 'center' })}>
            <CTAButton text="Schedule an Audit" href="/contact" variant="primary" size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
