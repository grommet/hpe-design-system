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

### Undocumented Button prop passthrough (`MenuExtendedProps`)

The `props` array in `knowledge/core/data/components/menu.yaml` documents only the `MenuProps`
members. Grommet's authoritative type is actually `MenuExtendedProps`:

```ts
export interface MenuExtendedProps
  extends MenuProps, Omit<ButtonType, 'icon' | 'size' | 'children'> {}
```

So Menu already accepts the full Button prop surface (minus `icon`, `size`, `children`) on its
trigger — `primary`, `secondary`, `kind`, `color`, `plain`, `reverse`, `badge`, `busy`, `pad`,
`gap`, `type`, `as`, etc. These flow through `...rest` onto the trigger `DropButton` in `Menu.js`.
This passthrough is currently undocumented in the YAML. Per
`knowledge/core/skills/derive-prop-types.skill.md`, the extension is part of the resolved type
and is a documentation gap — not something to hand-author. Decide as a group whether to enumerate
these props in the Menu doc or document the passthrough as a single note, then regenerate from the
type rather than authoring entries manually.

**Related PR discussion — explicit `buttonProps` (AGREED):** The dev group agreed to document
support for a top-level `buttonProps` Menu prop (a sibling of `label`, `icon`, etc.) for forwarding
configuration to the trigger button. It has been added to `knowledge/core/data/components/menu.yaml`
typed as `ButtonExtendedProps`.

**Action required — grommet type sync:** `buttonProps` does **not** yet exist in grommet's
`MenuProps` / `MenuExtendedProps` (it is currently only an internal local variable in `Menu.js`).
Because props are derived strictly from the grommet TypeScript definition
(`knowledge/core/skills/derive-prop-types.skill.md`), this YAML entry is a manual,
ahead-of-type addition and will be dropped the next time `extract-yaml-agent` runs unless grommet's
`MenuProps` is updated to declare `buttonProps`. Open the corresponding grommet change to add
`buttonProps` to the type and propTypes, then this entry becomes derivable. Remaining design
details to confirm in that change: precedence vs. the existing flat `Omit<ButtonType>` passthrough;
preventing override of Menu-owned props (`a11yTitle`, `aria-haspopup`, `aria-expanded`, `disabled`,
`open`, `dropAlign`); whether to `Omit` `icon | size | children`; and whether scope is the trigger
button only or also the control-mirror / per-item buttons.

## Missing behaviors or states

None identified. Interactive states (rest, hover, focus, active) and application state (disabled) are all captured in `knowledge/core/data/components/menu.yaml` and documented in the new MDX.

## Missing visual assets

None identified. `MenuAnatomy.js` exists at `apps/docs/src/examples/components/menu/MenuAnatomy.js` and is imported and rendered in the Anatomy section.

## Other gaps

1. **Props verification (action required before merge):** Cross-check the full `props` array in `knowledge/core/data/components/menu.yaml` against the Grommet source and live docs. Add any missing props listed above; remove any that are incorrect.

2. **SEO description not updated:** The `seoDescription` field in `apps/docs/src/data/structures/components.tsx` for Menu was not updated as part of this refactor. Consider deriving a better SEO description from the finalized `description` value in the YAML.
