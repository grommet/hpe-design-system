---
name: docs-refactor-execution
description: Runbook for executing the docs-refactor capability workflow per component.
inputs:
  - Component name
  - Current git branch
  - GitHub Copilot Chat with agent mode
outputs:
  - Completed component documentation
  - Updated plan checklist
version: 1.0.0
---

# Component Docs Refactor: Execution Runbook

This skill describes how to execute the docs-refactor capability workflow for a single component end-to-end.

## Prerequisites

1. GitHub Copilot Chat installed and active in VS Code with agent mode enabled.
2. Read the project plan: `knowledge/capabilities/docs-refactor/plan.md`
3. Identify your assigned component from the Full Component Checklist.

## The Agent Pipeline

The docs-refactor workflow is driven by an orchestrator (`docs-refactor-orchestrator`) that manages eight specialized agents in sequence:

```
[1] extract-yaml-agent
         ↓
[2] generate-mdx-agent
         ↓
[3] generate-examples-agent  +  [4] dos-donts-agent   ← parallel
         ↓
[5] create-todos-agent
         ↓
[6] review-copy-agent
         ↓
[7] verify-render-agent
         ↓
[8] update-checklist-agent
```

**Shortcut**: Run `@docs-refactor-orchestrator` with no argument to see the status of all components in a single report.

## Step-by-Step Execution

For this example, we use `button` as the component name. Replace with your assigned component.

### Step 1: Create a feature branch

```bash
git checkout project-sanderson
git pull
git checkout -b project-sanderson-refactor-button
```

Maintain **1 pull request per component** to keep scope manageable.

### Step 2: Invoke the orchestrator

Open the component docs folder in VS Code and run:

```
@docs-refactor-orchestrator button
```

The orchestrator will:
1. Scan the filesystem to detect the current pipeline stage for your component.
2. Present a status report showing what files exist and any blockers.
3. List the agents it will delegate to and ask for your confirmation before starting.
4. Run agents in sequence: `extract-yaml-agent` → `generate-mdx-agent` → `generate-examples-agent` / `dos-donts-agent` → `create-todos-agent` → `review-copy-agent` → `verify-render-agent` → `update-checklist-agent`.
5. Pause before `create-todos-agent` deletes the `.mdx.bak` file (backup of old MDX) — this is your last chance to inspect the old version.
6. After copy review, run a docs build check automatically and update the checklist.
7. Remind you to address any must-fix copy-review items.

**Resume capability**: If interrupted, run the same command again — the orchestrator will detect the current stage and pick up from where it left off.

### Step 3: Spot-check locally

Even though the orchestrator runs `verify-render-agent`, you should verify locally by building the docs app:

```bash
cd apps/docs
pnpm start
```

Open the component page in your browser and check for errors in the console, especially:
- `cloneElement` / `undefined children` errors (most common crash pattern)
- Missing imports or component references

### Step 4: Commit and open PR

1. Commit the new YAML, updated MDX, new example files, and TODO/DEPRECATED files.
2. Title the PR: `docs: refactor [Component] component`
3. Confirm the component has been checked off in the plan file by verifying `update-checklist-agent` added an `[x]` entry.

## Key Files

- `knowledge/capabilities/docs-refactor/` — All capability assets (agents, plan, execution instructions)
- `knowledge/core/skills/` — Shared reusable methodologies (extraction, generation, quality review, etc.)
- `knowledge/core/data/types.ts` — Schema contract for YAML definitions
- `apps/docs/COMPONENT_TEMPLATE.md` — MDX page structure and wiring template
- `knowledge/core/skills/writing-style.skill.md` — Writing standards and voice guide

## Troubleshooting

If the orchestrator stalls or an agent fails:
1. Check `execution.skill.md` (this file) for the next manual step.
2. Review the agent's error output for specific issues.
3. Consult the plan file for component-level status and any blockers.
4. If completely stuck, use `@docs-refactor-orchestrator button` to resume from the detected stage.

## Ownership

- **You** (documentation engineer): Curate source MDX, validate/edit YAML, finalize generated MDX, document gaps and legacy content.
- **Copilot agents** (workflow): Extract, generate, enrich, review copy, and verify rendering.
- **Standards maintainers**: Govern schema and writing rules.
- **Component reviewers**: Audit quality and completeness of YAML and MDX outputs.
