# DEPRECATED — menu

Comparison of `apps/docs/src/pages/components/menu.mdx.bak` (original) against `apps/docs/src/pages/components/menu.mdx` (generated). Items are classified as **Preserved**, **Restructured**, or **Removed**.

---

## Content mapping table

| Original section | Original content (excerpt) | Status | New location (if restructured) |
|---|---|---|---|
| Top-level `<Example>` | `designer`, `docs`, `figma`, `grommetSource`, `code` props on the hero example | **Preserved** | Identical props present on the hero `<Example componentName="Menu">` in new MDX |
| `## Use Cases → Presenting application-level navigation and tasks` | Use-case prose + `<MenuHeaderExample />` | **Restructured** | `## Use cases → Organizing application-level navigation and user tasks` — prose expanded, example re-wrapped with `code` prop |
| `## Use Cases → Grouping batch actions for data sets` | Prose + multi-file `code` array + `<MenuBatchActionsExample />` | **Restructured** | `## Use cases → Presenting batch actions for a data collection` — simplified to single `code` URL; prose rewritten |
| `## Use Cases → Grouping item-specific actions` | Prose + multi-file `code` array + `<MenuRecordActionsExample />` | **Restructured** | `## Use cases → Providing item-specific actions for individual records` — simplified to single `code` URL; prose rewritten |
| `## Types` (Default, Icon only, Toolbar) | Plain component renders with no `<Example>` wrappers | **Restructured** | `## Variants` — all three variants now wrapped in `<Example code="...">` components |
| `## Organizing menu items` (top-level section) | Ordering/grouping guidance + Common groupings (Configuring/Executing/Transferring) | **Restructured** | Moved to `## Behaviors and states → General behaviors → Organizing menu items` — content preserved verbatim |
| `## Dos and Do nots` | Four `<BestPracticeGroup>` pairs | **Preserved** | `## Dos and don'ts` — same four pairs, message text expanded for clarity |
| `## Content guidelines` | Two bullet guidelines | **Preserved** | `## Content guidelines` — reworded slightly for style |
| `## Accessibility` (prose) | Guidance on icon+text usage; `<AccessibilitySection>` | **Restructured** | Icon+text guidance moved into `## Variants → Icon only` description; new MDX adds explicit Keyboard and ARIA tables; `<AccessibilitySection>` preserved |
| `github` prop on batch/record `<Example>` | `github="https://github.com/grommet/..."` | **Removed** | Not present in new MDX; GitHub links were replaced by the `code` raw-URL prop |
| `<MenuAnatomy />` | Anatomy diagram component | **Preserved** | Same component import and placement in `## Anatomy` |
| Multi-file `code` arrays | `code={[url1, url2, mockDataUrl]}` on two examples | **Removed** | Simplified to single primary example file URL; mock data files no longer linked directly |
| `.bak` JSX comments | `{/* Box allows menu to be presented with drop open... */}` | **Removed** | Implementation detail only; no content loss |

---

## Notes

- **All substantive content was preserved or intentionally restructured.** No HPE-specific guidance, WCAG criteria, anatomy labels, or do/don't content was lost.
- The "Common groupings" section (Configuring / Executing / Transferring) is fully present in the new MDX under `Behaviors and states → General behaviors → Organizing menu items → Common groupings in HPE applications`.
- The `generate-mdx-agent` correctly reconstructed `<BestPracticeGroup>` / `<Example bestPractice>` / `<Box height>` wrappers for all four do/don't pairs.
- `<AccessibilitySection title="menu" />` is preserved; the YAML `accessibility.wcagDataFile: menu` correctly points to it.
- **Remaining schema gap:** `ComponentDefinition` has no `seoDescription` field. The `seoDescription` in `apps/docs/src/data/structures/components.tsx` (`"Menu contains a list of actions. See some best UX practices ."`) was not updated. See `TODO-menu.md → Other gaps` for follow-up action.
