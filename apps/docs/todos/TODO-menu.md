# TODO: Menu

## Missing coded examples

None identified. All use case and variant examples are implemented:
`MenuExample`, `MenuHeaderExample`, `MenuBatchActionsExample`, `MenuRecordActionsExample`, `MenuDefaultExample`, `MenuIconExample`, `MenuToolbarExample`, `MenuDisabledExample`.

## Missing do/don't previews

None identified. All four `<BestPracticeGroup>` pairs have rendered example components: `MenuSelectValueExample`, `MenuGroupingExample`, `MenuDangerousExample`, `MenuItemCountExample`.

## Missing props documentation

The `props` array in `knowledge/core/data/components/menu.yaml` was inferred rather than extracted from an explicit props table (the MDX links out to Grommet docs). The following Grommet Menu props are absent from the YAML and should be verified and added if applicable:

- `open` — controls whether the drop is open (controlled usage)
- `onOpen` — callback fired when the drop opens
- `onClose` — callback fired when the drop closes
- `dropProps` — pass-through props for the Drop container (e.g. `stretch`, `elevation`)
- `plain` — removes default button styling when `true`
- `gap` — spacing between icon and label on the trigger button
- `dropBackground` — background color/style of the drop container
- `dropTarget` — DOM node the drop should align to instead of the trigger
- `alignSelf`, `gridArea`, `margin` — standard Box layout props available on the trigger

**Reference:** [Grommet Menu source](https://github.com/grommet/grommet/blob/master/src/js/components/Menu/Menu.js) and [live Grommet docs](https://v2.grommet.io/menu?theme=hpe#props).

## Missing behaviors or states

None identified. Interactive states (rest, hover, focus, active) and application state (disabled) are all captured in `knowledge/core/data/components/menu.yaml` and documented in the new MDX.

## Missing visual assets

None identified. `MenuAnatomy.js` exists at `apps/docs/src/examples/components/menu/MenuAnatomy.js` and is imported and rendered in the Anatomy section.

## Other gaps

1. **Props verification (action required before merge):** Cross-check the full `props` array in `knowledge/core/data/components/menu.yaml` against the Grommet source and live docs. Add any missing props listed above; remove any that are incorrect.

2. **SEO description not updated:** The `seoDescription` field in `apps/docs/src/data/structures/components.tsx` for Menu was not updated as part of this refactor. Consider deriving a better SEO description from the finalized `description` value in the YAML.
