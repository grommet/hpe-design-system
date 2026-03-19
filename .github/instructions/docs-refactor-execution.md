# Component Docs Refactor: Executing the Plan

Welcome to the component documentation refactor project! The goal of this effort is to establish a rigorous, machine-readable YAML "source of truth" for every component while simultaneously standardizing our user-facing MDX pages.

This guide will walk you through exactly how to pick up a component and execute the refactor end-to-step.

## Prerequisites

1. Ensure you have **GitHub Copilot Chat** installed and active in VS Code.
2. Read the project plan: `.github/docs-refactor-plan.md`
3. Identify which component you are assigned to refactor (check the "Full Component Checklist" at the bottom of the plan file).

## Step-by-Step Execution Guide

For this guide, we will use `Button` as an example. Replace `button` with your assigned component.

### Step 1: Branch Out

Create a new branch for your specific component. The base integration branch for this project is `project-sanderson`. We are limiting scope to **1 Pull Request per component**.

```bash
git checkout project-sanderson
git pull
git checkout -b project-sanderson-refactor-button
```

### Step 2: Extract Existing Markdown into YAML

We don't want to type YAML by hand. We will use Copilot to reverse-engineer the existing Docs.

1. Open your component's current MDX file: `apps/docs/src/pages/components/button.mdx`
2. Open Copilot Chat in VS Code.
3. Reference the extraction prompt and run it. You can drag and drop the necessary context files into the chat, or use `@workspace` commands:
   > "Please follow the instructions in `.github/prompts/extract-component-yaml.prompt.md` to extract `apps/docs/src/pages/components/button.mdx`. Reference `shared/data-structure/types.ts`."
4. Review the generated YAML output. **CRITICAL:** Ensure the `examples` array contains relative paths to `apps/docs/src/examples/components/` and _not_ raw React code.
5. Save the output to `shared/data-structure/components/button.yaml`.

### Step 3: Validate the Data

Visually inspect `button.yaml` against the `ComponentDefinition` interface in `shared/data-structure/types.ts`.

- Ensure all required fields exist.
- Ensure the structural shapes are correct (e.g. usage, anatomy, vs array of strings vs objects).

### Step 4: Protect Existing Interactive Code

To prevent our Next.js specific wrapper imports and frontmatter from being destroyed during generation, rename the existing MDX file to create a backup.

```bash
mv apps/docs/src/pages/components/button.mdx apps/docs/src/pages/components/button.mdx.bak
```

### Step 5: Generate the New Standardized MDX

Now we'll use Copilot to write the new Markdown based strictly on our new YAML definition and the rigid writing guidelines.

1. Open the newly created `button.yaml` file.
2. In Copilot Chat run:
   > "Please follow `.github/prompts/generate-mdx.prompt.md` to format `button.yaml` into MDX documentation."
3. Save the Chat output to `apps/docs/src/pages/components/button.mdx`.
4. **Merge from backup:** Open `.mdx.bak` and manually copy over any necessary Next.js file-routing imports, `<Layout>` wrappers, React component imports (like `<AccessibilitySection title="[Component]" />`), or frontmatter that were lost into the new `.mdx` file.

### Step 6: Cleanup & Review

1. Delete the `.bak` file.

```bash
rm apps/docs/src/pages/components/button.mdx.bak
```

2. Build and run the `docs` app locally to ensure the new `button.mdx` page renders without crashing.
3. Review the generated Markdown copy. Does it adhere to the rules in `.github/instructions/writing-documentation.instruction.md`? (e.g. Imperative tone, concise bullet points).
4. If there were data gaps in the original documentation that need to be researched, catalog them in `apps/docs/todos/TODO-[component].md`. If there was legacy content that doesn't fit the new rigid `.mdx` template, log it in `apps/docs/todos/DEPRECATED-[component].md`.

### Step 7: Push & PR

Create a focused pull request.

1. Commit your new YAML file, the updated MDX file, and any TODO/DEPRECATED files.
2. Title the PR `docs: refactor [Component] component`.
3. **Check off your component** in the **Full Component Checklist** at the bottom of `.github/docs-refactor-plan.md`. Include this change in the same commit or as a follow-up commit on the same branch before merging — not after.
