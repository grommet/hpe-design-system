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

## Context management
To keep the LLM context window efficient and deterministic:
- **Scope-first:** Only include files within the declared scope and only expand when evidence requires it.
- **Evidence payloads:** Prefer file/line references and short excerpts over full file content.
- **Context tiers:** Always include `scope`, `framework`, `knowledge_version`, and `mode` (audit vs. gen); pull deeper context only on demand.
- **Caching:** Reuse knowledge summaries and prior findings across loop steps when possible.
- **Context budgets (targets):** keep total input per agent under ~8k tokens for audits and ~6k tokens for generation; evidence excerpts capped at ~2k tokens; summaries capped at ~500 tokens.

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
- **`engineer`:** The remediator and builder for HPEDS-aligned code.
  - Input: Top priority recommendations from the Strategist, or generation inputs (text prompt, Figma JSON, or PRD)
  - Task: Generates HPEDS-aligned code diffs for remediation or new feature creation using tokens, components, and patterns
  - Output: Code diffs with rationale for user approval before writing to disk
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

### Generative Build Flow (independent of audit)
This flow supports feature implementation from prompts, Figma JSON, or PRDs. It can be run standalone or invoked after an audit recommendation.

#### 1. Generation Initiation
- **User/CI:** Executes `hpe-ds-ai gen <prompt>` or `hpe-ds-ai gen --figma <file>` or `hpe-ds-ai gen --prd <file>`.
- **Orchestrator:** Loads `.hpedsrc` config, fetches the latest `knowledge/`, and provides codebase context if the target is an existing feature area.

#### 2. Generation Phase
- **Orchestrator → Engineer:** Sends generation request, constraints, and relevant context. "*Build this feature.*"
- **Engineer:** Produces HPEDS-aligned code diffs using components, patterns, and tokens.
- **Engineer → User:** Displays the `diff` for review with rationale.
- **User:** Input `[Y]` to write changes to disk.

#### 3. Verification (optional in PoC; default in MVP+)
- **Orchestrator → Auditor:** Runs a targeted audit to confirm alignment in the modified area.
- **Orchestrator → User:** Displays alignment summary and any follow-up recommendations.


## Configuration

### `.hpedsrc` file discovery and setup

The Orchestrator looks for `.hpedsrc` in the following order (first match wins):
1. Root of the repository (`./`)
2. Root of the monorepo workspace (if applicable)
3. User's home directory (`~/.hpedsrc`) as a fallback for global defaults

If no `.hpedsrc` is found, the Orchestrator prompts interactively for `framework` and `scope`, then caches the response in the repo root.

**Recommendation:** Commit `.hpedsrc` to version control so all team members use consistent audit settings.

### `.hpedsrc` file
The `.hpedsrc` file is a JSON or YAML configuration file in the root of the consuming application that tells the Orchestrator how to run audits. The Orchestrator loads this on initiation.

**Required fields:**
- `framework`: The application's UI framework (e.g., `"react"`, `"vue"`, `"angular"`). Used by Auditor and Engineer to select framework-specific skills.
- `scope`: The default audit scope (e.g., `"src/"`, or specific directory like `"src/pages/dashboard/"`).

**Optional fields:**
- `feedback_collection`: Whether to collect team feedback signals via CLI prompt (default: `true`).
- `auto_apply_fixes`: If `true`, Engineer automatically applies non-critical fixes; if `false`, all fixes require user approval (default: `false`).
- `post_generation_audit`: Controls targeted audits after `hpe-ds-ai gen` (options: `optional`, `default`, `disabled`; default: `optional` in PoC, `default` in MVP+).
- `telemetry_endpoint`: URL for sending Reporter telemetry (default: to HPE Design System telemetry service).

**Example:**
```json
{
  "framework": "react",
  "scope": "src/",
  "feedback_collection": true,
  "auto_apply_fixes": false,
  "post_generation_audit": "optional"
}
```

## Framework Support

The Auditor and Engineer support multiple frameworks via modular skills. Framework detection:
1. Check `.hpedsrc` `framework` field (highest priority).
2. Auto-detect from `package.json` dependencies if not specified.
3. Prompt user if detection fails.

**Supported frameworks:** React (primary, 80% of users), Vue, Angular, and others via pluggable skill modules.

### Framework Coverage & Roadmap

| Framework | Support Status | Auditor | Engineer | Notes |
| --- | --- | --- | --- | --- |
| React | ✅ Stable | Full scoring | Full remediation | Primary platform; most patterns/components built for React |
| Vue | ✅ Beta | Full scoring* | Full remediation* | *Component binding syntax differs; Engineer generates Vue 3 composition API |
| Angular | ✅ Beta | Full scoring* | Full remediation* | *TypeScript-first; DX metrics heavily weighted toward Angular idioms |
| Svelte | 🔄 Roadmap | Partial (M1 2026) | Planned (M2 2026) | In design phase; awaiting customer adoption signals |
| Next.js | ✅ Included | As React | As React | File-route conventions auto-detected |
| Nuxt | ✅ Included | As Vue | As Vue | File-route conventions auto-detected |

**Unsupported framework fallback:** If a framework is not listed, the Orchestrator falls back to React skill set with a warning: "Framework not natively supported; using React conventions. Some metrics may be inaccurate."

**Framework-specific skill loading:** The Orchestrator detects framework from `.hpedsrc` or `package.json` and loads the corresponding `auditor/skills-{framework}.md` and `engineer/skills-{framework}.md` modules.

## Configuration

### `.hpedsrc` file discovery and setup

The Orchestrator looks for `.hpedsrc` in the following order (first match wins):
1. Root of the repository (`./`)
2. Root of the monorepo workspace (if applicable)
3. User's home directory (`~/.hpedsrc`) as a fallback for global defaults

If no `.hpedsrc` is found, the Orchestrator prompts interactively for `framework` and `scope`, then caches the response in the repo root.

**Recommendation:** Commit `.hpedsrc` to version control so all team members use consistent audit settings.

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

### Framework Coverage & Roadmap

| Framework | Support Status | Auditor | Engineer | Notes |
| --- | --- | --- | --- | --- |
| React | ✅ Stable | Full scoring | Full remediation | Primary platform; most patterns/components built for React |
| Vue | ✅ Beta | Full scoring* | Full remediation* | *Component binding syntax differs; Engineer generates Vue 3 composition API |
| Angular | ✅ Beta | Full scoring* | Full remediation* | *TypeScript-first; DX metrics heavily weighted toward Angular idioms |
| Svelte | 🔄 Roadmap | Partial (M1 2026) | Planned (M2 2026) | In design phase; awaiting customer adoption signals |
| Next.js | ✅ Included | As React | As React | File-route conventions auto-detected |
| Nuxt | ✅ Included | As Vue | As Vue | File-route conventions auto-detected |

**Unsupported framework fallback:** If a framework is not listed, the Orchestrator falls back to React skill set with a warning: "Framework not natively supported; using React conventions. Some metrics may be inaccurate."

**Framework-specific skill loading:** The Orchestrator detects framework from `.hpedsrc` or `package.json` and loads the corresponding `auditor/skills-{framework}.md` and `engineer/skills-{framework}.md` modules.

### Agent-to-Agent data flow

| From | To | Data Packet |
| --- | --- | --- |
| Auditor | Strategist | `consumer_score`, `system_score`, `combined_score`, `raw_findings[]` with evidence citations |
| Strategist | Engineer | `consumer_remediation_tasks[]` + `priority_level`, `system_delivery_suggestions[]` + `p1_p2_p3_severity` |
| Orchestrator | Engineer | `generation_request` (prompt/figma/prd), `context_snapshot`, `constraints` |
| Engineer | Auditor | `modified_code_snippets[]` + `file_paths` |
| Auditor | Reporter | `scorecard_snapshot` (metrics, scores, timestamp) |
| Orchestrator | External API | `telemetry_payload` (adoption metrics, improvement trends) + `system_delivery_ticket` (P1 gaps only) |

## System Delivery Ticket Workflow

When the Auditor identifies a **P1 System Gap** (critical gap in HPEDS capabilities required by consuming teams), the Orchestrator automatically creates a **System Delivery Ticket** in the HPEDS roadmap system.

### Ticket creation trigger
A System Delivery Suggestion is escalated to P1 (and triggers a ticket) when:
- Multiple teams (2+) report the same gap independently, OR
- A single team flags it as blocking critical feature delivery, AND
- No existing or planned HPEDS offering addresses the gap.

### Ticket destination
- **Default:** GitHub Issues in the HPEDS repository (`/hpe-design-system/issues`)
- **Override:** Specify `system_delivery_ticket_endpoint` in `.hpedsrc` to route to external tracking (Jira, Azure DevOps, etc.)

### Ticket structure
```json
{
  "title": "System Delivery Gap: [Gap name] (P1)",
  "body": "Reported by [N] team(s): [Team A], [Team B]\n\nGap description: [evidence from audits]\n\nConsumer impact: [how many teams affected]\n\nProposed solution: [Strategist recommendation]",
  "labels": ["system-gap", "p1", "design-token" | "component" | "pattern"],
  "assignee": "@hpeds-team"
}
```

### Ticket lifecycle
1. **Created** by Orchestrator (read-only; consumers cannot edit)
2. **Triaged** by HPEDS team (estimated effort, impact, roadmap milestone assigned)
3. **Planned** in HPEDS sprint (linked to design + engineering tasks)
4. **Shipped** in HPEDS release (consumers notified via changelog)
5. **Verified** by Reporter (monitors if gap remediation improved downstream scores)

## Privacy & Data Collection

### What telemetry is collected
The Reporter collects:
- **Scorecard metrics:** Individual metric scores (0.0–1.0), status (Pass/Warning/Fail), and timestamps
- **Evidence citations:** File paths, line ranges, and component references (NO source code contents)
- **Team feedback:** Aggregated Likert responses + feedback comments (anonymized by default)
- **Improvement deltas:** Score changes over time (e.g., 0.45 → 0.75)
- **System gaps:** P1/P2/P3 counts and categories

### What is NOT collected
- Source code or implementation details
- Company/team identifiers (unless explicitly opted-in for trend analysis)
- Personal developer names or commit history
- Proprietary business logic or secrets

### Opt-out and privacy controls
Teams can disable telemetry collection by setting in `.hpedsrc`:
```json
{
  "telemetry_enabled": false
}
```

When disabled:
- Reporter does not POST to `telemetry_endpoint`
- Local audit scores are still computed and displayed
- System Delivery Tickets for P1 gaps are still created (essential for HPEDS roadmap)

### Data retention
Telemetry is retained for 12 months rolling window, then anonymized and aggregated into quarterly trends. Teams can request deletion of their telemetry data by contacting the HPEDS team.

### Responsible use commitment
The HPE Design System team uses telemetry solely to:
- Prioritize HPEDS roadmap (gaps, patterns, component needs)
- Measure system adoption and ROI
- Identify and resolve friction points in developer workflow

Telemetry is not used for individual developer performance metrics or organizational surveillance.

### Enterprise benefits
- **Asynchronous audits:** Teams can run the Auditor in their PRs without ever running the Engineer (passive monitoring mode). Useful for visibility without mandatory remediation.
- **Modular skills:** If we decide to support a new framework (e.g., Svelte), we only need to update the `skills.md` for the **Auditor** and **Engineer**. The Orchestrator, Strategist, and Reporter logic remains exactly the same.
- **Traceability:** Every code change made by the Engineer is linked back to a specific metric violation found by the Auditor, with evidence citations (file path, line range, matched knowledge artifact).
- **System-level feedback loop:** Reporter collects adoption and friction signals from 50+ teams, enabling the HPE Design System team to prioritize gaps (P1 tickets) and deprecations.

## Troubleshooting

### "Knowledge sync failed" error
**Symptom:** Auditor reports "Could not fetch latest knowledge/components."

**Cause:** Orchestrator cannot reach the knowledge repository (network issue or endpoint stale).

**Resolution:**
1. Check network connectivity: `curl https://knowledge-endpoint.hpe-ds.io/health`
2. Clear local knowledge cache: `rm -rf ~/.hpe-ds-cache/`
3. Re-run audit: `hpe-ds-ai audit` (cache will rebuild)
4. If issue persists, file an issue on HPEDS GitHub with your `.hpedsrc` and network logs.

### Score regression after fix
**Symptom:** Engineer applied a fix (e.g., replaced hex with token), but re-audit shows lower score.

**Cause:** Fix may have introduced new violations (e.g., incorrect token usage, broken layout) or affected other metrics.

**Resolution:**
1. Review the Verification Phase report; Auditor explains which metrics regressed and why
2. Engineer can propose alternative fixes: `hpe-ds-ai audit --suggest-alternatives`
3. User can undo the last fix and try a different approach: `hpe-ds-ai undo`
4. Engage with HPEDS support if the fix is correct but Auditor is mis-scoring

### Low initial audit score (< 0.50)
**Symptom:** First audit shows very low Consumer Alignment Score; team is discouraged.

**Expectation:** Low scores on initial audit are normal for legacy codebases. HPEDS system is incremental.

**Guidance:**
1. Scores are **not** a reflection of code quality; they measure DS alignment only
2. Focus on top 3 Consumer recommendations (highest impact/effort ratio)
3. Expect 10-20 point score improvement per quarter with consistent remediation
4. Review the "System Discoverability" and "Developer Experience" scores; high DX = faster remediation

### Framework not detected
**Symptom:** "Could not detect framework. Please specify in `.hpedsrc`."

**Cause:** `package.json` is ambiguous (e.g., repo has both React and Vue dependencies) or is missing.

**Resolution:**
1. Explicitly set `framework` in `.hpedsrc`: `{"framework": "react"}`
2. For monorepos with mixed frameworks, create `.hpedsrc` in the specific workspace folder and re-run audit with `--scope` flag

### Stale knowledge artifacts
**Symptom:** Auditor flags a component as "missing" but it exists in HPEDS v3.5.

**Cause:** Local knowledge cache is stale (not synced with latest HPEDS release).

**Resolution:**
1. Clear cache: `hpe-ds-ai cache clear`
2. Verify `.hpedsrc` specifies the correct HPEDS version: `{"hpeds_version": "3.5.0"}`
3. Re-run audit to download latest knowledge
4. If issue persists, file an issue with the exact component name and version

### "Insufficient evidence for metric X"
**Symptom:** Metric is marked N/A; cannot improve score for this area.

**Cause:** Audit scope does not include observable evidence (e.g., no tests for Dev Confidence, no interactive UI for Accessibility).

**Resolution:**
1. Expand audit scope: `hpe-ds-ai audit --scope src/` (include more files)
2. For Page/Feature scope, ensure the audited feature includes the relevant code areas (pages, components, tests)
3. Review "Observability rubric" in auditor instructions for minimum evidence per metric

### Team feedback not collected
**Symptom:** Developer Experience score shows "(code evidence only)" despite `feedback_collection: true`.

**Cause:** No feedback responses were sufficient (need min. 2 responses for valid signal).

**Resolution:**
1. Ensure CLI prompt is shown: run `hpe-ds-ai audit --feedback` to force feedback collection
2. Ensure at least 2 team members answer feedback questions (1-5 Likert scale)
3. Feedback is best collected in your latest audit window (< 1 sprint old)


