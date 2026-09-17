# Dependency Upgrade

Automates dependency version management for the HPE Design System monorepo.

## Overview

Dependency upgrades are split into two tracks:

**Track A — Automated CI (patch + minor)**
A weekly GitHub Actions workflow (`.github/workflows/update-dependencies.yml`) scans all catalog entries in `pnpm-workspace.yaml` for patch and minor updates, applies them, and opens a pull request automatically. Grommet-family packages (`grommet`, `grommet-icons`, `grommet-theme-hpe`, `hpe-design-tokens`) are excluded — they are managed by the separate daily workflow.

**Track B — Agent-driven (major versions)**
This capability. Used on-demand to research, apply, verify, and roll back major version upgrades one package at a time. The orchestrator walks through upgrades in risk-tier order so lower-risk packages are addressed before high-impact ones like TypeScript or ESLint.

## Entry Point

Invoke the orchestrator agent directly:

```
@dependency-upgrade-orchestrator
```

With no argument it runs a full scan and presents a triage report. With a package name it targets that specific major upgrade:

```
@dependency-upgrade-orchestrator vite
```

## Agent Roster

| Agent | Role |
|---|---|
| `dependency-upgrade-orchestrator` | Entry point. Runs scan, presents triage, drives the upgrade loop. |
| `scan-outdated` | Runs `pnpm outdated`, reads the catalog, produces a categorized report. |
| `major-upgrade-planner` | Fetches the migration guide for a package, identifies required changes. |
| `major-upgrade-executor` | Applies the version bump and config file changes. |
| `verify-upgrade` | Runs build and tests; applies targeted repairs on failure. |
| `rollback-upgrade` | Reverts all changes made by the executor if verification fails. |

## Key Conventions

- **Catalog-first**: all version changes target `pnpm-workspace.yaml` catalog entries. Only packages with intentional direct pins (e.g. `design-tokens-manager`'s `grommet-theme-hpe ^6`) are updated at the `package.json` level.
- **One at a time**: major upgrades are processed one package at a time to keep failures attributable.
- **Rollback via `git restore`**: run this capability on a clean branch so rollback has a clean baseline.
- See `docs/RISK_TIERS.md` for the upgrade ordering heuristics.

## State File

The orchestrator writes a `dependency-upgrade-state.json` scratch file in this directory to persist progress between sessions. Delete it to start a fresh scan.
