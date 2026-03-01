# Design System Agent Roadmap

## Purpose
This roadmap sequences delivery of the HPE Design System agent capabilities described in DOCUMENTATION.md. It structures delivery around proof of concept, MVP, and enhancement phases with explicit validation from consuming product teams at each stage.

## Guiding principles
- Prioritize Consumer Implementation quality while unlocking System Enablement signals.
- Default to incremental rollout with measurable score deltas.
- Maintain human approval gates for all code changes.
- Keep telemetry privacy-preserving and opt-out capable.
- Validate with real product teams at each phase gate before advancing.

## Product team segmentation
Teams fall into six adoption patterns (from deepest to zero HPEDS adoption):

| Segment | Framework | UI Library | HPEDS Tokens | HPEDS Theme | % of Teams |
| --- | --- | --- | --- | --- | --- |
| A | React | Grommet | (via theme) | `grommet-theme-hpe` | ~40% |
| B | React | Grommet | (via theme) | Custom/none | ~15% |
| C | React | Other | `hpe-design-tokens` | N/A | ~15% |
| D | React | Other | None | N/A | ~10% |
| E | Other | Any | `hpe-design-tokens` | N/A | ~10% |
| F | Other | Any | None | N/A | ~10% |

---

## Phase 1: Proof of Concept (PoC)

### Objective
Validate core Auditor scoring, Strategist prioritization, and Engineer remediation + generation with the most aligned teams (Segment A). Prove the system can measure, prioritize, build, and verify improvements in Grommet-based codebases.

### Target audience
- **Segment A only:** React + Grommet + `grommet-theme-hpe` teams

### Capabilities delivered
- **Auditor:** Score all 11 metrics (Component Coverage, Component Usage, App Structure, Token Compliance, Responsive Layouts, Accessibility, Type Safety & Interfaces, Dev Confidence, System Discoverability, Developer Experience, Agent Experience) with Directory and Page/Feature scopes
- **Strategist:** Classify findings into Consumer vs. System improvements; rank top 3 Consumer recommendations
- **Engineer:** Grommet-only remediation and generation (text prompt, Figma JSON, PRD) for Segment A teams; generate diffs with approval gates
- **Orchestrator:** `.hpedsrc` discovery, framework detection (React only), knowledge loading
- **Reporter:** Basic telemetry payload (scores, timestamps, evidence counts) with opt-out

### Not in scope
- Engineer remediation or generation for non-Grommet codebases
- Pattern audit scope
- Non-React frameworks
- System Delivery Ticket automation (manual triage)

### Validation with product teams
- **Pilot teams:** 3-5 Segment A teams with varying maturity (mature HPEDS adoption, mid-adoption, early adoption)
- **Activities:**
  1. Run baseline audits; collect Consumer and System scores
  2. Review top 3 Consumer recommendations for accuracy (false positives?)
  3. Test Engineer remediation for Token Compliance and Component Usage fixes (Grommet-specific); validate diffs before apply
  4. Test Engineer generation from text prompt or Figma JSON for a small feature area; validate diffs before apply
  5. Optionally re-audit to verify score improvement after Engineer fixes (Verification Phase)
  6. Collect qualitative feedback on metric definitions, prioritization logic, Engineer-generated diffs, and DX
- **Success criteria:**
  - 80%+ of top 3 recommendations are actionable and accurate
  - 70%+ of Engineer-proposed fixes are accepted without modification (Grommet-only scope)
  - 70%+ of generated features are accepted with minimal edits (Grommet-only scope)
  - Median score improvement of 10+ points after applying Engineer fixes
  - No false-positive Component Coverage or Token Compliance violations
  - No scoring regressions after Engineer fixes (Verification Phase passes)
  - Teams report "clear next steps" from Strategist output and "understandable diffs" from Engineer

### Exit criteria
- PoC validated with 3+ pilot teams
- Auditor scoring logic stable for Segment A (no major revisions needed)
- Strategist prioritization aligns with team expectations (Impact/Effort matrix validated)
- Engineer remediation and generation stable for Grommet codebases (Token Compliance and Component Usage fixes)

### Implementation plan
See [PoC-IMPLEMENTATION.md](PoC-IMPLEMENTATION.md) for detailed workstreams (5 workstreams: Orchestrator, Remediation, Generation, Strategist, Reporter/CLI), dependencies, milestones, and risk mitigations (estimated 4-6 weeks).

---

## Phase 2: Minimum Viable Product (MVP)

### Objective
Expand to React teams with varying HPEDS adoption (Segments A-D). Extend Engineer remediation and generation beyond Grommet to all React codebases. Automate System Delivery Ticket creation for P1 gaps. Enable passive monitoring in CI/PR workflows.

### Target audience
- **Segments A-D:** All React teams (Grommet + theme, Grommet only, other UI + tokens, other UI + no HPEDS)

### Capabilities delivered
- **Auditor:** Add Pattern audit scope; refine N/A handling for Segments C-D (lower Component Coverage/Usage observability)
- **Strategist:** Add P1/P2/P3 System Delivery Suggestion severity
- **Engineer:** Expand remediation and generation beyond Grommet to support non-Grommet React codebases (Segments C-D); continue Token Compliance and Component Usage fixes with approval gates
- **Orchestrator:** Add audit diffing and score delta summaries; default to a targeted post-generation audit; support CI/PR passive mode (audit-only, no fixes)
- **Reporter:** Monthly telemetry insights dashboard; System Delivery Ticket auto-creation for P1 gaps

### Segment-specific adjustments
- **Segment A (React + Grommet + theme):** Full metric scoring; high Component Coverage/Usage expectations; Engineer remediates and generates using Grommet
- **Segment B (React + Grommet, no theme):** Down-weight Token Compliance if theme is unavailable; flag as System gap; Engineer remediates Component Usage, available token fixes, and generates using Grommet
- **Segment C (React + other UI + tokens):** Mark Component Coverage/Usage as N/A (no Grommet); focus on Token Compliance, Accessibility, Type Safety; Engineer remediates and generates Token Compliance only
- **Segment D (React + other UI, no HPEDS):** Mark Component Coverage/Usage and Token Compliance as N/A; focus on App Structure, Accessibility, DX; Engineer not invoked (no automated remediation or generation); flag high-priority System gaps for pattern/component needs

### Validation with product teams
- **Pilot teams:** 8-12 teams (3 from Segment A, 3 from B, 3 from C, 3 from D)
- **Activities:**
  1. Run audits across segments; verify N/A logic and scoring accuracy per segment
  2. Test Engineer remediation on Segments A-B (Token Compliance + Component Usage) and Segment C (Token Compliance only); validate diffs before apply
  3. Test Engineer generation on Segments A-B (Grommet) and Segment C (token-first); validate diffs before apply
  4. Collect System Delivery Suggestions from Segments C-D; verify P1 gaps are actionable HPEDS roadmap inputs
  5. Run passive audits in 2-3 team CI pipelines; validate no false failures or noise
- **Success criteria:**
  - 75%+ of Engineer-proposed fixes are accepted without modification (across Segments A-C)
  - 70%+ of generated features are accepted with minimal edits (across Segments A-C)
  - No scoring regressions after Engineer fixes (Verification Phase passes)
  - System Delivery Tickets from Segments C-D result in 2+ roadmap discussions with HPEDS team
  - CI passive mode runs without blocking PRs; scores are informational only

### Exit criteria
- MVP validated with 8+ pilot teams across Segments A-D
- Engineer remediation and generation stable for Token Compliance across all React codebases and Component Usage for Grommet codebases
- Reporter telemetry insights used in at least one HPEDS sprint planning session
- No P0 bugs or scoring accuracy issues reported in validation

---

## Phase 3: Enhancements

### Objective
Expand to non-React frameworks (Segments E-F). Add advanced features like pattern gap analytics, continuous improvement loop automation, and multi-framework CI integration.

### Target audience
- **Segments E-F:** Non-React teams (Vue, Angular, Svelte, other frameworks)
- **All segments:** Teams ready for advanced automation (feedback loop, sprint cadence)

### Capabilities delivered
- **Auditor:** Add Vue and Angular framework skills; partial Svelte support (scoring only)
- **Engineer:** Add Vue and Angular remediation and generation skills; generate framework-specific code diffs
- **Strategist:** Add pattern gap analytics (detect repeated custom solutions that could be patterns)
- **Orchestrator:** Add continuous improvement loop with sprint cadence (auto-schedule re-audits, track score trends, notify on regressions); keep targeted post-generation audit enabled by default
- **Reporter:** Add pattern adoption heatmaps and framework-specific friction analysis

### Segment-specific adjustments
- **Segment E (Other framework + tokens):** Same as Segment C logic (focus on Token Compliance, Accessibility, Type Safety); load framework-specific skills
- **Segment F (Other framework, no HPEDS):** Same as Segment D logic (App Structure, Accessibility, DX only); flag System gaps for multi-framework support

### Validation with product teams
- **Pilot teams:** 6-10 teams (3 from Segment E, 3 from F, 4 from A-D for continuous loop testing)
- **Activities:**
  1. Test Vue and Angular audits with Segment E teams; verify scoring parity with React
  2. Test Engineer remediation for Vue/Angular (Token Compliance fixes); validate framework-specific diffs
  3. Run continuous improvement loop with 4 Segment A-D teams over 2 sprints; track automated re-audits and score trends
  4. Collect pattern gap suggestions from Segments D-F; validate against HPEDS roadmap discussions
- **Success criteria:**
  - Vue/Angular scoring accuracy matches React baseline (80%+ actionable recommendations)
  - Framework-specific Engineer diffs (remediation and generation) are syntactically correct and pass team reviews
  - Continuous loop reduces manual re-audit overhead by 50%+
  - Pattern gap analytics surface 3+ new pattern proposals for HPEDS roadmap

### Exit criteria
- Enhancements validated with 6+ pilot teams across Segments E-F
- Vue and Angular support stable for Auditor and Engineer
- Continuous improvement loop adopted by 5+ teams
- HPEDS roadmap includes 2+ pattern proposals from agent telemetry

---

## Risks and mitigations

| Risk | Mitigation |
| --- | --- | --- |
| Inaccurate metrics on unsupported frameworks | Enforce fallback warnings, clear N/A logic, and framework-specific skill loading |
| Telemetry sensitivity and privacy concerns | Maintain opt-out, anonymization, 12-month retention, and responsible use commitment |
| Remediation regressions (Engineer breaks code) | Require Verification Phase gating, rollback options (`hpe-ds-ai undo`), and human approval for all diffs |
| Low adoption in Segments D-F (no HPEDS baseline) | Focus on System Discoverability and DX metrics; position as "readiness assessment" vs. "compliance check" |
| System Delivery Tickets overwhelm HPEDS team | Implement P1-only auto-ticketing; P2/P3 require manual triage; batch similar gaps |

---

## Success metrics

### PoC (Segment A only)
- 3+ pilot teams complete validation
- 80%+ recommendation accuracy
- 70%+ Engineer fix acceptance rate (Grommet-only)
- 70%+ Engineer generation acceptance rate (Grommet-only)
- 10+ point median score improvement after applying Engineer fixes
- No scoring regressions after remediation

### MVP (Segments A-D)
- 8+ pilot teams across segments complete validation
- 75%+ Engineer fix acceptance rate
- 70%+ Engineer generation acceptance rate
- 2+ System Delivery Tickets inform HPEDS roadmap discussions
- 20% median Consumer score improvement within 1 quarter of adoption

### Enhancements (Segments E-F + advanced features)
- 6+ pilot teams complete validation
- Vue/Angular scoring parity with React
- 5+ teams adopt continuous improvement loop
- 30% reduction in hardcoded tokens in audited projects (all segments)
- 2x reduction in time-to-remediate top 3 audit findings (all segments)

---

## References
- [DOCUMENTATION.md](DOCUMENTATION.md) — Full architecture and agent specifications
- [prompts/auditor/instructions.md](prompts/auditor/instructions.md) — Auditor scoring logic and metric definitions
