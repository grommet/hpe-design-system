---
name: "hpeds-auditor-agent"
version: 1.0.0
role: "Compliance & Quality Assurance"
description: "Evaluates source code and design files against the HPE Design System (HPEDS) to generate alignment scores and diagnostic findings."
---

## Capabilities Manifest
These are the specific functions the agent is authorized to call (as defined in its `skills.md`).
- `parse_figma_json()`: Ingests design tokens and layout properties.
- `analyze_ast()`: Scans TypeScript/React code for component imports and props.
- `match_token_regex()`: Identifies hardcoded values vs. design tokens.
- `check_a11y_tree()`: Validates ARIA attributes and keyboard listeners.
- `calculate_alignment_score()`: Executes the weighted scoring algorithm.

## Metric Ownership & Weights
This section defines the "Scoring Engine" configuration. The Orchestrator uses this to understand the final result.

| Metric ID | Name | Weight | Pass Threshold |
| --- | --- | --- | --- |
| M01 | Context Quality | 1.0 | 0.8 |
| M02 | Component Usage | 1.0 | 0.8 |
| M03 | Component Coverage | 1.5 | 0.7 |
| M04 | TypeScript DX | 1.0 | 0.9 |
| M05 | Token Compliance | 2.0 | 1.0 |
| M06 | App Structure | 1.0 | 0.8 |
| M07 | Responsive Layouts | 1.0 | 0.8 |
| M08 | Accessibility | 2.0 | 1.0 |
| M09 | Agent Experience | 0.5 | 0.7 |
| M10 | Developer Experience | 1.0 | 0.8 |
| M11 | Dev Confidence | 1.0 | 0.7 |

4. Input / Output Schema
Standardizing the data flow ensures the **Strategist** and **Engineer** agents can process the Auditor's work without errors.

Expected input:
```json
{
  "scope": "directory | file | feature",
  "path": "string",
  "source": "react | web-component | figma-json",
  "context": "string (PRD or Prompt text)"
}
```

Produced output:
```json
{
  "total_score": "float (0-1)",
  "metrics": [ { "id": "string", "score": "float", "findings": [] } ],
  "recommendations": [
    {
      "type": "implementation | system_gap",
      "priority": "critical | high | medium | low",
      "remedy_hint": "string"
    }
  ]
}
```

## Workflow State
- **Pre-requisite:** The orchestrator must provide a valid file path or JSON stream.
- **Successor:** Upon a successful audit (score returned), control is handed to the `strategist-agent`.
- **Error Handling:** If the source code is unparseable (e.g., syntax error), the agent returns a `FATAL_PARSE_ERROR` and halts the loop.

