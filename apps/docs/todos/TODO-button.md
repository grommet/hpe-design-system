# TODO — Button

## Inferred fields — verify before merging

The following fields were inferred from component knowledge because the source MDX did not contain
them explicitly. Verify each against the Figma file and grommet source before merging.

### `anatomy`

The anatomy section was inferred from standard Button component structure. The source MDX has no
explicit anatomy diagram or parts list. Verify the following parts against the Figma design:

- **Button container (1)** — confirm rendered element is `<button>` vs `<a>` distinction is clear
- **Button label (1a)** — confirm optional vs required designation
- **Button icon (1b)** — confirm icon placement options (left, right, icon-only)
- **Badge (1c)** — confirm badge overlay position and sizing in Figma
- **Busy / success indicator (1d)** — confirm spinner and success mark appearance in Figma

### `relatedComponents`

The `relatedComponents` list (`anchor`, `menu`, `tabs`) was inferred from MDX cross-references and
standard usage patterns. Verify against the site's "Related Content" data in
`apps/docs/src/data/structures/components.tsx` (currently lists: Anchor, Menu, Tabs).

---

## Placeholder comments in MDX

### `ButtonAnatomy` component — `apps/docs/src/pages/components/button.mdx` line 136

```jsx
{/* TODO: Add ButtonAnatomy component */}
```

The Anatomy section renders an empty block. A `ButtonAnatomy` component needs to be created (or
sourced) and imported. Once the anatomy parts are confirmed (see inferred fields above), this
placeholder should be replaced with the real component.

---

## Notes

- `ActionLabels` example in the MDX is imported from `apps/docs/src/examples/components/layer/`
  (not the button examples directory). Flagged in `DEPRECATED-button.md`. Verify whether this
  example should be moved to the button examples directory or kept as a cross-component reference.
- The `ButtonExample.js` (hero/splash example) is listed in the YAML examples but uses external
  resource URLs (`designer`, `figma`, `grommetSource`) that have no schema field — those links are
  preserved only in the `.bak` file.
