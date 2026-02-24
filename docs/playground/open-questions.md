# Open Questions and Risks

## Resolved

- **How do we model mutually exclusive props in the UI?**
  Resolved 2026-02-24. Use a single Select when props are variants of the same concept (e.g. kind), and enforce exclusions in toggle handlers at interaction time for independent boolean state props (e.g. busy/success/disabled). Full exclusion matrix documented in `exclusiveWith` on each prop, bidirectionally.

- **Should we allow multi-prop presets per component?**
  Resolved 2026-02-24. Yes — captured as `patterns` in the component JSON. Each pattern can set multiple underlying props simultaneously and enforce or hide other props.

## Open questions

- Which source of truth should we prefer when docs and TS types disagree?
- How do we handle composite props (union types with distinct modes) in codegen? Who owns the mode→prop-shape mapping?
- Do suppressed controls reset their state value when the suppression condition activates, or preserve it for when the condition clears?
- Should `collaborationRequired` items block a playground page from being built, or just flag a review step?
- How do we handle props that accept `JSX.Element` (e.g. `icon`, `badge` with custom element) — slot picker, or out of scope for v1 playground?

## Risks

- Cognitive overload if every prop is surfaced — mitigated by `purpose: layout-positional` exclusion and section grouping.
- Incorrect modelling of parent/child relationships — mitigated by `dependsOn` + `dependsOnNote`.
- Confusion between preview-user vs implementor inputs — ongoing, needs review per component.
- Layout prop misuse — `layout-positional` props excluded from playground scope by default.
- Feature creep — `collaborationRequired` flag acts as a gate; don't build before agreeing the shape.
- v1 JSONs not upgraded to v2 schema — risk of building playground pages against incomplete data.
