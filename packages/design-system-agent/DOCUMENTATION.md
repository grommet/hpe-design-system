# Project purpose & design

## Background & intent
This project is intended to help designers and developers to increase consistency, quality, and velocity shipping UI features in alignment with the HPE Design System.

### HPE Design System assets
The design system includes:
- Design tokens (primitive, semantic, component)
- Components (definition, properties, variants, use case examples, anatomy, interaction states, keyboard controls, ARIA attributes, screen reader announcements, applicable WCAG criterion)
- Patterns (composed patterns which are solutions to common use cases and problems, related components, usage, template code, examples, pattern graph)

### HPE Design System consumers
The design system serves 50+ product teams across organizations and business units.

80% of products use React, while the other 20% are a variety of frameworks and component libraries.

The project is to be distributed as a package so that designers and developers may have the capabilities and knowledge of the system within their local project and development environment.

## Goals
The project should enable:
- **Building** with the HPE Design System
  - Text prompt to code generation
  - Design file to code generation (e.g. Figma frame exported as JSON would serve as the input)
  - Product requirements document to code generation
- **Evaluations** assessing the consuming application's alignment with the HPE Design System & the system's ability to meet consuming application needs.
  - The ability to scope the evaluation to the entire project or a particular feature area.
  - The evaluations should have a scoring mechanism so that we are able to monitor and measure improvement progress across:
    1. context generator quality
    2. component usage
    3. component coverage
    4. Typescript DX
    5. Token compliance
    6. application structure / page layouts
    7. responsive layouts
    8. accessibility
    9. agent experience
    10. developer experience
    11. developer confidence
  - Generate prioritized recommendations based off the evaluations. Recommendations should be classified as recommendations for improving the consumer application's implementation or as suggested improvements to the delivery of the design system.
  - Provide suggested remedies for top priority recommendations.
  - Ability to apply and implement remedies for top priority recommendations.
  - Evaluate the applied remedies
  - Execute the evaluation, recommendation, prioritization, remedy cycle in a continuous improvement loop.

## Project design
This is a sophisticated "Agentic Design System" project. To handle the scale of 50+ teams and the complexity of the requirements, the project is designed to be a **Multi-Agent Orchestration** architecture distributed via a Command Line Interface (CLI).

### Project Architecture: The "HPE Design System Copilot"
To support distribution as a package, the structure follows a Modular Agent pattern.

**Core Folder Structure**
- `/knowledge`: JSON, YAML, and Markdown files of the HPE Design System (Tokens, Components, Patterns).
- `/agents`: `agent.md`, `instructions.md`, and `skills.md` for each specialist.
- `/cli`: The interface for developers to run commands like `hpe-ds-ai audit` or `hpe-ds-ai gen`.

### Agents, Instructions, and Skills

| File | Audience | Purpose |
| --- | --- | --- |
| `agent.md` | Orchestrator/CLI | Registration: Tells the system the agent exists, what it does, and what tools it owns. |
| `instructions.md` | LLM | Persona & Logic: The "rules of engagement" or "SOP" for how the agent should think and behave. |
| `skills.md` | LLM | Manifest: A detailed description of the technical functions the agent can call. |

### Specialized agents

- **`orchestrator`:** The manager acting as the master controller. Responsible for managing state, handing off tasks between specialist agents, and maintaining the continuous improvement loop.
- **`auditor`:** The evaluator consuming the application's source code and scoring it against **Evaluation Metrics**.
  - Input: Application's source code
  - Task: Score the project based on evaluation metrics
  - Logic: Use a weighted formula to calculate an alignment index
- **`strategist`:** The prioritizer taking the audit findings and prioritizing by impact and effort.
  - Input: The Auditor's report
  - Task: Categorize issues into "Consumer Implementation" (e.g., "You used a hex code") vs. "System Improvement" (e.g., "The system lacks a pattern for this specific dashboard view"), then rank by impact and effort.
- **`engineer`:** The remediator implementing top priorities.
  - Input: Top priority recommendations
  - Task: Executes the "fix." Modifies the user's local files to replace legacy code with design system tokens, components, and patterns.
- **`reporter`:** The telemetry collector silently observing the ecosystem. Responsible for taking granular data from the Auditor and Strategist and compressing into high-level insights the HPE Design System can use to make roadmap and funding decisions.
  - Input: Data from Auditor and Strategist 
  - Task: Summarize adoption, points of friction, and ROI. Delivers

## Implementation Strategy: The Continuous Improvement Loop

| Phase | Agent | Action |
| --- | --- | --- |
| 1. Scan | Auditor | Runs static analysis on the local /src folder. |
| 2. Score | Auditor | Generates a report across the 11 metrics (Accessibility, Token compliance, etc.). |
| 3. Plan | Strategist | Sorts findings by "Effort vs. Impact." |
| 4. Fix | Engineer | Proposes code diffs for the developer to accept (y/n). |
| 5. Verify | Auditor | Re-runs the scan to confirm the score increased. |
| 6. Report | Reporter | Summarizes and delivers adoption and areas for improvement. |

### Master Sequence Diagram
This is the blueprint for how the CLI package executes. It visualizes the "handshake" between the agents, ensuring that no code is changed without being measured, and no problem is identified without being prioritized.

#### 1. Initiation Phase
- **User/CI:** Executes `hpe-ds-ai audit --fix`.
- **Orchestrator:** Loads `.hpedsrc` config and fetches the latest `knowledge/` (Tokens, Components, Patterns).
- **Orchestrator → Auditor:** Sends the file path and DS knowledge. "*Analyze this*."

#### 2. Analysis Phase
- **Auditor:** Performs AST parsing and Regex scans.
- **Auditor → Orchestrator:** Returns a structured JSON report (The Evaluation Metric Scorecard).
- **Orchestrator → Strategist:** Sends the Scorecard. "*What should we do first?*"

#### 3. Strategy Phase
- **Strategist:** Runs the $Impact/Effort$ matrix.
- **Strategist → Orchestrator:** Returns the "Game Plan" (batched remediation tasks).
- **Orchestrator → User:** Displays the Scorecard and the proposed fixes.
- **User:** Input `[Y]` to approve the top 3 critical fixes.

#### 4. Remediation Phase
- **Orchestrator → Engineer:** Sends the specific files and approved tasks. "*Fix these 3 items.*"
- **Engineer:** Generates code diffs, ensuring A11y and Token compliance.
- **Engineer → User:** Displays the `diff` for review.
- **User:** Input `[Y]` to write changes to disk.

#### 5. Verification Phase
- **Orchestrator → Auditor:** Sends the newly modified code. "*Verify the improvement.*"
- **Auditor:** Re-scores the evaluation metrics.
- **Orchestrator → User:** Displays the improvement delta (e.g., "Score: 0.45 → 0.72").

#### 6. External Reporting
- **Orchestrator:** If a "System Gap" was found, it generates the **System Delivery Ticket**.
- **Orchestrator:** Sends telemetry to your organization's central dashboard.


### Agent-to-Agent data flow

| From | To | Data Packet |
| --- | --- | --- |
| Auditor | Strategist | `raw_findings[]` + `alignment_score` |
| Strategist | Engineer | `remediation_tasks[]` + `priority_level` |
| Engineer | Auditor | `modified_code_snippets[]` |
| Orchestrator | External API | `telemetry_payload` + `system_delivery_ticket` |


### Enterprise benefits
- **Asynchronous audits:** Teams can run the Auditor in their PRs without ever running the Engineer (passive monitoring).
- **Modular skills:** If we decide to support a new framework (e.g., Vue), we only need to update the `skills.md` for the **Auditor** and **Engineer**. The Orchestrator and Strategist logic remains exactly the same.
- **Traceability:** Every code change made by the AI is linked back to a specific metric violation found by the Auditor.


