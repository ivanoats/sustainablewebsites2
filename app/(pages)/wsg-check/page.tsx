import { css } from '@/styled-system/css';
import { CTAButton } from '@/components/CTAButton';
import { Markdown } from '@/components/Markdown';
import { loadContent, readObject, readString } from '@/lib/content';
import type { Metadata } from 'next';

const page = loadContent('wsg-check', (data, file) => {
  const cta = readObject(data, 'cta', file);
  return {
    title: readString(data, 'title', file),
    description: readString(data, 'description', file),
    heading: readString(data, 'heading', file),
    intro: readString(data, 'intro', file),
    cta: {
      label: readString(cta, 'label', file),
      href: readString(cta, 'href', file),
    },
  };
});

export const metadata: Metadata = {
  title: page.data.title,
  description: page.data.description,
};

export default function WSGCheckPage() {
  const { heading, intro, cta } = page.data;

  return (
    <div className={css({ bg: 'surface.200' })}>
      <section
        className={css({
          py: '4rem',
          px: '1rem',
          bg: 'surface.100',
          color: 'ink',
          textAlign: 'center',
        })}
        aria-label="WSG Check tool"
      >
        <div className={css({ maxW: '4xl', mx: 'auto' })}>
          <h1
            className={css({ fontSize: '3xl', fontWeight: 'bold', mb: '1rem' })}
          >
            {heading}
          </h1>
          <p className={css({ fontSize: 'displaySm', lineHeight: '1.8' })}>
            {intro}
          </p>
        </div>
      </section>

      <section
        className={css({ py: '4rem', px: '1rem', maxW: '4xl', mx: 'auto' })}
      >
        <Markdown checklist>{page.body}</Markdown>
        <div className={css({ textAlign: 'center', mt: '2rem' })}>
          <CTAButton
            text={cta.label}
            href={cta.href}
            variant="primary"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
