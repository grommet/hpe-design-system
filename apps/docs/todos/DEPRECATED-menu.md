# DEPRECATED — menu

Comparison of `apps/docs/src/pages/components/menu.mdx.bak` (original) against `apps/docs/src/pages/components/menu.mdx` (generated). Items are classified as **Preserved**, **Restructured**, or **Removed**.

---

## Content mapping table

| Original section | Original content (excerpt) | Status | New location (if restructured) | Metadata |
|---|---|---|---|---|
| Top-level `<Example>` | `designer`, `docs`, `figma`, `grommetSource`, `code` props on the hero example | **Preserved** | Identical props present on the hero `<Example componentName="Menu">` in new MDX | Status:Confirmed <br />Name:Julia ML <br />Date: 10 Aug 2026 <br />Notes:none |
| `## Use Cases → Presenting application-level navigation and tasks` | Use-case prose + `<MenuHeaderExample />` | **Restructured** | `## Use cases → Organizing application-level navigation and user tasks` — prose expanded, example re-wrapped with `code` prop | Status:Prose change Not confirmed <br />Name:Julia ML <br />Date: 10 Aug 2026 <br />Notes: this was not actually done, but it's not a problem. ACTION ITEM: Dev to check the 'code' prop |
| `## Use Cases → Grouping batch actions for data sets` | Prose + multi-file `code` array + `<MenuBatchActionsExample />` | **Restructured** | `## Use cases → Presenting batch actions for a data collection` — simplified to single `code` URL; prose rewritten | Status:Prose change Not confirmed<br />Name:Julia ML<br />Date:10 Aug 2026<br />Notes:The prose changes were not identified, but it's not a problem. ACTION ITEM: Dev to check the 'code' prop |
| `## Use Cases → Grouping item-specific actions` | Prose + multi-file `code` array + `<MenuRecordActionsExample />` | **Restructured** | `## Use cases → Providing item-specific actions for individual records` — simplified to single `code` URL; prose rewritten | Status:Prose change Not confirmed<br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes:The prose changes were not identified, but it's not a problem. ACTION ITEM: Dev to check the 'code' prop |
| `## Types` (Default, Icon only, Toolbar) | Plain component renders with no `<Example>` wrappers | **Restructured** | `## Variants` — all three variants now wrapped in `<Example code="...">` components | Status:Confirmed<br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes: |
| `## Organizing menu items` (top-level section) | Ordering/grouping guidance + Common groupings (Configuring/Executing/Transferring) | **Restructured** | Moved to `## Behaviors and states → General behaviors → Organizing menu items` — content preserved verbatim | Status:Confirmed<br />Name:Julia ML<br />Date:12 Aug 2026<br />Notes: |
| `## Dos and Do nots` | Four `<BestPracticeGroup>` pairs | **Preserved** | `## Dos and don'ts` — same four pairs, message text expanded for clarity | Status:Confirmed<br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes: |
| `## Content guidelines` | Two bullet guidelines | **Preserved** | `## Content guidelines` — reworded slightly for style | Status:Confirmed <br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes: |
| `## Accessibility` (prose) | Guidance on icon+text usage; `<AccessibilitySection>` | **Restructured** | Icon+text guidance moved into `## Variants → Icon only` description; new MDX adds explicit Keyboard and ARIA tables; `<AccessibilitySection>` preserved | Status:Confirmed<br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes: |
| `github` prop on batch/record `<Example>` | `github="https://github.com/grommet/..."` | **Removed** | Not present in new MDX; GitHub links were replaced by the `code` raw-URL prop | Status:<br />Name:<br />Date:<br />Notes: |
| `<MenuAnatomy />` | Anatomy diagram component | **Preserved** | Same component import and placement in `## Anatomy` | Status:Confirmed<br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes: |
| Multi-file `code` arrays | `code={[url1, url2, mockDataUrl]}` on two examples | **Removed** | Simplified to single primary example file URL; mock data files no longer linked directly | Status:<br />Name:<br />Date:<br />Notes: |
| `.bak` JSX comments | `{/* Box allows menu to be presented with drop open... */}` | **Removed** | Implementation detail only; no content loss | Status:<br />Name:<br />Date:<br />Notes: |

---

## Notes

- **All substantive content was preserved or intentionally restructured.** No HPE-specific guidance, WCAG criteria, anatomy labels, or do/don't content was lost.

    Status:Confirmed <br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes:

- The "Common groupings" section (Configuring / Executing / Transferring) is fully present in the new MDX under `Behaviors and states → General behaviors → Organizing menu items → Common groupings in HPE applications`.

    Status:Confirmed <br />Name:Julia ML<br />Date:13 Aug 2026<br />Notes:
    
- The `generate-mdx-agent` correctly reconstructed `<BestPracticeGroup>` / `<Example bestPractice>` / `<Box height>` wrappers for all four do/don't pairs.

    Status: <br />Name:<br />Date:<br />Notes:
    
- `<AccessibilitySection title="menu" />` is preserved; the YAML `accessibility.wcagDataFile: menu` correctly points to it.

    Status: <br />Name:<br />Date:<br />Notes:
    
- **Remaining schema gap:** `ComponentDefinition` has no `seoDescription` field. The `seoDescription` in `apps/docs/src/data/structures/components.tsx` (`"Menu contains a list of actions. See some best UX practices ."`) was not updated. See `TODO-menu.md → Other gaps` for follow-up action.

    Status: To be followed on in TODO<br />Name:<br />Date:<br />Notes:
    
