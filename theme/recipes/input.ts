import { defineRecipe } from '@pandacss/dev';
import { verdantPreset } from '../verdant/preset.mjs';

export const input = defineRecipe({
  className: 'fieldInput',
  jsx: ['Input'],
  base: {
    ...verdantPreset.theme!.extend!.recipes!.fieldInput.base,

    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _invalid: { borderColor: 'critical' },
  },
});
