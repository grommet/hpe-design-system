# Progress Log

## 2026-02-23
- Initialized playground reference structure under docs/playground.
- Added schema, templates, and initial component list.
- Completed prop audits for Box, Button, FormField, and TextInput.

## 2026-02-24
- Built first playground page: `/playground/button` (aries-site/src/pages/playground/button.js).
- Implemented Grid/Layer/Grommet layout with scrollable control panel and live code output.
- Identified and fixed CSS Grid `min-height: auto` gotcha — required `style={{ minHeight: 0 }}` on Grid and scroll items.
- Implemented icon-only pattern as a checkbox toggle (not a prop — sets icon, suppresses label, hides reverse).
- Implemented fully bidirectional state exclusion matrix (active, disabled, busy, success).
- Implemented badge with two modes: dot (`badge={true}`) and counter (`badge={{ value, max }}`).
- Implemented tip with content + dropProps position control.
- Created reusable `PlaygroundLayout.js` template component for future pages.
- Promoted button.json to schema v2: added suppressedWhen, modes, patterns, collaborationRequired, collaborationPolicy, fixed exclusiveWith matrix, fixed kind uiControl.
- Updated decisions.md, patterns.md, open-questions.md to reflect all new schema concepts and resolved questions.
