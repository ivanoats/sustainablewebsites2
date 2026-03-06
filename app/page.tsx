import { css } from '@/styled-system/css';
import { grid, stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card } from '@/components/Card';
import type { Metadata } from 'next';
import {
  Globe,
  Zap,
  DollarSign,
  BarChart2,
  Building2,
  Recycle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Build sustainable, high-performance web products. Reduce emissions, improve UX, and lower costs.',
};

export default function HomePage() {
  return (
    <div>
      <section
        className={css({
          py: { base: '4rem', md: '6rem' },
          px: '1rem',
          bg: 'gray.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        })}
        aria-label="Hero section"
      >
        <div
          className={css({
            maxW: '5xl',
            mx: 'auto',
            textAlign: 'center',
          })}
        >
          <h1
            className={css({
              fontSize: { base: '3xl', md: '5xl' },
              fontWeight: 'bold',
              mb: '1rem',
              color: 'gray.900',
            })}
          >
            Build Sustainable Web Products
          </h1>
          <p
            className={css({
              fontSize: 'lg',
              mb: '2rem',
              lineHeight: '1.8',
              color: 'gray.700',
              maxW: '3xl',
              mx: 'auto',
            })}
          >
            Reduce your digital emissions, improve performance, and lower
            hosting costs with web architecture designed for efficiency.
          </p>
          <div className={stack({ gap: '1rem', align: 'center' })}>
            <CTAButton
              text="Get a Free Sustainability Audit"
              href="/contact"
              variant="primary"
              size="lg"
            />
            <CTAButton
              text="Learn About Our Services"
              href="/services"
              variant="secondary"
              size="lg"
            />
          </div>
        </div>
      </section>

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
            mb: '2rem',
            textAlign: 'center',
            color: 'gray.900',
          })}
        >
          Why Sustainable Web Matters
        </h2>
        <div className={grid({ columns: { base: 1, md: 3 }, gap: '1.5rem' })}>
          <Card
            title="Lower Emissions"
            description="Every kilobyte counts. Reduce data transfer, optimize code, and cut energy consumption by 30-70%."
            icon={<Globe size={32} />}
          />
          <Card
            title="Better Performance"
            description="Lean architecture = faster load times. Better UX means higher conversion rates and user satisfaction."
            icon={<Zap size={32} />}
          />
          <Card
            title="Lower Costs"
            description="Less data egress, fewer server resources, and reduced infrastructure overhead directly impact your bottom line."
            icon={<DollarSign size={32} />}
          />
        </div>
      </section>

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
              mb: '2rem',
              textAlign: 'center',
              color: 'gray.900',
            })}
          >
            Our Services
          </h2>
          <div className={grid({ columns: { base: 1, md: 3 }, gap: '1.5rem' })}>
            <Card
              title="Digital Footprint Audit"
              description="Quantify your emissions and get a prioritized action plan with measurable ROI projections."
              icon={<BarChart2 size={32} />}
              href="/services#audit"
            />
            <Card
              title="Architecture Consulting"
              description="Transform bloated systems into lean, high-performance platforms that cost less to run."
              icon={<Building2 size={32} />}
              href="/services#architecture"
            />
            <Card
              title="Green DevOps"
              description="Optimize your CI/CD pipeline for speed, efficiency, and measurable environmental impact."
              icon={<Recycle size={32} />}
              href="/services#devops"
            />
          </div>
          <div
            className={css({
              textAlign: 'center',
              mt: '2rem',
            })}
          >
            <CTAButton
              text="View All Services"
              href="/services"
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </section>

      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'gray.900',
          color: 'gray.100',
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
              color: 'gray.200',
            })}
          >
            Get a free consultation to discuss how we can help optimize your
            digital products for performance and environmental responsibility.
          </p>
          <CTAButton
            text="Schedule a Free Consultation"
            href="/contact"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
