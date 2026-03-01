import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { CTAButton } from '@/components/CTAButton';
import { Card as ParkCard } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Digital sustainability consulting: audits, architecture, and DevOps optimization.',
};

const services = [
  {
    id: 'audit',
    title: 'Digital Footprint Audit',
    tagline:
      "Discover exactly where your digital waste lives—and what it's costing you.",
    summary:
      "Most companies don't realize how much energy their digital products consume or where the inefficiencies hide. Our comprehensive technical audit analyzes your entire stack: page weight, data transfer efficiency, server-side energy intensity, and architectural bottlenecks.",
    listTitle: 'Benefits:',
    bullets: [
      {
        label: 'Quantified baseline',
        text: 'Know your exact emissions and cost impact',
      },
      {
        label: 'Prioritized action plan',
        text: 'Focus on changes with the highest ROI',
      },
      {
        label: 'WSG compliance mapping',
        text: 'Align with W3C Web Sustainability Guidelines standards',
      },
      {
        label: 'Competitive advantage',
        text: 'Lead your industry with measurable sustainability commitments',
      },
    ],
    deliverable:
      'A detailed Sustainability Scorecard covering User Experience, Web Development, Hosting/Infrastructure, and Business Strategy—with clear recommendations and projected savings.',
    ctaText: 'Get Your Free Audit',
  },
  {
    id: 'architecture',
    title: 'Sustainable Architecture Consulting',
    tagline:
      'Transform bloated systems into lean, high-performance platforms that cost less to run.',
    summary:
      'Sustainability is performance. Your monolithic architecture is slowing you down, driving up hosting costs, and wasting energy. We redesign systems to be lean, efficient, and built for modern web standards—using edge computing, static-site generation, and optimized data flows that serve millions without waste.',
    listTitle: 'Benefits:',
    bullets: [
      {
        label: 'Faster page loads',
        text: 'Improved user experience and conversion rates',
      },
      {
        label: 'Lower infrastructure costs',
        text: 'Reduced server resources and data egress fees',
      },
      {
        label: 'Reduced emissions',
        text: 'Significantly reduce energy consumption on refactored paths',
      },
      {
        label: 'Future-proof stack',
        text: 'Modern architecture using TypeScript, React, and edge computing',
      },
    ],
    deliverable:
      'A comprehensive refactoring roadmap for your high-traffic paths with implementation priorities and projected cost savings.',
    ctaText: 'Discuss Your Architecture',
  },
  {
    id: 'devops',
    title: 'Green DevOps & CI/CD Optimization',
    tagline:
      'Stop wasting energy (and developer time) on inefficient build processes.',
    summary:
      'Your CI/CD pipeline runs thousands of times per year. Redundant builds, inefficient orchestration, and idling cloud resources drain money and energy without adding value. We optimize your entire development pipeline to be faster, cheaper, and measurably greener.',
    listTitle: 'What We Optimize:',
    bullets: [
      {
        label: 'Build efficiency',
        text: 'Eliminate redundant builds and improve cache utilization',
      },
      {
        label: 'Resource management',
        text: 'Right-size instances and eliminate idle capacity',
      },
      {
        label: 'Deployment strategy',
        text: 'Optimize delivery pipelines for speed and energy efficiency',
      },
      {
        label: 'Observability',
        text: 'Track energy metrics alongside performance metrics',
      },
    ],
    deliverable:
      'An optimized CI/CD blueprint with implementation guidance and projected energy and cost savings.',
    ctaText: 'Optimize Your Pipeline',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section
        className={css({
          py: { base: '3rem', md: '4rem' },
          px: '1rem',
          bg: 'gray.50',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
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
              color: 'gray.900',
            })}
          >
            Services
          </h1>
          <p
            className={css({
              fontSize: 'lg',
              color: 'gray.700',
              lineHeight: '1.8',
            })}
          >
            Build Faster, Leaner, Greener
          </p>
          <p className={css({ fontSize: 'sm', color: 'gray.600', mt: '1rem' })}>
            You can't reduce what you don't measure. Cut your digital emissions,
            improve performance, and reduce hosting costs with sustainable web
            architecture designed for scale.
          </p>
        </div>
      </section>

      <section
        className={css({ py: '4rem', px: '1rem' })}
        aria-label="Service details"
      >
        <div className={stack({ gap: '1.5rem', maxW: '4xl', mx: 'auto' })}>
          {services.map((service) => (
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
                        fontSize: '2xl',
                        fontWeight: 'bold',
                        color: 'gray.900',
                      })}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={css({
                        fontSize: 'lg',
                        color: 'green.700',
                        fontWeight: '600',
                      })}
                    >
                      {service.tagline}
                    </p>
                    <p
                      className={css({ color: 'gray.700', lineHeight: '1.8' })}
                    >
                      {service.summary}
                    </p>

                    <h3
                      className={css({
                        fontSize: 'lg',
                        fontWeight: 'bold',
                        color: 'gray.900',
                      })}
                    >
                      {service.listTitle}
                    </h3>
                    <ul className={css({ pl: '1.25rem', color: 'gray.700' })}>
                      {service.bullets.map((item) => (
                        <li key={item.label} className={css({ mb: '0.75rem' })}>
                          <strong>{item.label}:</strong> {item.text}
                        </li>
                      ))}
                    </ul>

                    <p
                      className={css({
                        color: 'gray.600',
                        fontStyle: 'italic',
                      })}
                    >
                      <strong>Deliverable:</strong> {service.deliverable}
                    </p>

                    <div>
                      <CTAButton
                        text={service.ctaText}
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
            Ready to Get Started?
          </h2>
          <p
            className={css({
              fontSize: 'lg',
              mb: '2rem',
              lineHeight: '1.8',
              color: 'gray.200',
            })}
          >
            Schedule a free consultation with our team to discuss which service
            is right for your organization.
          </p>
          <CTAButton
            text="Schedule Consultation"
            href="/contact"
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
