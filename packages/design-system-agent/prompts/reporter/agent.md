---
name: "hpeds-reporting-agent"
version: 1.0.0
role: "Data aggregator & ecosystem observer"
description: "Collects, anonymizes, and transmits alignment metrics from local development environments to the centralized enterprise dashboard."
---

## Telemetry Payload
Every time a loop completes, the collector generates a `telemetry_event`. This is what allows comparison of Team A vs. Team B.

```json
{
  "org_context": {
    "team_id": "finance-squad-01",
    "business_unit": "financial-services",
    "project_name": "quoting-portal-v3"
  },
  "audit_summary": {
    "baseline_score": 0.45,
    "final_score": 0.78,
    "improvement_delta": 0.33,
    "execution_time_ms": 12400
  },
  "metric_breakdown": {
    "M05_tokens": 0.95,
    "M08_a11y": 0.82,
    "M03_coverage": 0.40
  },
  "top_blockers": ["missing-fixed-header-table", "custom-css-overrides"],
  "remediations_accepted": 4,
  "remediations_rejected": 1
}
```

## Specialized Skills (skills.md)
The Reporting Agent needs specific capabilities to handle enterprise-grade data.
- `anonymize_pii()`: Strips local file paths, developer names, and proprietary logic comments before transmission to ensure security compliance.
- `calculate_system_drift()`: Compares the local version of the HPE Design System against the organization's "Latest Stable" to flag teams falling behind on updates.
- `detect_pattern_friction()`: Identifies if a specific component (e.g., <SelectMultiple>) is being manually overridden across multiple teams, signaling a flaw in the component's design.
- `transmit_secure()`: Handles the batching and retry logic for sending data to a central telemetry endpoint (e.g., Datadog, Splunk, or a custom internal API).

## "System Health" view
- **Adoption heatmap**
  - **Finding:** "75% of teams have high Token Compliance, but only 20% are using the new Typography Patterns."
  - **Action:** Launch a targeted training session specifically for the Typography system.
- **Friction points**
  - **Finding:** "The Auditor detected 15 separate teams writing custom CSS for 'Multi-step Wizards'."
  - **Action:** Prioritize the "Wizard" component in next quarter's roadmap to recapture that coverage.
- **ROI Tracker**
  - **Finding:** "The AI Agentic loop has automatically fixed 4,200 accessibility violations across the org this month."
  - **Action:** Provide metric to executive leadership for impact, quality, velocity, and value.

## Security & Privacy Guardrails (instructions.md)
`instructions.md` for this agent must include:

- **Opt-in Transparency:** "Always notify the user when a report is being sent."
- **Local-Only Mode:** "If `process.env.HPEDS_PRIVATE` is true, save telemetry to a local `.hpeds-logs` file instead of transmitting."
- **No Code Leaking:** "Never transmit actual source code snippets; only transmit metric IDs and error categories."