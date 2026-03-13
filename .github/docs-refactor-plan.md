# Component Documentation Refactor Plan

This plan outlines the refactor of the HPE Design System component documentation. The strategy leverages GitHub Copilot Chat in VS Code to translate machine-readable YAML (used by agents) into human-friendly MDX pages (used by designers and developers). The rollout abstracts the recurring execution steps into a standard workflow, staged by component complexity.

## Steps

### 1. Tooling & Setup

- [x] Create a reusable GitHub Copilot prompt file (`.github/prompts/generate-mdx.prompt.md`).

### 2. Standard Component Workflow (Execute per component)

- [ ] Create a new YAML file for the component in `shared/data-structure/components/` as the new source of truth.
- [ ] Extract existing MDX content into the newly created YAML format matching `shared/data-structure/COMPONENT_EXAMPLE.yaml` and the `ComponentDefinition` schema in `shared/data-structure/types.ts`.
- [ ] Run the generation prompt (`.github/prompts/generate-mdx.prompt.md`) in Copilot Chat, leaving placeholders for coded examples.
- [ ] Save the generated output to `apps/docs/src/pages/components/[name].mdx`.
- [ ] Review copy against guidelines, note missing information or extra content in a `TODO-[component].md` file.
- [ ] Submit individual PRs (e.g., `docs: refactor [Component] component`).

### 3. Phased Rollout Targets

- **Phase 1: Pilot Components (Low Complexity)**: `button`, `checkbox`, `menu`
- **Phase 2: Inputs & Controls (Medium Complexity)**: `select`, `textinput`, `radiobuttongroup`
- **Phase 3: Complex Components (High Complexity)**: `accordion`, `card`, `layer`, `datatable`
- **Phase 4: Remaining Components Sweep**: Iterate through the remaining `~30` files in `apps/docs/src/pages/components/`.

## Verification

- [ ] Build and run the Next.js `docs` app to verify that the newly generated MDX files render correctly and without errors.
- [ ] Confirm the generated content strictly adheres to `writing-documentation.instruction.md` (e.g., imperative tone, concise bullet points instead of paragraphs).
- [ ] Review the `TODO-[component].md` per PR to ensure no undocumented gaps slip through, and that code example placeholders are clear.

## Decisions

- Abstracted the per-component steps into a standalone workflow section to eliminate repetition across phases.
- Chose to use GitHub Copilot Chat prompts instead of an automated Node.js generation script to accommodate available LLM tooling and API key constraints.
- Segmented by complexity to isolate template edge cases early during the pilot phase.
- Maintained a 1 PR per component structure to streamline PR feedback loops and quickly iterate on the script.
