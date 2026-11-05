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
Both checks run in knowledge CI. Runtime loading is unchanged and does not
validate content automatically.
