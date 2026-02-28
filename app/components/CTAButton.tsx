import { Button } from '@/components/ui';
import { CTAButtonProps } from '@/types/index';

export function CTAButton({
  text,
  href,
  variant = 'primary',
  size = 'md',
}: CTAButtonProps) {
  const variantMap = {
    primary: 'solid',
    secondary: 'outline',
  } as const;

  const sizeMap = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  } as const;

  return (
    <Button asChild variant={variantMap[variant]} size={sizeMap[size]}>
      <a href={href}>{text}</a>
    </Button>
  );
}
