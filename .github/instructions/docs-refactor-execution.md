# Component Docs Refactor: Executing the Plan

Welcome to the component documentation refactor project! The goal of this effort is to establish a rigorous, machine-readable YAML "source of truth" for every component while simultaneously standardizing our user-facing MDX pages.

This guide describes the full pipeline and the agents that power each step. The **`docs-refactor-orchestrator`** agent is the single entry point — it detects the current pipeline stage for your component, walks you through approval gates, and drives the pipeline to completion by delegating to each agent automatically.

## Prerequisites

1. Ensure you have **GitHub Copilot Chat** installed and active in VS Code with agent mode enabled.
2. Read the project plan: `.github/docs-refactor-plan.md`
3. Identify which component you are assigned to refactor (check the "Full Component Checklist" at the bottom of the plan file).

## The Agent Pipeline

Each step in the per-component refactor is owned by a dedicated Copilot agent. Agents are located in `.github/agents/`. Run them in the order below. Steps 3 and 4 can run in parallel.

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
```

Run `@docs-refactor-orchestrator` with no argument at any point to see the status of every component in a single table.

---

## Step-by-Step Execution Guide

For this guide, we use `button` as an example. Replace `button` with your assigned component.

### Step 1: Branch out

Create a new branch for your component. The base integration branch is `project-sanderson`. Limit scope to **1 pull request per component**.

```bash
git checkout project-sanderson
git pull
git checkout -b project-sanderson-refactor-button
```

### Step 2: Run the orchestrator

With your branch ready, invoke the orchestrator:

> `@docs-refactor-orchestrator button`

The orchestrator will:
1. Scan the filesystem to detect the current pipeline stage for `button`.
2. Present a status report showing which files exist and any blockers.
3. List the agents it will invoke and ask for your confirmation before starting.
4. Run each agent in sequence — `extract-yaml-agent` → `generate-mdx-agent` → `generate-examples-agent` / `dos-donts-agent` → `create-todos-agent` → `review-copy-agent` — pausing for a second confirmation before `create-todos-agent` deletes the `.mdx.bak`.
5. After the copy review, remind you to address any must-fix items.

If the orchestrator was interrupted or you need to resume mid-pipeline, run the same command again — it will pick up from the current stage.

### Step 3: Verify locally

Build and run the `docs` app to confirm the new page renders without errors:

```bash
cd apps/docs
pnpm start
```

Open the component page in the browser and check the console for errors — especially `cloneElement`/`undefined children` errors, which are the most common crash pattern.

### Step 4: Push and PR

1. Commit your new YAML file, the updated MDX file, any new example files, and the TODO/DEPRECATED files.
2. Title the PR `docs: refactor [Component] component`.
3. **Check off your component** in the Full Component Checklist at the bottom of `.github/docs-refactor-plan.md`. Include this change in the same commit or as a follow-up commit on the same branch before merging.

---

## Reference

- `.github/agents/` — all agent files; read these for details on what each agent does.
- `.github/prompts/extract-component-yaml.prompt.md` and `.github/prompts/generate-mdx.prompt.md` — kept as documentation references; the agent pipeline supersedes them for active use.
