## Master Sequence Diagram
This is the blueprint for how the CLI package executes. It visualizes the "handshake" between the agents, ensuring that no code is changed without being measured, and no problem is identified without being prioritized.

### 1. Initiation Phase
- **User/CI:** Executes `hpeds-ai audit --fix`.
- **Orchestrator:** Loads `.hpedsrc` config and fetches the latest `knowledge/` (Tokens, Components, Patterns).
- **Orchestrator → Auditor:** Sends the file path and DS knowledge. "*Analyze this*."

### 2. Analysis Phase
- **Auditor:** Performs AST parsing and Regex scans.
- **Auditor → Orchestrator:** Returns a structured JSON report (The Evaluation Metric Scorecard).
- **Orchestrator → Strategist:** Sends the Scorecard. "*What should we do first?*"

### 3. Strategy Phase
- **Strategist:** Runs the $Impact/Effort$ matrix.
- **Strategist → Orchestrator:** Returns the "Game Plan" (batched remediation tasks).
- **Orchestrator → User:** Displays the Scorecard and the proposed fixes.
- **User:** Input `[Y]` to approve the top 3 critical fixes.

### 4. Remediation Phase
- **Orchestrator → Engineer:** Sends the specific files and approved tasks. "*Fix these 3 items.*"
- **Engineer:** Generates code diffs, ensuring A11y and Token compliance.
- **Engineer → User:** Displays the `diff` for review.
- **User:** Input `[Y]` to write changes to disk.

### 5. Verification Phase
- **Orchestrator → Auditor:** Sends the newly modified code. "*Verify the improvement.*"
- **Auditor:** Re-scores the evaluation metrics.
- **Orchestrator → User:** Displays the improvement delta (e.g., "Score: 0.45 → 0.72").

### 6. External Reporting
- **Orchestrator:** If a "System Gap" was found, it generates the **System Delivery Ticket**.
- **Orchestrator:** Sends telemetry to your organization's central dashboard.


## Agent-to-Agent data flow

| From | To | Data Packet |
| --- | --- | --- |
| Auditor | Strategist | `raw_findings[]` + `alignment_score` |
| Strategist | Engineer | `remediation_tasks[]` + `priority_level` |
| Engineer | Auditor | `modified_code_snippets[]` |
| Orchestrator | External API | `telemetry_payload` + `system_delivery_ticket` |


## Enterprise benefits
- **Asynchronous audits:** Teams can run the Auditor in their PRs without ever running the Engineer (passive monitoring).
- **Modular skills:** If we decide to support a new framework (e.g., Vue), we only need to update the `skills.md` for the **Auditor** and **Engineer**. The Orchestrator and Strategist logic remains exactly the same.
- **Traceability:** Every code change made by the AI is linked back to a specific metric violation found by the Auditor.

## Agents directories, file roles & responsibilities

| File | Audience | Purpose |
| --- | --- | --- |
| agent.md | Orchestrator/CLI | Registration: Tells the system the agent exists, what it does, and what tools it owns. |
| instructions.md | LLM | Persona & Logic: The "SOP" for how the agent should think and behave. |
| skills.md | LLM | Manifest: A detailed description of the technical functions the agent can call. |
