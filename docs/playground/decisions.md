# Decisions Log

Use this file to record decisions that affect scope, data shape, or architecture.

## Template
- Date:
- Decision:
- Rationale:
- Impact:
- Follow-ups:

## Entries

- **2026-02-23**: Created the playground reference structure under docs/playground for self-documenting progress.
  - Rationale: Keep scope, audits, and patterns in one place.
  - Impact: All future updates should be linked here.
  - Follow-ups: Define schema and first component audit.

- **2026-02-24**: Promoted component JSON schema to v2.
  - Decision: Added `suppressedWhen`, `modes`, `dependsOnNote`, `playgroundNote`, `collaborationRequired`, top-level `patterns`, and `collaborationPolicy` fields. Bumped `schemaVersion` to 2.
  - Rationale: Building the Button playground revealed that a flat prop list is insufficient. Props can be suppressed by other prop values, union types require distinct UI modes, usage combinations exist that have no prop representation, and some API shapes cannot map to a UI without a human decision.
  - Impact: All 18 existing component JSONs are schemaVersion 1 by default. Button.json is the first v2. Others should be upgraded as their playground pages are built.
  - Follow-ups: Apply v2 fields to remaining component JSONs during playground build phase.

- **2026-02-24**: Unified `primary`, `secondary`, `kind="toolbar"` into a single `kind` Select in the playground UI.
  - Decision: The three appearance variants are exposed as one Select control (Default / Primary / Secondary / Toolbar) rather than three separate toggles.
  - Rationale: The underlying API is inconsistent — `primary` and `secondary` are booleans, `toolbar` uses `kind="toolbar"`. Surfacing all three as independent toggles would allow invalid combinations. A Select enforces mutual exclusivity and hides the API inconsistency from the user.
  - Impact: Codegen must map the Select value back to the correct prop shape: `primary` → `primary`, `secondary` → `secondary`, `toolbar` → `kind="toolbar"`.
  - Follow-ups: Flag `collaborationRequired: true` on all props that have this API shape mismatch in other components.

- **2026-02-24**: Established `exclusiveWith` as a fully bidirectional matrix.
  - Decision: If prop A lists prop B in `exclusiveWith`, prop B must also list prop A. Both sides must be kept in sync.
  - Rationale: During the button build, `disabled` only listed `active` but not `busy` or `success`. This caused the playground toggle logic to be incomplete — turning on `disabled` didn't clear `busy`. The bidirectional rule prevents silent half-exclusions.
  - Impact: All future audits must verify that exclusion relationships are symmetric.
  - Follow-ups: Audit existing v1 JSONs for asymmetric exclusions when upgrading to v2.

- **2026-02-24**: Adopted `collaborationRequired` flag for props and patterns where the playground UI cannot be derived from schema alone.
  - Decision: Any prop or pattern where the control shape, codegen mapping, or interaction rules cannot be mechanically determined from the JSON is marked `collaborationRequired: true` with a `collaborationNote` or `playgroundNote` explaining what needs agreement.
  - Rationale: Some decisions (e.g. how to render a union-type prop, how to unify inconsistent API shapes) require a human call. Marking them explicitly prevents silent wrong assumptions during build.
  - Impact: Before building a playground page, scan for `collaborationRequired: true` entries and resolve them first.
  - Follow-ups: None — this is a permanent policy, captured in `collaborationPolicy` field of each JSON.
