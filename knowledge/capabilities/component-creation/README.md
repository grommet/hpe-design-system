# component-creation

Status: active
Entry point: `@component-creation-orchestrator <component-name>`

## What this capability does

A sequential AI agent pipeline for writing complete, validated HPE Design
System component specs from scratch.

## Pipeline

```
Step 1 — spec-writer       → tokens.md, anatomy.md, constraints.md, gaps.md
Step 2 — props-writer      → props.md
Step 3 — spec-reviewer     → appends to gaps.md
Step 4 — mapping-writer    → mappings/{{platform}}.md, appends to gaps.md
Step 5 — mapping-reviewer  → appends to gaps.md
```

## Output structure

```
component-specs/{{component-name}}/
├── tokens.md
├── anatomy.md
├── constraints.md
├── props.md
├── gaps.md
└── mappings/
    ├── radix.md
    └── (future platforms)
```

See `prompts/README.md` for full instructions.
