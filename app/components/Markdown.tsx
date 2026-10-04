import ReactMarkdown, { type Components } from 'react-markdown';
import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { Card as ParkCard } from '@/components/ui';
import { Link } from '@/components/Link';

/**
 * Renders trusted, build-time Markdown with the site's own styling.
 * Raw HTML in the source is ignored (react-markdown's default).
 */

const isExternal = (href: string) => /^https?:\/\//.test(href);

const body = css({ color: 'ink.muted', lineHeight: '1.8' });

const components: Components = {
  h2: ({ children }) => (
    <h2
      className={css({
        fontSize: 'displayMd',
        fontWeight: 'bold',
        color: 'ink',
        mt: '1rem',
        _first: { mt: 0 },
      })}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className={css({
        fontSize: 'displaySm',
        fontWeight: 'bold',
        color: 'ink',
      })}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => <p className={body}>{children}</p>,
  strong: ({ children }) => <strong>{children}</strong>,
  ul: ({ children }) => (
    <ul className={css({ pl: '1.25rem', color: 'ink.muted' })}>{children}</ul>
  ),
  li: ({ children }) => (
    <li className={css({ mb: '0.75rem', lineHeight: '1.8' })}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <ParkCard.Root
      className={css({
        borderInlineStartWidth: '4px',
        borderInlineStartColor: 'accent',
      })}
    >
      <ParkCard.Body>{children}</ParkCard.Body>
    </ParkCard.Root>
  ),
  a: ({ href = '', children }) => (
    <Link href={href} external={isExternal(href)}>
      {children}
    </Link>
  ),
};

const checklist: Components = {
  ul: ({ children }) => (
    <ul className={css({ listStyle: 'none', color: 'ink.muted' })}>
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className={css({ mb: '0.75rem', display: 'flex', gap: '0.75rem' })}>
      <span
        aria-hidden="true"
        className={css({ color: 'accent', fontWeight: 'bold' })}
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  ),
};

interface MarkdownProps {
  children: string;
  /** Render lists as ✓ checklists instead of bullets. */
  checklist?: boolean;
}

export function Markdown({ children, checklist: asChecklist }: MarkdownProps) {
  return (
    <div className={stack({ gap: '1rem' })}>
      <ReactMarkdown
        components={asChecklist ? { ...components, ...checklist } : components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
