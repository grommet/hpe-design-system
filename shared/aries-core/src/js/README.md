# Aries Core source organization

## Reusable components

New React components and examples use TypeScript (`.tsx`); data, context, and
barrel modules without JSX use `.ts`. Do not keep JavaScript duplicates.

- `components/`: focused building blocks intended for use across pages.
  `MetricValue` and `ServiceCard` have caller-supplied values/content;
  `status/` groups the status count, icon, and shared status mapping.
- `patterns/cards/`: related reusable card compositions, including `ChartCard`,
  `ChartCardHeader`, `MetricCard`, and the responsive `MetricCards` group.
  Callers provide their titles, content, and optional actions/footer.
- `patterns/navigation/GlobalHeader/`: shared header, identity, user
  navigation, avatar, context, and menu-layer behavior. Callers supply identity,
  labels, user data, menu content, and actions.
- `examples/dashboards/overview/`: the complete dashboard use case, including
  its sample data, health scenario, and application layout.
- `components/layouts/AppContainer/`: the shared layout wrapper.

The top-level directories communicate reuse intent: components are focused
building blocks, patterns are bring-your-own-content compositions, and
examples include use-case content. Patterns use intuitive concept groups such
as `cards/`, with related files kept flat within each group. The existing `core/`,
`helpers/`, `layouts/`, and `typography/` categories remain; `AppContainer`
joins the intuitive `layouts/` category.

## Examples and data

- `examples/dashboards/overview/`: the overview dashboard composition, its
  sections, health presentation helpers, and dashboard-specific sample data.
  The default user fixture and `GlobalHeader/OverviewHeader.tsx` are local to
  this example. The example supplies the shared header pattern with its HPE
  logo, service name, account details, navigation, and sign-out behavior;
  the shared pattern contains the user context and menu presentation.

For the shared header, wrap `HeaderNav` in `UserContext.Provider` with a
caller-owned `user` and `setUser`. Supply `userMenuLabel`, optional desktop
`actions`, and `userActions` to `HeaderNav`. Supply localized open and close
labels and optional `header`, `navigation`, and `footer` content to
`MenuLayer`. See `examples/dashboards/overview/GlobalHeader/OverviewHeader.tsx`
for a composition using these controls.

Examples import components and patterns directly to avoid pulling in unrelated
code through broad indexes. They are not exported by the library entry point.
The Babel build compiles them under `dist/examples`, while the library webpack
entry does not include them. Reusable components and patterns are exported
through their respective indexes.

## Stories

Keep story definitions in `../stories`; organize their Storybook titles by the
thing they showcase. The overview use-case story is under `Examples`, separate
from the existing dashboard-layout stories under `Patterns`. New example
implementations and fixtures belong here under `src/js`, not alongside the
stories. Older stories and their existing support files are outside this
migration.

The copies originally taken from docs are independent of the docs templates.
This organization introduces no dependency on `apps/docs`. The overview's
surface placeholders and current theme behavior are unchanged; its colors
remain centralized in `examples/dashboards/overview/data.ts`.
