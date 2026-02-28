import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { Link } from '@/components/Link';
import { siteConfig } from '@/lib/config';
import type { NavLink } from '@/types/index';

export function Header() {
  return (
    <header
      className={css({
        bg: 'white',
        borderBottom: '1px solid',
        borderColor: 'gray.200',
        py: '1rem',
      })}
    >
      <div
        className={css({
          maxW: '7xl',
          mx: 'auto',
          px: '1rem',
        })}
      >
        <div className={flex({ justify: 'space-between', align: 'center' })}>
          <Link href="/" variant="brand">
            {siteConfig.name}
          </Link>
          <nav
            className={flex({
              gap: '2rem',
              align: 'center',
            })}
            aria-label="Primary navigation"
          >
            {siteConfig.navbar.map((link: NavLink) => (
              <Link key={link.href} href={link.href} variant="nav">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
