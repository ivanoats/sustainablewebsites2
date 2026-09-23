import { defineRecipe } from '@pandacss/dev';
import { verdantPreset } from '../verdant/preset.mjs';

const verdant = verdantPreset.theme!.extend!.recipes!.button;

// Preserve the existing public Button API while sharing Verdant's recipes.
export const button = defineRecipe({
  ...verdant,
  className: 'btn',
  jsx: ['Button', 'ButtonGroup'],
  base: {
    ...verdant.base,
    gap: '2',
    maxWidth: '100%',
    whiteSpace: 'normal',
    textAlign: 'center',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'focusRing',
      outlineOffset: '2px',
    },
  },
  variants: {
    variant: {
      solid: verdant.variants!.variant.primary,
      outline: verdant.variants!.variant.secondary,
    },
    size: {
      sm: { paddingInline: '3' },
      md: { paddingInline: '4' },
      lg: { paddingInline: '6', paddingBlock: '3', fontSize: 'body' },
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
});
