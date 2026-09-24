import { defineRecipe } from '@pandacss/dev';
import { verdantRecipe } from './verdant';

export const input = defineRecipe({
  className: 'fieldInput',
  jsx: ['Input'],
  base: {
    ...verdantRecipe('fieldInput').base,

    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _invalid: { borderColor: 'critical' },
  },
});
