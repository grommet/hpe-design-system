# Component Docs Refactor: Executing the Plan

Welcome to the component documentation refactor project! The goal of this effort is to establish a rigorous, machine-readable YAML "source of truth" for every component while simultaneously standardizing our user-facing MDX pages.

This guide describes the full pipeline and the agents that power each step. To navigate the pipeline interactively, use the **`docs-refactor-conductor`** agent — it inspects the current state of any component and tells you exactly which agent to run next.

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

Use **`docs-refactor-conductor`** at any point to check where a component is in the pipeline and get the exact prompt to run next.

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

### Step 2: Extract existing MDX into YAML

Run the **`extract-yaml-agent`** agent:

> `@extract-yaml-agent button`

This agent:
- Reads `apps/docs/src/pages/components/button.mdx`
- Extracts all content into `shared/data-structure/components/button.yaml` matching the `ComponentDefinition` schema in `shared/data-structure/types.ts`
- Validates the YAML inline before saving
- Stubs `apps/docs/todos/DEPRECATED-button.md` for any unmappable content
- Renames the original MDX to `button.mdx.bak`

Reference prompt (if running manually without the agent): `.github/prompts/extract-component-yaml.prompt.md`

### Step 3: Generate the new standardized MDX

Run the **`generate-mdx-agent`** agent:

> `@generate-mdx-agent button`

This agent:
- Reads `button.yaml`, `COMPONENT_TEMPLATE.md`, and `writing-documentation.instruction.md`
- Generates the new MDX page with all sections, TODO placeholders for missing examples, and `<BestPracticeGroup>` blocks for do/don't entries
- Restores Next.js frontmatter, layout imports, and `<AccessibilitySection>` from `button.mdx.bak`
- Saves the result directly to `apps/docs/src/pages/components/button.mdx`

Reference prompt (if running manually without the agent): `.github/prompts/generate-mdx.prompt.md`

### Step 4: Implement use case examples and do/don't previews (parallel)

Run **`generate-examples-agent`** and **`dos-donts-agent`** — these are independent and can run at the same time.

**`generate-examples-agent`** — implements coded React examples for each `{/* TODO */}` placeholder in the Use Cases section:

> `@generate-examples-agent button`

**`dos-donts-agent`** — creates paired Good/Bad React preview components for each `<div>{/* TODO */}</div>` placeholder in the Dos and Don'ts section:

> `@dos-donts-agent button`

### Step 5: Create TODO and DEPRECATED tracking files

Run the **`create-todos-agent`** agent:

> `@create-todos-agent button`

This agent:
- Diffs `button.mdx.bak` against the new `button.mdx`
- Produces `apps/docs/todos/TODO-button.md` (remaining gaps, missing examples, missing props, missing assets)
- Updates `apps/docs/todos/DEPRECATED-button.md` (content removed or restructured, with a mapping table)
- Deletes `button.mdx.bak`

These files are **required outputs** for every component refactor, not optional.

### Step 6: Review copy quality

Run the **`review-copy-agent`** agent:

> `@review-copy-agent button`

This agent audits the generated MDX copy against `writing-documentation.instruction.md` and reports suggested edits by severity (must fix / recommend / consider). It does not apply changes — review the suggestions and apply them manually.

### Step 7: Verify locally

Build and run the `docs` app to confirm the new page renders without errors:

```bash
cd apps/docs
pnpm start
```

Open the component page in the browser and check the console for errors — especially `cloneElement`/`undefined children` errors, which are the most common crash pattern.

### Step 8: Push and PR

1. Commit your new YAML file, the updated MDX file, any new example files, and the TODO/DEPRECATED files.
2. Title the PR `docs: refactor [Component] component`.
3. **Check off your component** in the Full Component Checklist at the bottom of `.github/docs-refactor-plan.md`. Include this change in the same commit or as a follow-up commit on the same branch before merging.

---

## Reference: Prompt files

The following prompt files are kept as documentation references. The agents above supersede them for active use.

- `.github/prompts/extract-component-yaml.prompt.md` — reference for `extract-yaml-agent`
- `.github/prompts/generate-mdx.prompt.md` — reference for `generate-mdx-agent`
