import { defineRecipe } from '@pandacss/dev';
import { verdantPreset } from '../verdant/preset.mjs';

export const textarea = defineRecipe({
  className: 'fieldTextarea',
  jsx: ['Textarea'],
  base: {
    ...verdantPreset.theme!.extend!.recipes!.fieldInput.base,
    resize: 'vertical',
    minHeight: '8rem',
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _invalid: { borderColor: 'critical' },
  },
});
