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
      surface: {
        ...verdant.variants!.variant.secondary,
        background: 'surface.200',
        _hover: {
          borderColor: 'accent',
          color: 'accent',
          background: 'surface.100',
        },
      },
      subtle: {
        background: 'surface.100',
        color: 'ink',
        borderColor: 'transparent',
        _hover: {
          background: 'surface.200',
          color: 'accent',
        },
      },
      outline: verdant.variants!.variant.secondary,
      plain: {
        background: 'transparent',
        color: 'ink',
        borderColor: 'transparent',
        _hover: {
          background: 'surface.100',
          color: 'accent',
        },
      },
    },
    size: {
      '2xs': { paddingInline: '2.5' },
      xs: { paddingInline: '3' },
      sm: { paddingInline: '3' },
      md: { paddingInline: '4' },
      lg: { paddingInline: '6', paddingBlock: '3', fontSize: 'body' },
      xl: { paddingInline: '7', paddingBlock: '3', fontSize: 'body' },
      '2xl': { paddingInline: '8', paddingBlock: '4', fontSize: 'displaySm' },
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
});
