# Figma Sync Contracts Index

This directory contains the stable, machine-integration-facing contracts for Figma sync behavior.

## Documents

- `figma-sync-cli-contract.md`
  - Defines command surface, flag semantics, CI policy, and expected machine-readable output events.
  - Use this when wiring automation and CI workflows.

- `figma-sync-failure-codes.md`
  - Defines canonical error codes and required error payload fields.
  - Use this when building failure handling, dashboards, or alerting.

- `figma-sync-rollout-runbook.md`
  - Operational rollout and rollback runbook for environment-isolated sync.
  - Use this for pilot validation, rollback drills, and status checks.

- `figma-test-env-setup-test-plan.md`
  - Formal QA test plan (TP-FIGMA-ENV-SETUP-001) for setting up a new test Figma environment end-to-end.
  - Use this when onboarding a new test environment for the first time or re-validating an existing one.

- `schemas/`
  - JSON schemas for machine-readable sync payloads.
  - Use these for validation in tests and CI.

- `generated/`
  - Generated run artifacts and evidence logs.
  - Do not treat generated files as source contracts.

## Source Of Truth

For package-level setup and operational usage, see:

- `../README.md`
- `../docs/FIGMA_ENVIRONMENT_SYNC_PLAN.md`
