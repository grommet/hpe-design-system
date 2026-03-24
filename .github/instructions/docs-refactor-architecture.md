# Docs Refactor Architecture Diagram

This diagram maps the resources, transformation steps, validation gates, and outputs used in the component docs refactor workflow.

```mermaid
flowchart LR
  %% Inputs and standards
  subgraph A[Source and Governance Resources]
    A1[Existing component MDX pages\napps/docs/src/pages/components/*.mdx]
    A2[Extraction prompt\n.github/prompts/extract-component-yaml.prompt.md]
    A3[Generation prompt\n.github/prompts/generate-mdx.prompt.md]
    A4[Schema contract\nshared/data-structure/types.ts\nComponentDefinition]
    A5[Authoring template\napps/docs/COMPONENT_TEMPLATE.md]
    A6[Writing rules\n.github/instructions/writing-documentation.instruction.md]
    A7[Execution runbook\n.github/instructions/docs-refactor-execution.md]
    A8[Project tracking plan\n.github/docs-refactor-plan.md]
    A9[Example code inventory\napps/docs/src/examples/components/*]
  end

  %% Transformation pipeline
  subgraph B[Refactor Pipeline Per Component]
    B1[Copilot extraction run]
    B2[YAML source of truth\nshared/data-structure/components/component-name.yaml]
    B3[Schema and content validation]
    B4[Backup old MDX\ncomponent-name.mdx.bak]
    B5[Copilot MDX generation run]
    B6[New standardized MDX\napps/docs/src/pages/components/component-name.mdx]
    B7[Merge preserved runtime wrappers\nimports, Layout, frontmatter]
  end

  %% Quality and outputs
  subgraph C[Quality Gates and Delivery]
    C1[Gap log\napps/docs/todos/TODO-component-name.md]
    C2[Legacy log\napps/docs/todos/DEPRECATED-component-name.md]
    C3[Render verification\nBuild and run docs app]
    C4[Style verification\nTemplate and writing conformance]
    C5[PR delivery\n1 PR per component]
    C6[Checklist update\nMark component complete in plan]
  end

  %% Main flow
  A1 --> B1
  A2 --> B1
  A4 --> B1
  A9 --> B1

  B1 --> B2
  B2 --> B3
  A4 --> B3

  A1 --> B4
  B3 --> B5
  A3 --> B5
  A5 --> B5
  A6 --> B5
  A9 --> B5
  B4 --> B7

  B5 --> B6
  B6 --> B7

  B7 --> C1
  B7 --> C2
  B7 --> C3
  B7 --> C4

  C3 --> C5
  C4 --> C5
  C1 --> C5
  C2 --> C5
  C5 --> C6
  A8 --> C6

  %% Feedback loops
  C3 -- fix render issues --> B6
  C4 -- adjust structure and tone --> B6
  C1 -- resolve missing data later --> B2
```

## Notes

- The YAML file is the machine-readable source of truth for each component.
- The generated MDX is the user-facing artifact and may require selective merge-back from the backup MDX to preserve Next.js page wiring.
- TODO and DEPRECATED files make migration debt explicit and reviewable per component PR.
- The final checklist update in the plan file closes the loop for program-level tracking.

## Ownership Diagram

This view maps the main roles to their primary responsibilities during a component refactor.

```mermaid
flowchart TB
  %% Roles
  R1[Documentation engineer]
  R2[Copilot workflow]
  R3[Schema and standards maintainers]
  R4[Component reviewers]
  R5[PR approver and merger]

  %% Artifacts and checkpoints
  D1[Source MDX\napps/docs/src/pages/components/component-name.mdx]
  D2[YAML definition\nshared/data-structure/components/component-name.yaml]
  D3[Generated MDX\napps/docs/src/pages/components/component-name.mdx]
  D4[Gap tracking\napps/docs/todos/TODO-component-name.md]
  D5[Legacy tracking\napps/docs/todos/DEPRECATED-component-name.md]
  D6[Schema contract\nshared/data-structure/types.ts]
  D7[Template and writing rules\napps/docs/COMPONENT_TEMPLATE.md\n.github/instructions/writing-documentation.instruction.md]
  D8[Plan checklist\n.github/docs-refactor-plan.md]

  %% Ownership links
  R1 -- curates --> D1
  R1 -- validates and edits --> D2
  R1 -- finalizes --> D3
  R1 -- documents gaps --> D4
  R1 -- documents removed legacy --> D5

  R2 -- extracts from --> D1
  R2 -- drafts --> D2
  R2 -- generates from --> D2
  R2 -- outputs draft --> D3

  R3 -- defines and updates --> D6
  R3 -- governs --> D7
  D6 -- constrains --> D2
  D7 -- constrains --> D3

  R4 -- reviews quality of --> D2
  R4 -- reviews quality of --> D3
  R4 -- checks completeness of --> D4
  R4 -- checks completeness of --> D5

  R5 -- accepts and merges --> D3
  R5 -- requires update to --> D8

  D3 --> D8
```