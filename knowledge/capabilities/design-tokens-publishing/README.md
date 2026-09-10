# design-tokens-publishing

Status: active

### One-time npm trusted publishing configuration

- Configure npm trusted publishing for package `hpe-design-tokens` with repository `grommet/hpe-design-system`, workflow `.github/workflows/design-tokens-publish.yml`, and default branch `master`; configure any required npm environment.
- After migration, no NPM token is required. A stage-only token is incompatible with this direct `npm publish` workflow.

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

It does not receive or manage NPM, GitHub, or Figma secrets. Candidate creation and publication
are separate workflow runs. Publication requires a maintainer to review the candidate evidence
and manually dispatch the publisher from the default branch.

## Release Stages

1. `intake` - identify the target package, version, commit, channel, and current state.
2. `preflight` - inspect changesets, metadata, generated artifacts, and required checks.
3. `approval-required` - present version, changelog, and test evidence for review.
4. `publication-ready` - confirm the approved immutable artifact and protected workflow inputs.
5. `post-release` - verify GitHub and NPM state and prepare the announcement draft.

The orchestrator must stop when evidence is missing or an approval gate has not been granted.
It must distinguish a proposal, a draft release, a published release, and a verified release.

Changeset status is a pre-version-PR check. After the release PR runs `changeset version`, the
consumed Changesets are expected to be absent; candidate validation must instead verify the
generated package version and changelog heading.

## Two-Stage Publication Workflow

Run `.github/workflows/design-tokens-release.yml` manually with an approved ref and exact
version to create a candidate. Record its workflow run ID and resolved commit SHA. After a
second maintainer reviews the candidate artifact and stable-sync result, manually dispatch
`.github/workflows/design-tokens-publish.yml` from the default branch.

The publisher requires the candidate run ID, exact version, and exact commit SHA. It verifies
the candidate run and artifact before using npm trusted publishing via GitHub OIDC. It then
publishes the exact tarball with the `latest` tag and provenance, creates or reuses a draft
GitHub release, verifies the NPM registry and a clean consumer install, and publishes the
GitHub release last. It uploads release notes and a Slack-ready announcement draft as workflow
evidence. Configure trusted NPM publishing with GitHub OIDC as a future migration when the
package and organization settings support it.

## Evidence

Every completed stage should report the evidence available at that point:

- Package name, version, release channel, and commit SHA.
- Changeset status and changelog diff or source.
- Build, unit, contract, parity, import/export, and package-content results.
- Stable-branch SHA and Figma synchronization result, when applicable.
- GitHub tag/release URL and NPM registry version/tarball URL.
- Slack announcement draft and editorial status.

The protected publication workflow also writes these values to the GitHub Actions job summary
so a maintainer can review the release evidence without reconstructing it from individual logs.

## Related Operations

- Package commands and Figma safety rules: [docs/OPERATIONS.md](../../../packages/hpe-design-tokens/docs/OPERATIONS.md)
- Canonical orchestrator: [design-tokens-publishing-orchestrator.agent.md](design-tokens-publishing-orchestrator.agent.md)
- Manifest: [manifest.yaml](manifest.yaml)

## Manifest

- `knowledge/capabilities/design-tokens-publishing/manifest.yaml`
