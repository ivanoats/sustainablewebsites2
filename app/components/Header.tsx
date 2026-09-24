import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { Link } from '@/components/Link';
import { siteConfig } from '@/lib/config';
import type { NavLink } from '@/types/index';
import Image from 'next/image';
import logo from '@/SW_logo_431x431.gif';

export function Header() {
  return (
    <header
      className={css({
        bg: 'surface.200',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderColor: 'border',
        py: '1rem',
      })}
    >
      <div
        className={flex({
          maxW: '1080px',
          mx: 'auto',
          px: '1rem',
          justify: 'space-between',
          align: 'center',
          wrap: 'wrap',
          gap: '4',
        })}
      >
        <Link
          href="/"
          variant="brand"
          className={flex({ align: 'center', gap: '0.75rem' })}
        >
          <Image
            src={logo}
            alt="Sustainable Websites logo"
            width={40}
            height={40}
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>
        <nav
          className={flex({
            gap: { base: '3', md: '6' },
            wrap: 'wrap',
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
    </header>
  );
}
