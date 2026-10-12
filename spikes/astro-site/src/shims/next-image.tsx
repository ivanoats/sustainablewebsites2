import type { ImgHTMLAttributes } from 'react';

type Source = string | { src: string };

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: Source;
  priority?: boolean;
};

/** Minimal stand-in for next/image: a plain <img>. Vite imports give a URL string. */
export default function Image({ src, priority, alt = '', ...rest }: Readonly<Props>) {
  const url = typeof src === 'string' ? src : src.src;
  return (
    <img
      src={url}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  );
}
