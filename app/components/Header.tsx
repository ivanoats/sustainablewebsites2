import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
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
          <a
            href="/"
            className={css({
              fontSize: 'xl',
              fontWeight: 'bold',
              color: 'green.600',
              textDecoration: 'none',
              _focus: { outline: 'none' },
              _focusVisible: { ring: '2px', ringColor: 'green.500', borderRadius: 'md' },
            })}
          >
            {siteConfig.name}
          </a>
          <nav
            className={flex({
              gap: '2rem',
              align: 'center',
            })}
            aria-label="Primary navigation"
          >
            {siteConfig.navbar.map((link: NavLink) => (
              <a
                key={link.href}
                href={link.href}
                className={css({
                  color: 'gray.700',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'colors',
                  _hover: { color: 'green.600' },
                  _focus: { outline: 'none' },
                  _focusVisible: { ring: '2px', ringColor: 'green.500', borderRadius: 'md' },
                })}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
