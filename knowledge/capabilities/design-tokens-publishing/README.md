# design-tokens-publishing

Status: active

## Purpose

Prepare and verify an `hpe-design-tokens` release, coordinate the protected GitHub and NPM
publication steps, and retain an auditable record of release evidence.

## Entry Point

- `@design-tokens-publishing-orchestrator <release-request>`
- `/release-design-tokens <version-or-release-request>` from `.github/prompts/`

## Scope

The capability covers release intake, version and changelog review, package preflight,
artifact verification, GitHub release coordination, NPM registry verification, and a
Slack-ready announcement draft.

It does not receive or manage NPM, GitHub, or Figma secrets. Publication must run through a
protected GitHub Actions environment. In the initial implementation, GitHub release
publication and NPM publication require explicit maintainer approval.

## Release Stages

1. `intake` - identify the target package, version, commit, channel, and current state.
2. `preflight` - inspect changesets, metadata, generated artifacts, and required checks.
3. `approval-required` - present version, changelog, and test evidence for review.
4. `publication-ready` - confirm the approved immutable artifact and protected workflow inputs.
5. `post-release` - verify GitHub and NPM state and prepare the announcement draft.

The orchestrator must stop when evidence is missing or an approval gate has not been granted.
It must distinguish a proposal, a draft release, a published release, and a verified release.

## Evidence

Every completed stage should report the evidence available at that point:

- Package name, version, release channel, and commit SHA.
- Changeset status and changelog diff or source.
- Build, unit, contract, parity, import/export, and package-content results.
- Stable-branch SHA and Figma synchronization result, when applicable.
- GitHub tag/release URL and NPM registry version/tarball URL.
- Slack announcement draft and editorial status.

## Related Operations

- Package commands and Figma safety rules: [docs/OPERATIONS.md](../../../packages/hpe-design-tokens/docs/OPERATIONS.md)
- Canonical orchestrator: [design-tokens-publishing-orchestrator.agent.md](design-tokens-publishing-orchestrator.agent.md)
- Manifest: [manifest.yaml](manifest.yaml)

## Manifest

- `knowledge/capabilities/design-tokens-publishing/manifest.yaml`
