import { defineSlotRecipe } from '@pandacss/dev';
import { verdantRecipe } from './verdant';

export const card = defineSlotRecipe({
  className: 'verdant-card',
  slots: ['root', 'header', 'body', 'footer', 'title', 'description'],
  base: {
    root: {
      ...verdantRecipe('card').base,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '6',
    },
    header: { display: 'flex', flexDirection: 'column', gap: '2', mb: '4' },
    body: { display: 'flex', flex: '1', flexDirection: 'column', gap: '3' },
    footer: { display: 'flex', gap: '3', mt: '4' },
    title: {
      fontSize: 'displaySm',
      lineHeight: 'displaySm',
      fontWeight: '600',
      color: 'ink',
    },
    description: { color: 'ink.muted', fontSize: 'body', lineHeight: 'body' },
  },
  variants: {
    variant: {
      outline: { root: {} },
      elevated: { root: { boxShadow: 'sm' } },
      subtle: { root: { background: 'surface.100' } },
    },
  },
  defaultVariants: { variant: 'outline' },
});
