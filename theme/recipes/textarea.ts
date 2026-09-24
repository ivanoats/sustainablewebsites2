import { defineRecipe } from '@pandacss/dev';
import { verdantRecipe } from './verdant';

export const textarea = defineRecipe({
  className: 'fieldTextarea',
  jsx: ['Textarea'],
  base: {
    ...verdantRecipe('fieldInput').base,
    resize: 'vertical',
    minHeight: '8rem',
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _invalid: { borderColor: 'critical' },
  },
});
