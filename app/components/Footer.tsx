import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={css({
        bg: 'gray.900',
        color: 'gray.100',
        py: '2rem',
        mt: '4rem',
      })}
    >
      <div
        className={css({
          maxW: '7xl',
          mx: 'auto',
          px: '1rem',
        })}
      >
        <div className={stack({ gap: '1rem', align: 'center' })}>
          <p className={css({ fontSize: 'sm' })}>
            © {currentYear} Sustainable Websites. All rights reserved.
          </p>
          <p className={css({ fontSize: 'sm', color: 'gray.400' })}>
            Built with performance, accessibility, and sustainability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
