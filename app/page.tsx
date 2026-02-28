import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card } from '@/components/Card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Build sustainable, high-performance web products. Reduce emissions, improve UX, and lower costs.',
};

export default function HomePage() {
  return (
    <div className={css({ bg: 'white' })}>
      {/* Hero Section */}
      <section
        className={css({
          py: '6rem',
          px: '1rem',
          bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textAlign: 'center',
        })}
        aria-label="Hero section"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem' })}>
            Build Sustainable Web Products
          </h1>
          <p
            className={css({
              fontSize: 'lg',
              mb: '2rem',
              lineHeight: '1.8',
            })}
          >
            Reduce your digital emissions, improve performance, and lower hosting costs with web
            architecture designed for efficiency.
          </p>
          <div className={stack({ gap: '1rem', justify: 'center' })}>
            <CTAButton
              text="Get a Free Sustainability Audit"
              href="/contact"
              variant="primary"
              size="lg"
            />
            <CTAButton text="Learn About Our Services" href="/services" variant="secondary" size="lg" />
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          maxW: '7xl',
          mx: 'auto',
        })}
        aria-label="Why sustainable web matters"
      >
        <h2
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            mb: '3rem',
            textAlign: 'center',
            color: 'gray.900',
          })}
        >
          Why Sustainable Web Matters
        </h2>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          })}
        >
          <Card
            title="Lower Emissions"
            description="Every kilobyte counts. Reduce data transfer, optimize code, and cut energy consumption by 30-70%."
            icon="🌍"
          />
          <Card
            title="Better Performance"
            description="Lean architecture = faster load times. Better UX means higher conversion rates and user satisfaction."
            icon="⚡"
          />
          <Card
            title="Lower Costs"
            description="Less data egress, fewer server resources, and reduced infrastructure overhead directly impact your bottom line."
            icon="💰"
          />
        </div>
      </section>

      {/* Services Overview Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'gray.50',
        })}
        aria-label="Our services"
      >
        <div
          className={css({
            maxW: '7xl',
            mx: 'auto',
          })}
        >
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'bold',
              mb: '3rem',
              textAlign: 'center',
              color: 'gray.900',
            })}
          >
            Our Services
          </h2>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            })}
          >
            <Card
              title="Digital Footprint Audit"
              description="Quantify your emissions and get a prioritized action plan with measurable ROI projections."
              icon="📊"
              href="/services#audit"
            />
            <Card
              title="Architecture Consulting"
              description="Transform bloated systems into lean, high-performance platforms that cost less to run."
              icon="🏗️"
              href="/services#architecture"
            />
            <Card
              title="Green DevOps"
              description="Optimize your CI/CD pipeline for speed, efficiency, and measurable environmental impact."
              icon="♻️"
              href="/services#devops"
            />
          </div>
          <div
            className={css({
              textAlign: 'center',
              mt: '3rem',
            })}
          >
            <CTAButton text="View All Services" href="/services" variant="primary" size="lg" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'green.600',
          color: 'white',
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
              fontSize: '2xl',
              fontWeight: 'bold',
              mb: '1rem',
            })}
          >
            Ready to Build Sustainably?
          </h2>
          <p
            className={css({
              fontSize: 'lg',
              mb: '2rem',
              lineHeight: '1.8',
            })}
          >
            Get a free consultation to discuss how we can help optimize your digital products for
            performance and environmental responsibility.
          </p>
          <CTAButton text="Schedule a Free Consultation" href="/contact" variant="primary" size="lg" />
        </div>
      </section>
    </div>
  );
}
