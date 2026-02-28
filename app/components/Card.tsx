import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { CardProps } from '@/types/index';

export function Card({
  title,
  description,
  icon,
  href,
  children,
}: CardProps) {
  const cardStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    p: '1.5rem',
    bg: 'white',
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: 'lg',
    transition: 'box-shadow',
    _hover: { boxShadow: 'lg' },
  });

  const content = (
    <div className={cardStyles}>
      {icon && (
        <div className={css({ fontSize: '2xl' })}>
          {icon}
        </div>
      )}
      <div className={stack({ gap: '0.5rem' })}>
        <h3 className={css({ fontSize: 'lg', fontWeight: 'semibold', color: 'gray.900' })}>
          {title}
        </h3>
        <p className={css({ color: 'gray.600' })}>
          {description}
        </p>
      </div>
      {children}
    </div>
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
