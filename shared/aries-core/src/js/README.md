# Aries Core source organization

## Reusable components

New React components and examples use TypeScript (`.tsx`); data, context, and
barrel modules without JSX use `.ts`. Do not keep JavaScript duplicates.

Use the existing `components` categories rather than creating a parallel
Storybook component tree:

- `components/helpers/Dashboard/`: chart cards, card headers, metric tiles,
  metric groups, metric values, status counts, and service cards.
- `components/helpers/GlobalHeader/`: reusable global header composition and
  user context. Its `GlobalHeaderIdentity` is the context-aware header identity;
  the existing standalone `components/helpers/AppIdentity/` remains unchanged.
- `components/layouts/AppContainer/`: the shared application layout wrapper.
- `components/typography/`: existing typography such as `TextEmphasis`.

Reusable helpers and layouts are exported through their category indexes.
Keep fixture data and page-specific content out of these component folders.

## Examples and data

- `examples/dashboards/overview/`: the overview dashboard composition, its
  sections, health presentation helpers, and dashboard-specific sample data.
  It uses the latest parent PR's `MetricTile` and `HealthOverview`, replacing
  the older aligned-tile and mixed-actions variants.
- `examples/data/`: fixtures shared across examples, such as the default user.

Examples import their components directly to avoid pulling in unrelated
components through broad indexes. They are not exported by the library entry
point. The Babel build compiles them under `dist/examples`, while the library
webpack entry does not include them. Reusable components are available through
the existing component exports.

## Stories

Keep story definitions in `../stories`. The dashboard story imports both the
overview component and its raw source from `examples/dashboards/overview`.
New example implementations and fixtures belong here under `src/js`, not
alongside the stories. Older stories and their existing support files are
outside this migration.

The copies originally taken from docs are independent of the docs templates.
This organization introduces no dependency on `apps/docs`. The overview's
surface placeholders and current theme behavior are unchanged; its colors
remain centralized in `examples/dashboards/overview/data.js`.
