import { css } from '@/styled-system/css';
import { grid, stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card } from '@/components/Card';
import { VerdantMeadow, VerdantValley } from '@/components/VerdantArt';
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
          py: { base: '3rem', md: '6rem' },
          px: '1rem',
          bg: 'surface.100',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderColor: 'border',
        })}
        aria-label="Hero section"
      >
        <div
          className={grid({
            columns: { base: 1, md: 2 },
            gap: { base: '8', md: '10' },
            alignItems: 'center',
            maxW: '1080px',
            mx: 'auto',
          })}
        >
          <div className={css({ textAlign: { base: 'center', md: 'left' } })}>
            <h1
              className={css({
                fontSize: { base: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                mb: '1rem',
                color: 'ink',
              })}
            >
              Build Sustainable Web Products
            </h1>
            <p
              className={css({
                fontSize: 'displaySm',
                mb: '2rem',
                lineHeight: '1.8',
                color: 'ink.muted',
                maxW: '3xl',
                mx: { base: 'auto', md: '0' },
              })}
            >
              Reduce your digital emissions, improve performance, and lower
              hosting costs with web architecture designed for efficiency.
            </p>
            <div
              className={stack({
                direction: { base: 'column', md: 'row' },
                gap: '4',
                align: 'center',
                justify: { base: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
              })}
            >
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
          <VerdantValley />
        </div>
      </section>

      <section
        className={css({
          py: '4rem',
          px: '1rem',
        })}
        aria-label="Why sustainable web matters"
      >
        <h2
          className={css({
            fontSize: 'displayMd',
            fontWeight: 'bold',
            mb: '2rem',
            textAlign: 'center',
            color: 'ink',
          })}
        >
          Why Sustainable Web Matters
        </h2>
        <div
          className={grid({
            columns: { base: 1, md: 3 },
            gap: '6',
            maxW: '1080px',
            mx: 'auto',
          })}
        >
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
          bg: 'surface.100',
        })}
        aria-label="Our services"
      >
        <div
          className={css({
            maxW: '1080px',
            mx: 'auto',
          })}
        >
          <h2
            className={css({
              fontSize: 'displayMd',
              fontWeight: 'bold',
              mb: '2rem',
              textAlign: 'center',
              color: 'ink',
            })}
          >
            Our Services
          </h2>
          <div
            className={grid({
              columns: { base: 1, md: 3 },
              gap: '6',
              maxW: '1080px',
              mx: 'auto',
            })}
          >
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
          bg: 'surface.200',
          color: 'ink',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          pb: { base: '6rem', md: '4rem' },
        })}
        aria-label="Call to action"
      >
        <VerdantMeadow />
        <div
          className={css({
            maxW: '3xl',
            mx: 'auto',
            position: 'relative',
          })}
        >
          <h2
            className={css({
              fontSize: 'displayMd',
              fontWeight: 'bold',
              mb: '1rem',
            })}
          >
            Ready to Build Sustainably?
          </h2>
          <p
            className={css({
              fontSize: 'displaySm',
              mb: '2rem',
              lineHeight: '1.8',
              color: 'ink.muted',
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
