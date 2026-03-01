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
    - **Consumer Implementation metrics:**
      1. Component Coverage
      2. Component Usage
      3. App Structure
      4. Token Compliance
      5. Responsive Layouts
      6. Accessibility
      7. Type Safety & Interfaces
      8. Dev Confidence
    - **Design System Enablement metrics:**
      9. System Discoverability
      10. Developer Experience
      11. Agent Experience
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
  - Task: Score the project based on evaluation metrics (Consumer Implementation and Design System Enablement)
  - Logic: Use a weighted formula to calculate separate Consumer Alignment and System Enablement scores, then a combined rollup score
  - Output: Structured JSON scorecard with raw scores, status (Pass/Warning/Fail per metric), and evidence citations
- **`strategist`:** The prioritizer taking the audit findings and prioritizing by impact and effort.
  - Input: The Auditor's scorecard report
  - Task: Categorize issues into "Consumer Implementation" (e.g., "You used a hex code") vs. "System Improvement" (e.g., "The system lacks a pattern for this specific dashboard view"), then rank by impact and effort using the Impact/Effort matrix
  - Output: Game Plan with top 3 Consumer recommendations and P1/P2/P3 System Delivery Suggestions
- **`engineer`:** The remediator implementing top priorities.
  - Input: Top priority recommendations from the Strategist
  - Task: Executes the "fix" by modifying the user's local files to replace legacy code with design system tokens, components, and patterns
  - Output: Code diffs for user approval before writing to disk
- **`reporter`:** The telemetry collector silently observing the ecosystem. Responsible for taking granular data from the Auditor and Strategist and compressing into high-level insights the HPE Design System can use to make roadmap and funding decisions.
  - Input: Data from Auditor (scorecard metrics, evidence) and Strategist (system gaps, impact/effort rankings)
  - Task: Aggregate adoption trends, friction points, and ROI signals across the 50+ consuming teams
  - Output: Monthly/quarterly telemetry dashboard and system roadmap recommendations

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
- **Orchestrator:** Loads `.hpedsrc` config (see Configuration section below) and fetches the latest `knowledge/` (Tokens, Components, Patterns).
- **Orchestrator → Auditor:** Sends the file path, scope, detected framework, and DS knowledge. "*Analyze this*."

#### 2. Analysis Phase
- **Auditor:** Performs AST parsing, regex scans, and static analysis.
- **Auditor → Orchestrator:** Returns a structured JSON report (The Evaluation Metric Scorecard) with Consumer Alignment Score, System Enablement Score, Combined Alignment Score, and classified findings.
- **Orchestrator → Strategist:** Sends the Scorecard. "*What should we do first?*"

#### 3. Strategy Phase
- **Strategist:** Runs the Impact/Effort matrix on Consumer findings and assigns P1/P2/P3 severity to System Delivery Suggestions.
- **Strategist → Orchestrator:** Returns the "Game Plan" (batched Consumer remediation tasks + prioritized System gaps).
- **Orchestrator → User:** Displays the Scorecard (both Consumer and System scores), improvement delta (if re-audit), and top 3 proposed Consumer fixes.
- **User:** Input `[Y]` to approve the top 3 critical Consumer fixes.

#### 4. Remediation Phase
- **Orchestrator → Engineer:** Sends the specific files, approved tasks, and context. "*Fix these 3 items.*"
- **Engineer:** Generates code diffs, ensuring A11y and Token compliance per HPEDS standards.
- **Engineer → User:** Displays the `diff` for review with rationale.
- **User:** Input `[Y]` to write changes to disk.

#### 5. Verification Phase
- **Orchestrator → Auditor:** Sends the newly modified code. "*Verify the improvement.*"
- **Auditor:** Re-scores the evaluation metrics across both Consumer and System dimensions.
- **Orchestrator → User:** Displays the improvement delta (e.g., "Consumer Score: 0.45 → 0.72; System Enablement: 0.60 → 0.65").

#### 6. External Reporting
- **Orchestrator:** If P1 "System Gap" findings were identified, it generates a **System Delivery Ticket** (see System Delivery Suggestion severity rules in auditor instructions).
- **Orchestrator:** Sends telemetry to your organization's central dashboard (adoption rate, metric trends, friction points).


## Configuration

### `.hpedsrc` file
The `.hpedsrc` file is a JSON or YAML configuration file in the root of the consuming application that tells the Orchestrator how to run audits. The Orchestrator loads this on initiation.

**Required fields:**
- `framework`: The application's UI framework (e.g., `"react"`, `"vue"`, `"angular"`). Used by Auditor and Engineer to select framework-specific skills.
- `scope`: The default audit scope (e.g., `"src/"`, or specific directory like `"src/pages/dashboard/"`).

**Optional fields:**
- `feedback_collection`: Whether to collect team feedback signals via CLI prompt (default: `true`).
- `auto_apply_fixes`: If `true`, Engineer automatically applies non-critical fixes; if `false`, all fixes require user approval (default: `false`).
- `telemetry_endpoint`: URL for sending Reporter telemetry (default: to HPE Design System telemetry service).

**Example:**
```json
{
  "framework": "react",
  "scope": "src/",
  "feedback_collection": true,
  "auto_apply_fixes": false
}
```

## Framework Support

The Auditor and Engineer support multiple frameworks via modular skills. Framework detection:
1. Check `.hpedsrc` `framework` field (highest priority).
2. Auto-detect from `package.json` dependencies if not specified.
3. Prompt user if detection fails.

**Supported frameworks:** React (primary, 80% of users), Vue, Angular, and others via pluggable skill modules.

### Agent-to-Agent data flow

| From | To | Data Packet |
| --- | --- | --- |
| Auditor | Strategist | `consumer_score`, `system_score`, `combined_score`, `raw_findings[]` with evidence citations |
| Strategist | Engineer | `consumer_remediation_tasks[]` + `priority_level`, `system_delivery_suggestions[]` + `p1_p2_p3_severity` |
| Engineer | Auditor | `modified_code_snippets[]` + `file_paths` |
| Auditor | Reporter | `scorecard_snapshot` (metrics, scores, timestamp) |
| Orchestrator | External API | `telemetry_payload` (adoption metrics, improvement trends) + `system_delivery_ticket` (P1 gaps only) |


### Enterprise benefits
- **Asynchronous audits:** Teams can run the Auditor in their PRs without ever running the Engineer (passive monitoring mode). Useful for visibility without mandatory remediation.
- **Modular skills:** If we decide to support a new framework (e.g., Svelte), we only need to update the `skills.md` for the **Auditor** and **Engineer**. The Orchestrator, Strategist, and Reporter logic remains exactly the same.
- **Traceability:** Every code change made by the Engineer is linked back to a specific metric violation found by the Auditor, with evidence citations (file path, line range, matched knowledge artifact).
- **System-level feedback loop:** Reporter collects adoption and friction signals from 50+ teams, enabling the HPE Design System team to prioritize gaps (P1 tickets) and deprecations.


