# Core Knowledge

Reusable data, skills, and shared agents used across capabilities.

## Data Contracts

`data/types.ts` is the authoritative TypeScript contract for component and
pattern knowledge. Consumers, including `packages/knowledge-agent`, import or
re-export these definitions rather than copy them. Source definitions allow
inline or file-backed examples; resolved examples require loaded code.

From the repository root, run `pnpm validate:knowledge-schema` after editing
data or types. It generates schemas directly from the types and validates the
loader-consumed YAML/JSON without creating generated artifacts. Run
`pnpm --filter @hpe-design/knowledge-agent typecheck` to check consumers.
Both checks run in knowledge CI. Live-source authoring does not validate content
automatically. Knowledge-agent builds validate source and resolved snapshot
schemas, and its installed runtime validates the bundled snapshot and content
digest. Generated package-local declarations preserve this canonical contract.

## Component rules

Components may include `rules`, using the same `id`, `statement`, `rationale`,
optional `example`, and `relatedTo` fields as foundation rules. Rules can record
component design decisions, behavior, content, accessibility, and implementation
guidance. Use a stable descriptive ID prefixed with the component ID; IDs must be
unique across component and foundation rules. Write each statement as a
standalone instruction and explain why it exists in the rationale.

Rules may repeat guidance in `usage` or `dosAndDonts`; keep both consistent when
either changes. Verify claims and rationales against appropriate sources:
implementation demonstrates shipped behavior, while approved design guidance
or decisions may explain intent. Flag unsupported rationale for review rather
than inventing it. Use `relatedTo` for relevant knowledge and source links.
See [COMPONENT_EXAMPLE.yaml](data/COMPONENT_EXAMPLE.yaml) and
[foundations](data/foundations/README.md) for examples and reference conventions.
