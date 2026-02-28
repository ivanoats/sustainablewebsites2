import { css } from '@/styled-system/css';
import { Link } from '@/components/Link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Twenty years of environmental advocacy combined with deep architectural expertise.',
};

export default function AboutPage() {
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
        aria-label="About us"
      >
        <div
          className={css({
            maxW: '4xl',
            mx: 'auto',
          })}
        >
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            About Sustainable Websites
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          maxW: '4xl',
          mx: 'auto',
        })}
      >
        <article className={css({ color: 'gray.700', lineHeight: '1.8' })}>
          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            A Twenty-Year Mission
          </h2>
          <p className={css({ mb: '1.5rem' })}>
            In 2004, the conversation around "green tech" was just beginning. I founded Sustainable
            Websites with a simple but ambitious goal: to provide a livelihood that was as
            environmentally responsible as it was technically sound. At the time, that meant pioneering
            carbon-offset web hosting, thus bridging the gap between the digital world and the physical
            planet.
          </p>
          <p className={css({ mb: '2rem' })}>
            In 2013, after a decade of managing servers, I made a conscious choice to pivot. I sold the
            hosting business to{' '}
            <Link href="https://www.greengeeks.com/track/sustainableweb/cp-sw2" external>
              GreenGeeks
            </Link>{' '}
            to focus on two other passions: raising my children and teaching the next generation of
            developers.
          </p>

          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            The Evolution of Scale
          </h2>
          <p className={css({ mb: '1.5rem' })}>
            Sustainability is as much about people and processes as it is about power usage. I founded{' '}
            <Link href="https://www.codefellows.org/" external>
              CodeFellows
            </Link>{' '}
            to create a more sustainable model for technical education, moving away from the "gig
            economy" feel of adjunct professorship to build a lasting ecosystem for knowledge sharing.
          </p>
          <p className={css({ mb: '2rem' })}>
            For the last six years, I have served as a Senior Software Engineer and Architect at{' '}
            <Link href="https://shop.lululemon.com/" external>
              lululemon
            </Link>
            . There, I've operated at the highest levels of digital scale, learning how to optimize web
            development teams, streamline complex processes, and architect systems that serve millions.
          </p>

          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            The New Standard: Beyond Offsets
          </h2>
          <p className={css({ mb: '1.5rem' })}>
            With the recent release of the{' '}
            <Link href="https://www.w3.org/TR/web-sustainability-guidelines/" external>
              W3C Web Sustainability Guidelines
            </Link>{' '}
            (WSG), the industry has reached a turning point. We now have the framework to move beyond
            simple carbon offsets and address the root of the problem: digital waste.
          </p>
          <p className={css({ mb: '1rem', p: '1.5rem', bg: 'gray.50', borderLeft: '4px solid', borderColor: 'green.600' })}>
            <strong>The urgency is real.</strong> The digital industry is now responsible for 2-5% of
            global emissions. If the internet were a country, it would rank among the top five polluters
            in the world. Between 2015 and 2021, internet visitors increased 60%, while web traffic
            increased by 440%. Since the Paris Agreement, average page sizes have increased by over 70%
            on desktop and 140% on mobile.
          </p>
          <p className={css({ mb: '2rem' })}>
            These aren't distant problems—they're immediate challenges that every organization building
            digital products must face today.
          </p>

          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            True Sustainability Is Efficiency
          </h2>
          <p className={css({ mb: '2rem' })}>
            True sustainability is found in efficiency. It's in the architecture of our code, the weight
            of our pages, and the logic of our development processes.
          </p>

          <h2 className={css({ fontSize: '2xl', fontWeight: 'bold', mb: '1rem', color: 'gray.900' })}>
            Consulting for the Future
          </h2>
          <p className={css({ mb: '1.5rem' })}>
            Sustainable Websites has returned to help companies navigate this new frontier. I combine
            over twenty years of environmental advocacy with deep architectural expertise to help
            organizations build digital platforms that are lean, performant, and responsible.
          </p>
          <p className={css({ mb: '2rem', fontSize: 'lg', fontWeight: '600', color: 'green.700' })}>
            We don't just offset your footprint; we help you build a smaller one from the code up.
          </p>
          <p className={css({ fontSize: 'base' })}>
            Ready to make your digital products part of the solution?{' '}
            <Link href="/contact">Get in touch</Link>{' '}
            to discuss how we can help your organization lead on sustainability.
          </p>
        </article>

        <footer className={css({ mt: '3rem', pt: '2rem', borderTop: '1px solid', borderColor: 'gray.200', color: 'gray.500', fontSize: 'sm' })}>
          <p>
            Sources:{' '}
            <Link href="https://httparchive.org/reports/state-of-the-web#page-weight" external variant="subtle">
              HTTP Archive
            </Link>
            ,{' '}
            <Link href="https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks" external variant="subtle">
              IEA
            </Link>
            ,{' '}
            <Link href="https://www.greenpeace.org/usa/internet-growing-to-suprass-television-should-be-powered-with-clean-energy/" external variant="subtle">
              Greenpeace
            </Link>
            ,{' '}
            <Link href="https://www.ipcc.ch/sr15/" external variant="subtle">
              IPCC
            </Link>
            ,{' '}
            <Link href="https://www.cell.com/patterns/pdfExtended/S2666-3899(21)00188-4" external variant="subtle">
              Lancaster University
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
}
