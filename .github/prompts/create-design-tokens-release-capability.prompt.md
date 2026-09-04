---
description: 'Evaluate or extend the hpe-design-tokens release capability and its approval-gated automation.'
name: 'Evaluate Design Tokens Release Capability'
agent: agent
tools: [read, search, execute]
argument-hint: 'Requested release automation improvement or capability gap.'
---

# Evaluate Design Tokens Release Capability

## Mission

Evaluate a requested improvement to the `hpe-design-tokens` release process and route the work

through the canonical `design-tokens-publishing` capability. Produce an implementation plan or

make a focused change only when the user explicitly requests implementation.

## Scope & Preconditions

- Read `knowledge/capabilities/design-tokens-publishing/README.md`.
- Read `knowledge/capabilities/design-tokens-publishing/manifest.yaml`.
- Read `packages/hpe-design-tokens/docs/OPERATIONS.md`.
- Inspect the current workflows under `.github/workflows/` before proposing changes.
- Treat `.github/prompts/release-design-tokens.prompt.md` as the execution entry point.
- Do not create tags, publish GitHub releases, publish to NPM, or perform production Figma writes.

## Inputs

- Requested improvement: `${input:request:identify the next release automation gap}`.
- Current workspace and selected context: `${file}` and `${selection}` when available.

If the request is ambiguous, report the current capability stage and the smallest missing piece

before asking for clarification. Do not recreate the historical manual workflow from this prompt.

## Workflow

1. Compare the request with the canonical capability stages: intake, preflight,
   approval-required, publication-ready, and post-release.

2. Inspect existing package scripts, Changesets policy, workflows, approval gates, and evidence
   artifacts before recommending a new skill, tool, agent, instruction, or workflow.

3. Identify what is deterministic automation, what requires maintainer approval, and what must
   remain outside Copilot because it uses credentials or production side effects.

4. Prefer extending the canonical capability or its protected GitHub Actions workflows. Avoid
   duplicating release procedure in this prompt.

5. When implementation is requested, make the smallest scoped change and validate it with the
   relevant repository checks.

## Output Expectations

Return:

- Current stage and relevant evidence.
- The gap or requested change.
- Recommended owner: capability, script, workflow, prompt, instruction, or human process.
- Approval and secret boundaries.
- Implementation steps and validation commands.
- Any unresolved repository configuration prerequisites.

For implementation work, report changed files and exact validation results. Never claim a release

is published without GitHub release and NPM registry evidence.

## Quality Assurance

Use these checks when relevant:

```text
pnpm validate:capability-manifests
pnpm validate:knowledge-structure
pnpm --filter hpe-design-tokens release:validate
pnpm exec changeset status
```

Stop on failed checks, missing approvals, dirty release state, conflicting versions, or missing
publication evidence. Do not auto-retry irreversible operations.

## Canonical References

The implemented release design and current runbook live in:

- `knowledge/capabilities/design-tokens-publishing/README.md`
- `packages/hpe-design-tokens/docs/OPERATIONS.md`
- `.github/prompts/release-design-tokens.prompt.md`

Keep this prompt focused on evaluating or extending those sources. Do not copy the release
procedure here; that would create conflicting instructions as the automation evolves.
