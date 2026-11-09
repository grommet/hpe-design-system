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
  be confirmed from the actual PR/commit. Every CircleCI check/job required for the
  release must pass; this repository does not define those checks.
- Build each selected package and inspect its packed artifact. Current package manifests
  include `dist` and `package.json`; the package root is the packaging context. Do not
  publish from a directory or artifact other than the one verified for that package.
- NPM publication always requires a separate, explicit human approval for every release.
  NPM trusted publishing is authentication, not authorization, and does not remove this
  approval gate.
- The planned GitHub Actions publisher should follow the candidate/publisher separation
  used for design tokens. Configure a protected GitHub Environment (for example,
  `npm-production`) with required reviewers and attach the publish job to that environment
  so a human must approve each release before publication.
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

## NPM Trusted Publishing Setup (Pending)

After the protected publisher workflow has a stable filename, configure each NPM package
separately in its NPM package settings:

1. Add a GitHub Actions trusted publisher for organization `grommet`, repository
   `hpe-design-system`, and the exact publisher workflow filename (filename only, not the
   `.github/workflows/` path).
2. Set its GitHub Environment to the exact protected environment used by the publisher,
   recommended as `npm-production`.
3. Give the publisher job only the required `id-token: write` permission and use a
   GitHub-hosted runner with Node.js 22.14+ and npm CLI 11.5.1+.
4. Require an independent reviewer for that GitHub Environment on every run. Do not rely
   on the NPM trusted-publisher relationship itself as the approval mechanism.
5. Test the configuration on a coordinated release attempt. NPM requires a newly created
   trusted-publisher configuration to complete its first successful publish within two
   days; otherwise it expires and must be recreated.
6. After a successful OIDC publish is verified, review NPM's token-access settings and
   revoke unneeded automation tokens. Do not revoke a fallback token before the trusted
   path has been verified.

Use a stable publisher filename, proposed as `hpe-icons-publish.yml`, so the NPM trust
configuration and workflow identity remain aligned. Before configuring either package,
verify that its `package.json` `repository` field matches `grommet/hpe-design-system` as
required by NPM. The current package manifests use package-subdirectory URLs; confirm
whether NPM accepts those or update the metadata in a reviewed change before the first
trusted publish.

Official setup and current requirements: [NPM trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Manifest

- `knowledge/capabilities/package-release/manifest.yaml`
