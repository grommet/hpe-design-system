# Package Release

Status: active for release preparation and preflight of the HPE icon packages.
Protected publication automation is not yet implemented.

## Purpose

Coordinate safe, auditable releases of `@hpe-design/icons-grommet` and
`@hpe-design/icons-svg`. This capability is the canonical source for release stages,
validation, evidence, and approval gates. The packages are released independently.

## Entry Points

- `@package-release-orchestrator <package-name> <version>`
- `/release-hpe-icons <package-name> <version>` from `.github/prompts/`

Read the [orchestrator](package-release-orchestrator.agent.md) and
[manifest](manifest.yaml) as the release contract.

## Current Release Contract

- Versioning remains a package-specific `package.json` version update in a reviewed PR;
  do not add Changesets as part of this process.
- The version PR must be approved and merged before a release candidate is prepared.
- CircleCI is the authoritative CI gate. Required check names and successful results must
  be confirmed from the actual PR/commit; this repository does not define those checks.
- Build each selected package and inspect its packed artifact. Current package manifests
  include `dist` and `package.json`; the package root is the packaging context. Do not
  publish from a directory or artifact other than the one verified for that package.
- NPM publication always requires a separate, explicit human approval for every release.
  NPM trusted publishing is authentication, not authorization, and does not remove this
  approval gate.
- GitHub release notes and the Slack announcement remain human-reviewed. Do not post the
  announcement automatically.
- The candidate workflow `.github/workflows/hpe-icons-release-candidate.yml` builds and
  uploads a package artifact after a maintainer confirms the CircleCI run. It does not
  publish. The protected publisher workflow is not implemented yet; stop before tag
  creation, GitHub release publication, or NPM publication until it and its approval
  controls are implemented and verified.

## Stages

1. `intake` — identify one supported package, an explicitly requested target version, and
   the current branch/worktree state.
2. `version-pr` — prepare or review a package.json-only version update; peer approval and
   merge are required before continuing.
3. `preflight` — build and inspect the package artifact; verify package metadata and
   release-tag/version consistency.
4. `ci-gate` — confirm the required CircleCI checks passed for the merged release commit.
5. `release-approval` — present candidate evidence and release notes for human review.
6. `publication-blocked` — stop because the protected icon publisher is not yet
   implemented or required external configuration is unverified.
7. `post-release` — after an authorized publication, verify the GitHub release and NPM
   registry version, then prepare a Slack announcement draft.

## Human Approval Gates

- Peer review and merge of the package version PR.
- Confirmation that all required CircleCI checks passed.
- Review and approval of GitHub release title and notes.
- Explicit NPM publication approval for every release, before the protected publisher is
  dispatched.
- Human review and posting of the Slack announcement.

## Safety Boundaries

- Never create or push tags, merge PRs, publish a GitHub release, or run `npm publish`
  from the Copilot/local workflow.
- Never treat a successful build, a trusted-publisher configuration, or an earlier
  approval as approval for the current NPM publication.
- Stop on a dirty worktree, version mismatch, missing CI evidence, conflicting tag or
  registry version, failed validation, or missing approval.
- Do not infer CircleCI check names or NPM/GitHub trusted-publisher configuration from
  repository files. Record external verification as a blocker.

## Manifest

- `knowledge/capabilities/package-release/manifest.yaml`
