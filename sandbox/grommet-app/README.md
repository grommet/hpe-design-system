This is a testing application for hpe-design-tokens with Grommet.

## Critical icon hover prototype

Run `pnpm --filter grommet-app dev` and open
`http://localhost:5173/critical-icon-hover.html`. This standalone page does not
require sandbox login. It compares light and dark `background-default`
containers with the existing critical icon resting colors and proposed
`base.color.red.850` (light, new proposed primitive `#ad211c`) /
`base.color.red.400` (dark) hover aliases.
Hover, keyboard focus, or the Hold hover control previews the proposed color.
The page reads the source token JSON and defines the proposed red.850 locally;
it does not change published tokens.

The same interactive example is registered in the design-system Storybook at
**Design Tokens / Color / Critical icon hover / Light And Dark**. Run
`pnpm --filter @shared/aries-core storybook` to view it locally. On a pull
request, open the `hpe-design-storybook` deploy preview and select that story
(`/?path=/story/design-tokens-color-critical-icon-hover--light-and-dark`).
The separate `hpe-theme-preview` app build also includes the standalone
`/critical-icon-hover.html` page. Preview URLs become available after the PR's
Netlify builds finish.
