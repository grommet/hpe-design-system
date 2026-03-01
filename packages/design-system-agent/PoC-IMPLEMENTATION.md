# PoC Implementation Plan

## Overview
This document details the phased delivery of the PoC, organized into five workstreams with explicit dependencies, milestones, and effort estimates. Total estimated effort: **4-6 weeks** for a minimal PoC with 3-5 pilot teams.

## Workstreams

### Workstream 1: Core Orchestration
**Objective:** Implement the Orchestrator agent with `.hpedsrc` discovery, framework detection, knowledge loading, and loop state management.

**Deliverables:**
- `orchestrator/agent.md` — Role definition, input/output contract, error handling
- `orchestrator/instructions.md` — Detailed state machine (idle → audit → strategize → engineer → report → idle); .hpedsrc discovery and loading; loop control logic
- `.hpedsrc.example` — Template configuration file for Segment A teams

**Dependencies:** None (critical path start)

**Estimated effort:** 1.5 weeks

**Milestones:**
- Week 1: State machine and .hpedsrc discovery logic finalized
- Week 1.5: Orchestrator integration tested with Auditor; dry-run with pilot team repo

**Exit gate:** Orchestrator loads Segment A config, invokes Auditor, and routes Auditor output to Strategist without manual intervention.

---

### Workstream 2: Engineer Remediation Skills (Grommet)
**Objective:** Complete Engineer agent with Grommet-specific remediation rules, diff generation, and rollback logic for Token Compliance and Component Usage fixes.

**Deliverables:**
- `engineer/skills.md` — AST rules for Token Compliance fixes (replace hardcoded colors/sizes with token variables); Component Usage fixes (replace invalid Grommet props, upgrade deprecated components); diff generation format
- `engineer/remediation-templates/` — Grommet-specific code transformations (codemod scripts, template fragments for common patterns)
- Rollback support in `engineer/instructions.md` — `hpe-ds-ai undo` command logic

**Dependencies:** Workstream 1 (Orchestrator must route Engineer requests)

**Estimated effort:** 2 weeks

**Milestones:**
- Week 2: AST rules for Token Compliance and Component Usage defined; 5 test cases per rule passing
- Week 3: Remediation templates and diff generation working; rollback tested

**Exit gate:** Engineer generates syntactically correct diffs for 8+ Token Compliance and 5+ Component Usage test cases; 90%+ pass existing test suite.

---

### Workstream 3: Engineer Generation Skills (Text Prompt)
**Objective:** Extend Engineer agent to support greenfield generation from text prompts (e.g., "Create a login form using Grommet and `grommet-theme-hpe` tokens") with optional post-generation audit.

**Deliverables:**
- `engineer/instructions.md` (generation section) — Prompt parsing, pattern/component selection, template rendering, code assembly
- Generation examples and docs (2-3 example prompts with expected outputs)
- Configuration flag for optional post-generation audit (`post_generation_audit: true/false` in `.hpedsrc`)

**Dependencies:** Workstream 2 (Engineer remediation framework), Workstream 1 (Orchestrator for config)

**Estimated effort:** 1.5 weeks

**Milestones:**
- Week 3.5: Prompt parsing and pattern selection working
- Week 4: Template rendering and assembly generating valid React + Grommet code

**Exit gate:** 5 text prompts generate compilable, testable React components using Grommet + `grommet-theme-hpe`.

---

### Workstream 4: Strategist Prioritization
**Objective:** Implement Strategist agent to classify findings as Consumer vs. System improvements and rank top 3 recommendations using Impact/Effort matrix.

**Deliverables:**
- `strategist/instructions.md` — Impact/Effort matrix algorithm; Consumer vs. System categorization rules; top 3 selection logic
- `strategist/agent.md` — Role definition, input/output contract (Auditor scorecard → prioritized recommendations)

**Dependencies:** Workstream 1 (Orchestrator must route Strategist requests)

**Estimated effort:** 1 week

**Milestones:**
- Week 4: Impact/Effort matrix algorithm and 10 test cases finalized
- Week 4.5: Consumer vs. System categorization aligned with Auditor metric definitions

**Exit gate:** Strategist consistently ranks top 3 Consumer recommendations; 80%+ of ranked items are actionable per pilot team feedback.

---

### Workstream 5: Reporter & CLI
**Objective:** Implement Reporter agent to collect and emit telemetry, and build CLI with audit, generate, and undo commands.

**Deliverables:**
- `reporter/instructions.md` — Telemetry payload JSON schema; P1 ticket logic (triggered by 2+ teams reporting same gap); privacy checklist (no source code, opt-out honor)
- `bin/hpeds-ai.ts` — CLI commands: `audit` (run Auditor + Strategist), `gen` (run Engineer generation), `undo` (rollback Engineer changes); approval gate prompts
- Telemetry transport (console logging for PoC; future: HTTP POST to telemetry service)

**Dependencies:** Workstreams 1-4 (Reporter collects data from all agents; CLI invokes Orchestrator)

**Estimated effort:** 1.5 weeks

**Milestones:**
- Week 4.5: Telemetry payload and P1 logic finalized; privacy review signed
- Week 5: CLI commands working with approval gates; local logging tested

**Exit gate:** CLI `audit` and `gen` commands complete end-to-end flow; telemetry payload is valid JSON; `undo` restores previous file state.

---

## Dependencies & sequencing

```
Week 1: [WS1: Orchestrator] - parallelizable with knowledge base review
Week 2: [WS2: Engineer Remediation] - blocked on WS1
        [WS3 prep: Gen design] - can start independently
Week 3: [WS2 continued]
        [WS3: Engineer Generation] - blocked on WS2
        [WS4: Strategist] - blocked on WS1
Week 4: [WS3 continued]
        [WS4 continued]
        [WS5 prep: Telemetry design] - can start independently
Week 4.5: [WS4 complete]
         [WS5: Reporter & CLI] - blocked on WS1-4
Week 5: [WS5 continued]
        [Integration & PoC dry-run]
Week 5.5: [Pilot validation window opens]
```

**Critical path:** Orchestrator (WS1) → Engineer Remediation (WS2) → Engineer Generation (WS3); total 4.5 weeks.

**Parallel opportunities:**
- WS3 design can begin during WS2 implementation
- WS4 and WS5 design can overlap with WS2-3 development
- Knowledge base review (components, patterns, tokens) should happen concurrent with WS1

## Milestones

| Milestone | Target Date | Gate Criteria |
| --- | --- | --- |
| Orchestrator stable | End of Week 1 | Dry-run with pilot team repo succeeds |
| Engineer remediation complete | End of Week 2.5 | 8+ Token Compliance + 5+ Component Usage test cases pass |
| Engineer generation complete | End of Week 3.5 | 5 text prompts generate valid Grommet code |
| Strategist complete | End of Week 4 | 80%+ of top 3 recommendations accurate per pilot feedback |
| Reporter & CLI complete | End of Week 5 | End-to-end flow from `hpe-ds-ai audit` to telemetry works |
| PoC dry-run | End of Week 5.5 | All 5 workstreams integrated; no blocking issues found |
| Pilot validation begins | Week 6 | 3-5 Segment A teams onboarded; provide feedback on recommendations and Engineer diffs |

## Success criteria for PoC implementation

1. **All 5 workstreams deployed** — No critical features removed due to scope creep
2. **No blocking bugs** — PoC can complete end-to-end flow (audit → strategize → engineer → report) with human approval gates intact
3. **Auditor accuracy validated** — 80%+ of top 3 recommendations are actionable (per pilot teams)
4. **Engineer quality validated** — 70%+ of remediation diffs and 70%+ of generated code accepted without modification
5. **Orchestrator stability** — `.hpedsrc` discovery works for 3+ Segment A team configurations; no framework mismatch errors
6. **Telemetry privacy compliance** — No source code in payloads; opt-out honored; privacy audit passed
7. **CLI usability** — Teams can run `hpe-ds-ai audit`, `hpe-ds-ai gen`, and `hpe-ds-ai undo` without support calls

## Risk mitigations

| Risk | Mitigation |
| --- | --- |
| Orchestrator design time overruns | Begin dry-run at Week 1.5; iterate on feedback vs. waiting for perfection |
| Grommet remediation hard to rule-ify (edge cases) | Focus on 2 metrics (Token Compliance, Component Usage) in PoC; refine rules during pilot validation |
| Engineer generation produces compilation errors | Add Grommet + TypeScript linter to generation pipeline; generate only common patterns (login form, data table) in PoC |
| Strategist Impact/Effort breaks down on real data | Use 10 real audit results from knowledge base as test cases; iterate matrix during Week 4.5 |
| Pilot teams don't have time for validation | Provide automated test scripts; minimize manual PR review overhead; offer async feedback collection |

---

## References
- [ROADMAP.md](ROADMAP.md) — Phase definitions and schedule
- [DOCUMENTATION.md](DOCUMENTATION.md) — System architecture
