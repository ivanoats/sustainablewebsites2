import type { ReactNode } from 'react';
import { Card as ParkCard } from '@/components/ui';

/**
 * Park UI cards share React context between Card.Root and Card.Body. Each React
 * component used from an .astro file renders separately, so context cannot
 * cross the template: Root and Body must be composed inside one React
 * component. Children arrive from Astro as static HTML.
 */
export default function CardShell({ children }: { children?: ReactNode }) {
  return (
    <ParkCard.Root>
      <ParkCard.Body>{children}</ParkCard.Body>
    </ParkCard.Root>
  );
}
