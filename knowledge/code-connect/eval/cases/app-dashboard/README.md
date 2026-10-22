# App Dashboard

## Fixture

- Figma node: [Example frame](https://www.figma.com/design/4iURKcNplsUigS8LcGtVH0/HPE-Design-to-Code-Evaluation?node-id=1-978).
- Source: HPE Design-to-Code Evaluation, Example frame (`1:978`); the source artifact is a GreenLake dashboard and serves as one concrete case in the source-agnostic evaluation protocol.
- Access check: Figma metadata and screenshot retrieval succeeded on 2026-10-13.
- Native frame: 1536 × 2203 px.
- Full-page reference: [PNG](assets/hpe-design-to-code-evaluation-reference.png).
- Button smoke target: [Launch Button instance (`1:1188`)](https://www.figma.com/design/4iURKcNplsUigS8LcGtVH0/HPE-Design-to-Code-Evaluation?node-id=1-1188); [PNG](assets/button-smoke-reference.png), 95 × 36 px.

## Expected Page

Recreate the visible page hierarchy and content in the frame, not the Figma editor chrome:

- Global header with GreenLake brand, workspace selector, search, and utility actions; page title `Home` and `Customize` action.
- Two service-entry cards: `Find services` and `Manage workspace`.
- Billing, Device, and Sustainability overview cards, including their visible metrics, warning, meter/legend, and trend charts.
- Right rail with Quick actions, Recommended for you, and Learn links.
- Recent services section with five rows and Launch actions.
- Users meter and warning, Notifications status tiles and five recent items, Monthly charges chart, and three Expiring subscriptions.

Match text, hierarchy, relative placement, spacing, and visual treatment to the reference. Do not add sections or substitute unrelated content. At narrower widths, reflow without dropping content.

## Expected Components And Imports

- The frame contains 91 Figma component instances. The frame-level Code Connect map returns 22 template-backed targets: 21 `Button` and 1 `Menu`, including targets nested inside the Global Header. These 22 node records are the mapped-coverage denominator. Fourteen Buttons appear as direct instances in the page tree; the remaining Button targets are nested in the header.
- Expected mapped imports: `Button` from `grommet`, following [the Button Code Connect mapping](../../../src/controls/Button.figma.jsx), and `Menu` from `grommet`, following [the Menu Code Connect mapping](../../../src/controls/Menu.figma.jsx). Score each mapped node against its connected snippet and visible intent; repeated controls count separately.
- Supported composition APIs available in the sandbox include `Box`, `Grid`, `Heading`, `Text`, `Card`, `List`, `Meter`, `Notification`, `DataChart`, `Anchor`, and `Button` from `grommet`. Use only the APIs appropriate to the visible regions; this is not a requirement to import every item.
- Use `@hpe-design/icons-grommet` for matching HPE icons when needed. The sandbox's existing app/theme setup supplies HPE theming; do not add a new dependency or recreate theme setup in the page component.
- Allowed package imports are the dependencies already declared by `sandbox/grommet-app`, especially `react`, `grommet`, `grommet-icons`, `@hpe-design/icons-grommet`, and `hpe-design-tokens`. Existing local sandbox components may be reused if their imports resolve from the output path. No new packages, remote assets, or generated Figma screenshot as an implementation asset.

## Mapping And Unmapped Areas

The repository has Button and Menu mappings for this fixture. The frame-level Figma MCP response also returns 56 legacy Code Connect records without a named component template; their sources point to a separate StoreOnce project. Report these records as external/unusable source mappings, do not treat them as repository mappings, and do not count them toward coverage.

Unmapped work includes the Page Header, header structure beyond its mapped Button and Menu targets, headings, icon wrappers, Date and Time instances, Inline Notifications, Meter circle/bar instances, legend groups, service and dashboard card compositions, right-rail lists, status tiles, recent-service rows, and the custom chart/graph regions. In particular, Figma layers named `Card` in this frame are frames, not connected Card instances. These areas remain part of visual-fidelity review but are not Code Connect coverage opportunities for this case.

When applying this protocol to a different source URL, create a new case with the same evidence fields and identify that source's mapped and unmapped areas independently.