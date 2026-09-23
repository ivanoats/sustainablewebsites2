import { fieldAnatomy } from '@ark-ui/react/anatomy';
import { defineSlotRecipe } from '@pandacss/dev';

export const field = defineSlotRecipe({
  className: 'field',
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      alignItems: 'center',
      color: 'ink',
      display: 'flex',
      gap: '0.5',
      textAlign: 'start',
      userSelect: 'none',
      textStyle: 'label',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    requiredIndicator: {
      color: 'critical',
    },
    helperText: {
      color: 'ink.muted',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    errorText: {
      color: 'critical',
      textStyle: 'sm',
    },
  },
});
