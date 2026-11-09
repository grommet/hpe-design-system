# Package Release

Status: active for release preparation and preflight of the HPE icon packages.
Candidate and publisher workflows are implemented. External GitHub/NPM protections must
be configured and verified before enabling publication.

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
- The GitHub Actions publisher follows the candidate/publisher separation used for design
  tokens. Configure a protected GitHub Environment named `npm-production` with required
  reviewers and attach the publish job to that environment so a human must approve every
  release before NPM publication.
- GitHub release notes and the Slack announcement remain human-reviewed. Do not post the
  announcement automatically.
- The candidate workflow `.github/workflows/hpe-icons-release-candidate.yml` builds and
  uploads a package artifact after a maintainer confirms the CircleCI run. It does not
  publish. The publisher `.github/workflows/hpe-icons-publish.yml` validates that exact
  candidate, creates or reuses a draft GitHub release, then waits for the `npm-production`
  environment approval before publishing the artifact. It verifies the registry tarball
  and leaves the GitHub release in draft for a separate human review and publish action.

## Stages

1. `intake` — identify one supported package, an explicitly requested target version, and
   the current branch/worktree state.
2. `version-pr` — prepare or review a package.json-only version update; peer approval and
   merge are required before continuing.
3. `preflight` — build and inspect the package artifact; verify package metadata and
   release-tag/version consistency.
4. `ci-gate` — confirm the required CircleCI checks passed for the merged release commit.
5. `release-approval` — present candidate evidence and release notes for human review.
6. `publication-blocked` — stop if environment protection, NPM trust, CircleCI evidence, or artifact binding is missing.
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

1. In each NPM package, add a GitHub Actions publisher for `grommet/hpe-design-system`.
   Use filename `hpe-icons-publish.yml`, not the workflow path.
2. Set its GitHub Environment to the exact protected environment used by the publisher,
   recommended as `npm-production`.
3. Use a GitHub-hosted runner, Node.js 22.14+, npm CLI 11.5.1+, and job-scoped `id-token: write`.
4. Allow direct `npm publish` in NPM because the workflow publishes after the GitHub approval gate.
   New NPM publisher configurations default to staged publishing; select deliberately.
   Stage-only access requires changing this workflow to stage and wait for NPM approval.
5. Require independent environment reviewers, prevent self-review, and restrict deploy access.
   NPM trust is authentication, not an approval mechanism.
6. Test the configuration on a coordinated release attempt. NPM requires a newly created
   trusted-publisher configuration to complete its first successful publish within two
   days; otherwise it expires and must be recreated.
7. After a successful OIDC publish is verified, review NPM's token-access settings and
   revoke unneeded automation tokens. Do not revoke a fallback token before the trusted
   path has been verified.

Both package manifests now identify the canonical repository URL and their monorepo
directory. This must remain aligned with the NPM trusted-publisher repository identity.

Official setup and current requirements: [NPM trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Manifest

- `knowledge/capabilities/package-release/manifest.yaml`
