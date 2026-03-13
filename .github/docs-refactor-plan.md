# Component Documentation Refactor Plan

This plan outlines the refactor of the HPE Design System component documentation. The strategy leverages a Node.js script to translate machine-readable YAML (used by agents) into human-friendly MDX pages (used by developers) via an LLM API. The rollout will be staged by component complexity, delivering one pull request per component to ensure focused review and alignment with the writing guidelines.

## Steps

### 1. Tooling & Setup

- [ ] Create a Node.js LLM generation script (e.g., in `apps/docs/scripts/generate-docs.js`).
- [ ] The script will read a component's YAML from `shared/data-structure/components/[name].yaml` and inject it into a prompt alongside `apps/docs/COMPONENT_TEMPLATE.md` and `.github/instructions/writing-documentation.instruction.md`.
- [ ] Set the script to output the refined MDX to `apps/docs/src/pages/components/[name].mdx`.

### 2. Phase 1: Pilot Components (Low Complexity)

Target: `button`, `checkbox`, `menu`.

- [ ] Extract existing MDX content into YAML format matching `shared/data-structure/COMPONENT_EXAMPLE.yaml`.
- [ ] Run the generation script. Leave placeholders for coded examples.
- [ ] Review copy against guidelines, note missing information or extra content in a `TODO-[component].md` file.
- [ ] Submit individual PRs (e.g., `docs: refactor Button component`).

### 3. Phase 2: Inputs & Controls (Medium Complexity)

Target: `select`, `textinput`, `radiobuttongroup`.

- [ ] Extract content into YAML.
- [ ] Run the generation script to output MDX.
- [ ] Identify gaps and extra content, putting them in the TODO list.
- [ ] Submit individual PRs.

### 4. Phase 3: Complex Components (High Complexity)

Target: `accordion`, `card`, `layer`, `datatable`.

- [ ] Extract structure into YAML.
- [ ] Generate MDX using the LLM script.
- [ ] Catalog complex missing examples in the TODO list.
- [ ] Submit individual PRs.

### 5. Phase 4: Remaining Components Sweep

- [ ] Iterate through the remaining `~30` files in `apps/docs/src/pages/components/` following the established YAML → Script → Review → PR workflow.

## Verification

- [ ] Build and run the Next.js `docs` app to verify that the newly generated MDX files render correctly and without errors.
- [ ] Confirm the generated content strictly adheres to `writing-documentation.instruction.md` (e.g., imperative tone, concise bullet points instead of paragraphs).
- [ ] Review the `TODO-[component].md` per PR to ensure no undocumented gaps slip through.

## Decisions

- Chose an automated LLM script step instead of a manual translation to ensure the human-readable MDX adheres to the rigid style guide rules.
- Segmented by complexity to isolate template edge cases early during the pilot phase.
- Maintained a 1 PR per component structure to streamline PR feedback loops and quickly iterate on the script.
