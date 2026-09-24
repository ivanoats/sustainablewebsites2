import type { RecipeConfig } from '@pandacss/dev';
import { verdantPreset } from '../verdant/preset.mjs';

type RecipeName = 'button' | 'card' | 'fieldInput';

/**
 * Look up one of Verdant's vendored recipes, failing the Panda build loudly
 * if the preset ever stops providing it.
 */
export function verdantRecipe(name: RecipeName): RecipeConfig {
  const recipe = verdantPreset.theme?.extend?.recipes?.[name];
  if (!recipe) {
    throw new Error(`Verdant preset is missing the "${name}" recipe`);
  }
  return recipe as RecipeConfig;
}

/** Look up a variant value on a Verdant recipe, failing loudly if missing. */
export function verdantVariant(
  recipe: RecipeConfig,
  variant: string,
  value: string
) {
  const styles = recipe.variants?.[variant]?.[value];
  if (!styles) {
    throw new Error(`Verdant recipe is missing variant ${variant}=${value}`);
  }
  return styles;
}
