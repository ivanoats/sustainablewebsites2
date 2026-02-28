import { css } from '@/styled-system/css';
import { CTAButton } from '@/components/CTAButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Digital sustainability consulting: audits, architecture, and DevOps optimization.',
};

export default function ServicesPage() {
  return (
    <div className={css({ bg: 'white' })}>
      {/* Hero Section */}
      <section
        className={css({
          py: '4rem',
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
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            Services
          </h1>
          <p className={css({ fontSize: 'lg', color: 'gray.600', lineHeight: '1.8' })}>
            Build Faster, Leaner, Greener
          </p>
          <p className={css({ fontSize: 'sm', color: 'gray.500', mt: '1rem' })}>
            You can't reduce what you don't measure. Cut your digital emissions, improve performance,
            and reduce hosting costs with sustainable web architecture designed for scale.
          </p>
        </div>
      </section>

      {/* Service 1: Digital Footprint Audit */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
        })}
        id="audit"
        aria-label="Digital Footprint Audit"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '0.5rem', color: 'gray.900' })}>
            Digital Footprint Audit
          </h2>
          <p className={css({ fontSize: 'lg', color: 'green.600', mb: '2rem', fontWeight: '600' })}>
            Discover exactly where your digital waste lives—and what it's costing you.
          </p>

          <p className={css({ fontSize: 'base', color: 'gray.700', mb: '2rem', lineHeight: '1.8' })}>
            Most companies don't realize how much energy their digital products consume or where the
            inefficiencies hide. Our comprehensive technical audit analyzes your entire stack: page
            weight, data transfer efficiency, server-side energy intensity, and architectural
            bottlenecks.
          </p>

          <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            Benefits:
          </h3>
          <ul className={css({ mb: '2rem', color: 'gray.700' })}>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Quantified baseline:</strong> Know your exact emissions and cost impact
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Prioritized action plan:</strong> Focus on changes with the highest ROI
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>WSG compliance mapping:</strong> Align with W3C Web Sustainability Guidelines
              standards
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Competitive advantage:</strong> Lead your industry with measurable sustainability
              commitments
            </li>
          </ul>

          <p className={css({ fontSize: 'sm', color: 'gray.600', mb: '2rem', fontStyle: 'italic' })}>
            <strong>Deliverable:</strong> A detailed Sustainability Scorecard covering User
            Experience, Web Development, Hosting/Infrastructure, and Business Strategy—with clear
            recommendations and projected savings.
          </p>

          <CTAButton text="Get Your Free Audit" href="/contact" variant="primary" size="md" />
        </div>
      </section>

      {/* Service 2: Sustainable Architecture Consulting */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          bg: 'gray.50',
        })}
        id="architecture"
        aria-label="Sustainable Architecture Consulting"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '0.5rem', color: 'gray.900' })}>
            Sustainable Architecture Consulting
          </h2>
          <p className={css({ fontSize: 'lg', color: 'green.600', mb: '2rem', fontWeight: '600' })}>
            Transform bloated systems into lean, high-performance platforms that cost less to run.
          </p>

          <p className={css({ fontSize: 'base', color: 'gray.700', mb: '2rem', lineHeight: '1.8' })}>
            Sustainability is performance. Your monolithic architecture is slowing you down, driving
            up hosting costs, and wasting energy. We redesign systems to be lean, efficient, and built
            for modern web standards—using edge computing, static-site generation, and optimized data
            flows that serve millions without waste.
          </p>

          <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            Benefits:
          </h3>
          <ul className={css({ mb: '2rem', color: 'gray.700' })}>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Faster page loads:</strong> Improved user experience and conversion rates
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Lower infrastructure costs:</strong> Reduced server resources and data egress fees
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Reduced emissions:</strong> Cut energy consumption by 30-70% on refactored paths
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Future-proof stack:</strong> Modern architecture using TypeScript, React, and edge
              computing
            </li>
          </ul>

          <p className={css({ fontSize: 'sm', color: 'gray.600', mb: '2rem', fontStyle: 'italic' })}>
            <strong>Deliverable:</strong> A comprehensive refactoring roadmap for your high-traffic
            paths with implementation priorities and projected cost savings.
          </p>

          <CTAButton
            text="Discuss Your Architecture"
            href="/contact"
            variant="primary"
            size="md"
          />
        </div>
      </section>

      {/* Service 3: Green DevOps & CI/CD Optimization */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
        })}
        id="devops"
        aria-label="Green DevOps & CI/CD Optimization"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '0.5rem', color: 'gray.900' })}>
            Green DevOps & CI/CD Optimization
          </h2>
          <p className={css({ fontSize: 'lg', color: 'green.600', mb: '2rem', fontWeight: '600' })}>
            Stop wasting energy (and developer time) on inefficient build processes.
          </p>

          <p className={css({ fontSize: 'base', color: 'gray.700', mb: '2rem', lineHeight: '1.8' })}>
            Your CI/CD pipeline runs thousands of times per year. Redundant builds, inefficient
            orchestration, and idling cloud resources drain money and energy without adding value. We
            optimize your entire development pipeline to be faster, cheaper, and measurably greener.
          </p>

          <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            What We Optimize:
          </h3>
          <ul className={css({ mb: '2rem', color: 'gray.700' })}>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Build efficiency:</strong> Eliminate redundant builds and improve cache utilization
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Resource management:</strong> Right-size instances and eliminate idle capacity
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Deployment strategy:</strong> Optimize delivery pipelines for speed and energy
              efficiency
            </li>
            <li className={css({ mb: '0.75rem' })}>
              <strong>Observability:</strong> Track energy metrics alongside performance metrics
            </li>
          </ul>

          <p className={css({ fontSize: 'sm', color: 'gray.600', mb: '2rem', fontStyle: 'italic' })}>
            <strong>Deliverable:</strong> An optimized CI/CD blueprint with implementation guidance and
            projected energy and cost savings.
          </p>

          <CTAButton text="Optimize Your Pipeline" href="/contact" variant="primary" size="md" />
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
            Ready to Get Started?
          </h2>
          <p
            className={css({
              fontSize: 'lg',
              mb: '2rem',
              lineHeight: '1.8',
            })}
          >
            Schedule a free consultation with our team to discuss which service is right for your
            organization.
          </p>
          <CTAButton text="Schedule Consultation" href="/contact" variant="primary" size="lg" />
        </div>
      </section>
    </div>
  );
}
