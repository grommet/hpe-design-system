# Component Documentation Refactor Plan

This plan outlines the refactor of the HPE Design System component documentation. The strategy leverages GitHub Copilot Chat in VS Code to translate machine-readable YAML (used by agents) into human-friendly MDX pages (used by designers and developers). The rollout abstracts the recurring execution steps into a standard workflow, staged by component complexity.

## Steps

### 1. Standard Component Workflow (Execute per component)

Each component is driven end-to-end by the orchestrator agent. From a feature branch, run:

> `@docs-refactor-orchestrator [component-name]`

The orchestrator detects the current pipeline stage, confirms before making any changes, and delegates to the appropriate agents in sequence. See `knowledge/capabilities/docs-refactor/docs/execution.skill.md` for the full walkthrough.

### 2. Phased Rollout Targets

- **Phase 1: Pilot Components (Low Complexity)**: `button`, `checkbox`, `menu`
- **Phase 2: Inputs & Controls (Medium Complexity)**: `select`, `textinput`, `radiobuttongroup`
- **Phase 3: Complex Components (High Complexity)**: `accordion`, `card`, `layer`, `datatable`
- **Phase 4: Remaining Components Sweep**: Iterate through the remaining `~30` files in `apps/docs/src/pages/components/`.

## Decisions

- Abstracted the per-component steps into a dedicated orchestrator agent (`docs-refactor-orchestrator`) so contributors run a single command rather than manually invoking each agent in sequence.
- The orchestrator uses `.mdx.bak` file presence/absence as the primary pipeline state signal, avoiding any external state store.
- Sub-component architecture (e.g. `CardBody`) is evaluated case-by-case during YAML extraction — either nested within the parent YAML or as a standalone file.
- Prompt files (`knowledge/archive/prompts/`) are retained as documentation references; the agent pipeline supersedes them for active use.
- Segmented by complexity to isolate template edge cases early during the pilot phase.
- Maintained 1 PR per component to streamline feedback loops and iteration.

## Full Component Checklist

- [ ] accordion
- [ ] all-components
- [ ] anchor
- [ ] avatar
- [ ] box
- [ ] button
- [ ] card/call-to-action-card
- [ ] card/index
- [ ] card/navigational-card
- [x] checkbox
- [ ] checkboxgroup
- [ ] data
- [ ] datafilter
- [ ] datafilters
- [ ] datasearch
- [ ] datasort
- [ ] datasummary
- [ ] datatable
- [ ] datatablecolumns
- [ ] datatablegroupby
- [ ] dataview
- [ ] dateinput
- [ ] fileinput
- [ ] footer
- [ ] grid
- [ ] header
- [ ] layer/center-layer
- [ ] layer/fullscreen-layer
- [ ] layer/index
- [ ] layer/side-drawer-layer
- [ ] main
- [ ] maskedinput
- [x] menu
- [ ] namevaluelist
- [ ] notification
- [ ] page
- [ ] pageheader
- [ ] pagination
- [ ] radiobuttongroup
- [ ] rangeinput
- [ ] search
- [ ] select
- [ ] selectmultiple
- [ ] skeleton
- [ ] spinner
- [ ] tabs
- [ ] tag
- [ ] textarea
- [ ] textinput
- [ ] tip
- [ ] togglegroup
- [ ] toolbar
