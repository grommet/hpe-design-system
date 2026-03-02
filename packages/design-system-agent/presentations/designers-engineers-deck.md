---
marp: true
paginate: true
# backgroundColor: "lightgrey"
# backgroundImage: "linear-gradient(to bottom, #67b8e3, #0288d1)"
---

# HPE Design System Agent
## Designers + Engineers Kickoff

March 1, 2026

---

# Why this project exists

- UX alignment is hard to scale across 50+ teams
- Design system knowledge is deep, but hard to apply consistently
- We need measurable, repeatable UX compliance and improvement

---

# What this delivers

- **Audits** of design system alignment
- **Prioritized recommendations** for the top fixes
- **Remediation + generation** of HPE Design System aligned code
- **Human approval gates** before any change is applied

---

# System overview

```mermaid
flowchart LR
  CLI[hpe-ds-ai CLI] --> O[Orchestrator]
  O --> A[Auditor]
  A --> S[Strategist]
  S --> E[Engineer]
  E --> R[Reporter]
  R --> O
```

---

# Continuous improvement loop

```mermaid
sequenceDiagram
  participant U as User
  participant O as Orchestrator
  participant A as Auditor
  participant S as Strategist
  participant E as Engineer
  participant R as Reporter
  U->>O: run audit/fix/gen
  O->>A: analyze scoped code
  A->>O: scorecard (11 metrics)
  O->>S: prioritize findings
  S->>O: top 3 recommendations
  O->>E: generate diffs
  E->>U: diff + rationale
  U->>O: approve
  O->>A: verify improvements
  O->>R: telemetry summary
```

---

# Scoring dimensions (11)

**Consumer Implementation**
1. Component Coverage
2. Component Usage
3. App Structure
4. Token Compliance
5. Responsive Layouts
6. Accessibility
7. Type Safety & Interfaces
8. Dev Confidence

**Design System Enablement**
9. System Discoverability
10. Developer Experience
11. Agent Experience

---

# What a scorecard looks like (conceptual)

```json
{
  "consumerScore": 0.62,
  "systemScore": 0.48,
  "metrics": {
    "tokenCompliance": "warning",
    "componentUsage": "fail",
    "accessibility": "pass"
  },
  "topFindings": [
    "Hardcoded colors in Button",
    "Non-Grommet table component"
  ]
}
```

---

# Knowledge base (high level)

- **Tokens:** primitive, semantic, component
- **Components:** props, accessibility, examples
- **Patterns:** reusable UI solutions (login form, data table, etc.)

---

# Example knowledge snippet (YAML)

```yaml
name: "button"
props:
  - name: label
    type: string
    required: true
accessibility:
  - role: button
examples:
  - label: "Basic usage"
    code: "<Button primary label=\"Click me\" />"
```

---

# What the PoC includes

- Segment A only: React + Grommet + `grommet-theme-hpe`
- Remediable metrics in PoC: Token Compliance, Component Usage
- Generation inputs: text prompt, Figma JSON, PRD
- Human approval gates for all diffs

---

# What is out of scope (for now)

- Non-React frameworks
- Non-Grommet UI libraries
- Pattern audit scope
- CI/PR passive mode

---

# Roadmap overview

```mermaid
gantt
  title Roadmap Overview
  dateFormat  YYYY-MM-DD
  section PoC (Segment A)
  Core audit + fix + gen :a1, 2026-03-01, 42d
  section MVP (Segments A-D)
  Expand to all React teams :a2, 2026-04-15, 84d
  section Enhancements (Segments E-F)
  Multi-framework + analytics :a3, 2026-07-15, 120d
```

---

# How to think about impact

- Faster UX alignment without manual audits
- Shared language for design system gaps
- Clear, prioritized fixes instead of long checklists

---

# Next steps

- Kick off PoC implementation (Workstream 1)
- Identify 3-5 pilot teams
- Collect feedback, iterate, scale to MVP

---

# Q&A

What should we clarify or adjust before PoC starts?
