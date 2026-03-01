# Auditor agent skills

## Core ingestion skills
Capabilities for reading and normalizing various input types into a common audit schema.

- **Figma JSON Parser:** Ability to traverse Figma REST API exports or local JSON files to identify layer names, styles, and layout properties.
- **PRD Semantic Analysis:** Natural Language Processing (NLP) to extract functional requirements, intended user roles, and UI constraints from Markdown or PDF project documents.
- **Project Context Crawler:** Scans package.json, tsconfig.json, and directory structures to determine the framework (React vs. Others) and library versions in use.

## Static code analysis
Technical methods for "reading" code without executing it.

- **AST (Abstract Syntax Tree) Traversal:**
  - **React Specialist:** Uses Babel or TypeScript parsers to identify HPEDS component imports (e.g., import { Button } from 'grommet').
  - **Prop Validation:** Checks passed props against the HPEDS component definition (e.g., "Is size='xl' a valid variant?").
- **Regex Token Detection:** Scans CSS, SCSS, and CSS-in-JS files for hardcoded hex codes, RGB, and pixel values.
  - Maps detected values to the nearest matching Component, Semantic, or Primitive token.
- **Dependency Mapping:** Identifies non-HPEDS component libraries (e.g., MUI, Radix, Tailwind) being used as "shadow UI" instead of system-standard components.

## Compliance & accessibility skills
Specific checks focused on quality and inclusion.
- **A11y Anatomy Auditor:** Cross-references code against the knowledge/components anatomy files.
  - Checks for `aria-*` attributes on complex components (Tabs, Modals).
  - Verifies keyboard event listeners (`onKeyDown`, `onKeyUp`) match system requirements.
- **Responsive Breakpoint Check:** Analyzes media queries and layout components to ensure they align with the system's grid or breakpoint tokens.

## Evaluation & scoring engine
The "math" behind the metric evaluation framework.
- **Metric Weighting Engine:** Executes the $A_t$ calculation formula. It assigns a 0.0 - 1.0 score to each metric based on findings:
  - Example: If 80% of buttons are EDS, but 20% are <button>, Component Coverage = 0.8.
- **Impact Classifier:** A logic gate that tags findings as "Critical" (Accessibility/Security), "High" (Branding/Tokens), or "Low" (Style overrides).
**Gap Identification:** Compares "Custom UI" patterns in the consumer app against the HPEDS Pattern Graph to detect if a new system pattern is missing (System Delivery Suggestion).

## Output & Integration Skills
How the agent communicates its findings.
- **Diff Generation:** Creates standard `.diff` or `.patch` files representing the "Remedy" for identified issues.
- **Reporting (Markdown/JSON):** Exports the final scorecard in a machine-readable format for the **Strategist Agent** and a human-readable format for the developer.
- **Loop Initiation:** Triggers the `ds-ai fix` command by passing a prioritized list of remediation tasks to the **Engineer Agent**.


