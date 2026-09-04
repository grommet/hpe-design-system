---
description: 'Prepare and verify an approval-gated hpe-design-tokens release.'
name: 'Release Design Tokens'
agent: agent
tools: [read, search, execute]
argument-hint: 'Version or release request, for example: prepare 2.3.0'
---

# Release Design Tokens

## Mission

Launch the repository-owned `design-tokens-publishing` capability for an `hpe-design-tokens`
release. Prepare evidence and coordinate approvals without publishing credentials.

## Scope & Preconditions

- Target package: `hpe-design-tokens`.
- Release request: `${input:releaseRequest:prepare the next release}`.
- Read `knowledge/capabilities/design-tokens-publishing/README.md` and
  `knowledge/capabilities/design-tokens-publishing/manifest.yaml` before acting.
- Do not create tags, publish GitHub releases, publish to NPM, or perform production Figma
  writes from this prompt.

## Inputs

Use the release request above and the current workspace state. If the user supplied a version,
validate it against the package manifest and release evidence. If no version is supplied,
inspect pending changesets and report that a version proposal is required.

## Workflow

1. Route to the canonical orchestrator in
   `knowledge/capabilities/design-tokens-publishing/design-tokens-publishing-orchestrator.agent.md`.
2. Detect the current release stage and report blockers before editing files.
3. Run only the preflight checks required for the requested stage.
4. Present separate approval requests for version/changelog review, GitHub release publication,
   and NPM publication. Do not combine them.
5. For approved publication, provide the protected GitHub Actions workflow with the exact
   version, commit SHA, artifact, and evidence inputs. Do not execute credential-bearing steps.
6. After publication evidence exists, verify registry and release state and draft, but do not
   post, the Slack announcement.

## Output Expectations

Report one of `proposal`, `preflight`, `approval-required`, `publication-ready`, or
`post-release`. Include package/version, commit SHA, checks run, evidence paths or URLs,
approval still required, and recovery action for any blocker.

Do not claim that a release is published or verified without GitHub and NPM evidence.

## Quality Assurance

When appropriate, use these repository checks:

```text
pnpm exec changeset status
pnpm --filter hpe-design-tokens test
pnpm --filter hpe-design-tokens test:contracts
pnpm --filter hpe-design-tokens run test:parity
pnpm --filter hpe-design-tokens build
pnpm validate:capability-manifests
pnpm validate:knowledge-structure
```

Stop on failed checks, dirty release state, conflicting versions, missing approvals, or missing
publication evidence. Do not auto-retry irreversible operations.