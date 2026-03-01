import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { Link } from '@/components/Link';
import { Card as ParkCard } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Twenty years of environmental advocacy combined with deep architectural expertise.',
};

export default function AboutPage() {
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
        aria-label="About us"
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
              color: 'gray.900',
            })}
          >
            About Sustainable Websites
          </h1>
        </div>
      </section>

      <section
        className={css({
          py: '4rem',
          px: '1rem',
          maxW: '4xl',
          mx: 'auto',
        })}
      >
        <ParkCard.Root>
          <ParkCard.Body>
            <article className={stack({ gap: '2rem' })}>
              <section>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mb: '1rem',
                    color: 'gray.900',
                  })}
                >
                  A Twenty-Year Mission
                </h2>
                <div className={stack({ gap: '1rem' })}>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    In 2004, the conversation around "green tech" was just
                    beginning. I founded Sustainable Websites with a simple but
                    ambitious goal: to provide a livelihood that was as
                    environmentally responsible as it was technically sound. At
                    the time, that meant pioneering carbon-offset web hosting,
                    thus bridging the gap between the digital world and the
                    physical planet.
                  </p>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    In 2013, after a decade of managing servers, I made a
                    conscious choice to pivot. I sold the hosting business to{' '}
                    <Link
                      href="https://www.greengeeks.com/track/sustainableweb/cp-sw2"
                      external
                    >
                      GreenGeeks
                    </Link>{' '}
                    to focus on two other passions: raising my children and
                    teaching the next generation of developers.
                  </p>
                </div>
              </section>

              <section>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mb: '1rem',
                    color: 'gray.900',
                  })}
                >
                  The Evolution of Scale
                </h2>
                <div className={stack({ gap: '1rem' })}>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    Sustainability is as much about people and processes as it
                    is about power usage. I founded{' '}
                    <Link href="https://www.codefellows.org/" external>
                      CodeFellows
                    </Link>{' '}
                    to create a more sustainable model for technical education,
                    moving away from the "gig economy" feel of adjunct
                    professorship to build a lasting ecosystem for knowledge
                    sharing.
                  </p>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    For the last six years, I have served as a Senior Software
                    Engineer and Architect at{' '}
                    <Link href="https://shop.lululemon.com/" external>
                      lululemon
                    </Link>
                    . There, I've operated at the highest levels of digital
                    scale, learning how to optimize web development teams,
                    streamline complex processes, and architect systems that
                    serve millions.
                  </p>
                </div>
              </section>

              <section>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mb: '1rem',
                    color: 'gray.900',
                  })}
                >
                  The New Standard: Beyond Offsets
                </h2>
                <div className={stack({ gap: '1rem' })}>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    With the recent release of the{' '}
                    <Link
                      href="https://www.w3.org/TR/web-sustainability-guidelines/"
                      external
                    >
                      W3C Web Sustainability Guidelines
                    </Link>{' '}
                    (WSG), the industry has reached a turning point. We now have
                    the framework to move beyond simple carbon offsets and
                    address the root of the problem: digital waste.
                  </p>
                  <ParkCard.Root
                    className={css({
                      borderInlineStartWidth: '4px',
                      borderInlineStartColor: 'green.600',
                    })}
                  >
                    <ParkCard.Body>
                      <p
                        className={css({
                          color: 'gray.700',
                          lineHeight: '1.8',
                        })}
                      >
                        <strong>The urgency is real.</strong> The digital
                        industry is now responsible for 2-5% of global
                        emissions. If the internet were a country, it would rank
                        among the top five polluters in the world. Between 2015
                        and 2021, internet visitors increased 60%, while web
                        traffic increased by 440%. Since the Paris Agreement,
                        average page sizes have increased by over 70% on desktop
                        and 140% on mobile.
                      </p>
                    </ParkCard.Body>
                  </ParkCard.Root>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    These aren't distant problems—they're immediate challenges
                    that every organization building digital products must face
                    today.
                  </p>
                </div>
              </section>

              <section>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mb: '1rem',
                    color: 'gray.900',
                  })}
                >
                  True Sustainability Is Efficiency
                </h2>
                <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                  True sustainability is found in efficiency. It's in the
                  architecture of our code, the weight of our pages, and the
                  logic of our development processes.
                </p>
              </section>

              <section>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    mb: '1rem',
                    color: 'gray.900',
                  })}
                >
                  Consulting for the Future
                </h2>
                <div className={stack({ gap: '1rem' })}>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    Sustainable Websites has returned to help companies navigate
                    this new frontier. I combine over twenty years of
                    environmental advocacy with deep architectural expertise to
                    help organizations build digital platforms that are lean,
                    performant, and responsible.
                  </p>
                  <p
                    className={css({
                      fontSize: 'lg',
                      fontWeight: '600',
                      color: 'green.700',
                    })}
                  >
                    We don't just offset your footprint; we help you build a
                    smaller one from the code up.
                  </p>
                  <p className={css({ color: 'gray.700', lineHeight: '1.8' })}>
                    Ready to make your digital products part of the solution?{' '}
                    <Link href="/contact">Get in touch</Link> to discuss how we
                    can help your organization lead on sustainability.
                  </p>
                </div>
              </section>
            </article>
          </ParkCard.Body>
        </ParkCard.Root>

        <footer
          className={css({ mt: '2rem', color: 'gray.500', fontSize: 'sm' })}
        >
          <p>
            Sources:{' '}
            <Link
              href="https://httparchive.org/reports/state-of-the-web#page-weight"
              external
              variant="subtle"
            >
              HTTP Archive
            </Link>
            ,{' '}
            <Link
              href="https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks"
              external
              variant="subtle"
            >
              IEA
            </Link>
            ,{' '}
            <Link
              href="https://www.greenpeace.org/usa/internet-growing-to-suprass-television-should-be-powered-with-clean-energy/"
              external
              variant="subtle"
            >
              Greenpeace
            </Link>
            ,{' '}
            <Link href="https://www.ipcc.ch/sr15/" external variant="subtle">
              IPCC
            </Link>
            ,{' '}
            <Link
              href="https://www.cell.com/patterns/pdfExtended/S2666-3899(21)00188-4"
              external
              variant="subtle"
            >
              Lancaster University
            </Link>
          </p>
        </footer>
      </section>
    </div>
  );
}
