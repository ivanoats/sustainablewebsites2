import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={css({
        bg: 'surface.200',
        color: 'ink',
        py: '2rem',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderColor: 'border',
      })}
    >
      <div
        className={css({
          maxW: '1080px',
          mx: 'auto',
          px: '1rem',
        })}
      >
        <div className={stack({ gap: '1rem', align: 'center' })}>
          <p className={css({ fontSize: 'bodySm' })}>
            © {currentYear} Sustainable Websites. All rights reserved.
          </p>
          <p className={css({ fontSize: 'bodySm', color: 'ink.muted' })}>
            Built with performance, accessibility, and sustainability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
