import { Card as ParkCard } from '@/components/ui';
import { css } from '@/styled-system/css';
import { CardProps } from '@/types/index';

export function Card({
  title,
  description,
  icon,
  href,
  children,
}: CardProps) {
  const content = (
    <ParkCard.Root>
      <ParkCard.Body>
      {icon && (
        <div className={css({ fontSize: '2xl' })}>
          {icon}
        </div>
      )}
      <ParkCard.Title>{title}</ParkCard.Title>
      <ParkCard.Description>{description}</ParkCard.Description>
      {children}
      </ParkCard.Body>
    </ParkCard.Root>
  );

  if (href) {
    return (
      <a href={href} className={css({ display: 'block' })}>
        {content}
      </a>
    );
  }

  return content;
}
