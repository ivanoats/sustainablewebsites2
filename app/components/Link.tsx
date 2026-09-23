import { css } from '@/styled-system/css';

/**
 * Reusable Link component with consistent styling variants
 * Uses Verdant semantic colors for every theme
 */

interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'nav' | 'brand' | 'subtle';
  external?: boolean;
  className?: string;
}

const linkVariants = {
  primary: css({
    color: 'accent',
    textDecoration: 'underline',
    fontWeight: '600',
    _hover: { color: 'accent.strong' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'focusRing',
      borderRadius: 'sm',
    },
  }),
  nav: css({
    color: 'ink.muted',
    textDecoration: 'none',
    fontWeight: '500',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    _hover: { color: 'accent' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'focusRing',
      borderRadius: 'md',
    },
  }),
  brand: css({
    fontSize: 'displaySm',
    fontWeight: 'bold',
    color: 'accent',
    textDecoration: 'none',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'focusRing',
      borderRadius: 'md',
    },
  }),
  subtle: css({
    color: 'ink.muted',
    textDecoration: 'none',
    _hover: { color: 'ink.muted' },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'ink.muted',
      borderRadius: 'sm',
    },
  }),
};

export function Link({
  href,
  children,
  variant = 'primary',
  external = false,
  className,
}: LinkProps) {
  const variantClass = linkVariants[variant];
  const combinedClass = className
    ? `${variantClass} ${className}`
    : variantClass;

  return (
    <a
      href={href}
      className={combinedClass}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
}
