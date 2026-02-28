import { css } from '@/styled-system/css';

/**
 * Reusable Link component with consistent styling variants
 * Follows Park UI pattern of wrapping native elements with styled system
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
    color: 'green.600',
    textDecoration: 'underline',
    fontWeight: '600',
    _hover: { color: 'green.700' },
    _focusVisible: { outline: '2px solid', outlineColor: 'green.500', borderRadius: 'sm' },
  }),
  nav: css({
    color: 'gray.700',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'colors',
    _hover: { color: 'green.600' },
    _focus: { outline: 'none' },
    _focusVisible: { ring: '2px', ringColor: 'green.500', borderRadius: 'md' },
  }),
  brand: css({
    fontSize: 'xl',
    fontWeight: 'bold',
    color: 'green.600',
    textDecoration: 'none',
    _focus: { outline: 'none' },
    _focusVisible: { ring: '2px', ringColor: 'green.500', borderRadius: 'md' },
  }),
  subtle: css({
    color: 'gray.600',
    textDecoration: 'none',
    _hover: { color: 'gray.700' },
    _focusVisible: { outline: '2px solid', outlineColor: 'gray.500', borderRadius: 'sm' },
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
  const combinedClass = className ? `${variantClass} ${className}` : variantClass;

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
