import { css } from '@/styled-system/css';
import { CTAButtonProps } from '@/types/index';

export function CTAButton({
  text,
  href,
  variant = 'primary',
  size = 'md',
}: CTAButtonProps) {
  const variantStyles = {
    primary: css({
      bg: 'green.600',
      color: 'white',
      _hover: { bg: 'green.700' },
      _focusVisible: { ringColor: 'green.500' },
    }),
    secondary: css({
      bg: 'gray.200',
      color: 'gray.900',
      _hover: { bg: 'gray.300' },
      _focusVisible: { ringColor: 'gray.500' },
    }),
  };

  const sizeStyles = {
    sm: css({ px: '1rem', py: '0.5rem', fontSize: 'sm' }),
    md: css({ px: '1.5rem', py: '0.75rem', fontSize: 'base' }),
    lg: css({ px: '2rem', py: '1rem', fontSize: 'lg' }),
  };

  const baseStyles = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'semibold',
    borderRadius: 'lg',
    transition: 'colors',
    cursor: 'pointer',
    textDecoration: 'none',
    _focusVisible: { outline: 'none', ring: '2px', ringOffset: '2px' },
  });

  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {text}
    </a>
  );
}
