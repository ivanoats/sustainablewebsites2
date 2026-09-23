# Verdant source snapshot

This directory vendors the unchanged preset, token and theme modules from
`@sustainablewebsites/verdant-design` 0.1.0 in the sibling
`verdant-wsg-demo/packages/verdant-design` project. The ISC license is included.
Keeping the source here makes this project build independently of that checkout
or an unpublished package. Refresh these three `.mjs` files together when
updating Verdant; put application customizations in `theme/recipes` instead.

`panda.config.ts` loads the default Panda preset followed by Verdant. Existing
Ark UI controls adapt Verdant's button, field and card recipes. The card slot
recipe is named `arkCard` to avoid colliding with Verdant's plain `card` recipe.

Pages use `surface.100` / `surface.200`, `ink` / `ink.muted`, `accent`, `border`
and `border.control`. Dark mode follows the operating system automatically;
increased contrast and reduced motion follow user preferences as well. There
is no manual theme override or additional browser runtime.
