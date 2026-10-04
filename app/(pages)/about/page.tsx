import { css } from '@/styled-system/css';
import { Link } from '@/components/Link';
import { Markdown } from '@/components/Markdown';
import { Card as ParkCard } from '@/components/ui';
import { loadContent, readList, readString } from '@/lib/content';
import type { Metadata } from 'next';

const about = loadContent('about', (data, file) => ({
  title: readString(data, 'title', file),
  description: readString(data, 'description', file),
  heading: readString(data, 'heading', file),
  sources: readList(data, 'sources', file).map((source) => ({
    label: readString(source, 'label', file),
    href: readString(source, 'href', file),
  })),
}));

export const metadata: Metadata = {
  title: about.data.title,
  description: about.data.description,
};

export default function AboutPage() {
  const { heading, sources } = about.data;

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
        aria-label="About us"
      >
        <div className={css({ maxW: '4xl', mx: 'auto' })}>
          <h1
            className={css({
              fontSize: { base: '3xl', md: '4xl' },
              fontWeight: 'bold',
              color: 'ink',
            })}
          >
            {heading}
          </h1>
        </div>
      </section>

      <section
        className={css({ py: '4rem', px: '1rem', maxW: '4xl', mx: 'auto' })}
      >
        <ParkCard.Root>
          <ParkCard.Body>
            <article>
              <Markdown>{about.body}</Markdown>
            </article>
          </ParkCard.Body>
        </ParkCard.Root>

        <footer
          className={css({
            mt: '2rem',
            color: 'ink.muted',
            fontSize: 'bodySm',
          })}
        >
          <p>
            Sources:{' '}
            {sources.map((source, i) => (
              <span key={source.href}>
                {i > 0 && ', '}
                <Link href={source.href} external variant="subtle">
                  {source.label}
                </Link>
              </span>
            ))}
          </p>
        </footer>
      </section>
    </div>
  );
}
