import { defineConfig } from '@pandacss/dev';
import { verdantPreset } from './theme/verdant/preset.mjs';
import { recipes, slotRecipes } from './theme/recipes';
import { textStyles } from './theme/text-styles';
import { layerStyles } from './theme/layer-styles';
import { conditions } from './theme/conditions';
import { zIndex } from './theme/tokens/z-index';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/dev/presets', verdantPreset],
  include: ['./app/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  // Ark wrappers and CTA variant maps are dynamic; emit their small recipe sets.
  staticCss: { recipes: { button: ['*'], arkCard: ['*'] } },
  conditions,
  theme: {
    extend: {
      tokens: { zIndex },
      textStyles,
      layerStyles,
      recipes,
      slotRecipes,
    },
  },
  globalCss: {
    extend: {
      '*': {
        '--global-color-border': 'colors.border',
        '--global-color-focus-ring': 'colors.focusRing',
      },
      'h1, h2, h3': {
        lineHeight: '1.2',
        letterSpacing: '-0.025em',
        textWrap: 'balance',
      },
      p: { textWrap: 'pretty' },
    },
  },
});
