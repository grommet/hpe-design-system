---
name: foundation-rules
description: 'Apply HPE Design System foundation rules (color, spacing, layout, design tokens) via the knowledge-agent checklist. Use when building a page, screen, or layout from a reference, mockup, or screenshot; when validating or reviewing a design or an implementation against the design system; when auditing a build for design-system compliance; or when asked why a foundation rule exists. Fetches the id + statement checklist cheaply and one rule in full by id on demand.'
license: Apache-2.0
version: 1.0.0
---

# Foundation Rules

## Overview

The foundations are testable statements with a rationale kept separately. The
CLI projects them as a checklist or one rule in full, so you never read the raw
YAML. Patterns and components are positive examples and the fastest starting
blocks; foundations are the constraints that apply where the examples run out.
Reach for them at decision points and at validation, not as up-front reading.

## When to Use This Skill

- Building a page from a reference, mockup, or screenshot
- Validating or reviewing a design or implementation against the design system
- Explaining why a foundation rule exists

## When to Reach for Foundations

| Moment | Action |
| --- | --- |
| Retrieve | Run `generate -- "<feature>"` once. Use the patterns and components. The checklist arrives as ambient context; skim its four headings so you know which foundations exist. Do not study the lines. |
| Decision point | When writing a pad, gap, margin, color, size, breakpoint, or container value not handed to you by a pattern or component, or placing two patterns together, read only that foundation block. If it does not settle the choice, run `generate -- --rule <id>`. |
| Stuck | When two implementations look plausible and the pattern does not discriminate, find and fetch the one rule that does. |
| Validate | Once, at the end, walk the whole checklist using the workflow below. |
| Repair | Run `generate -- --rule <id>` per failure for rationale and example. |
| Explain | Run `generate -- --rule <id>`. |

Do not read the checklist up front and try to hold 50 constraints while
generating. Generate from patterns, then verify. The few rules worth holding
constantly (tokens not literals, semantic color roles) are already in
coding-guidelines.

## Prerequisites

Run these from the repository root with `pnpm` available:

```bash
pnpm --filter @hpe-design/knowledge-agent generate -- --checklist
pnpm --filter @hpe-design/knowledge-agent generate -- --rule <id>
pnpm --filter @hpe-design/knowledge-agent generate -- "<feature>"
```

Budget roughly 3.5k tokens for the checklist, a few hundred for one rule, several
thousand for feature generation (components, patterns, and instructions), and
roughly 12k for raw YAML as a fallback only.

## Step-by-Step Workflows

### Build a Page from a Reference

1. Run `generate -- "<feature>"` once. Start from the returned pattern templates and component docs; copy their values rather than inventing them. Skim the four checklist headings, but not the lines.
2. Build. At each decision point, read that foundation's checklist block and apply the matching statement. Fetch `--rule <id>` before deciding when the statement is ambiguous.
3. Before finishing, run the Validate workflow once. Do not validate incrementally; it costs the same and misses seams.

### Validate a Design or Build

1. Run `generate -- --checklist`.
2. Grep code first for hex/rgb literals, px values, `style={{ }}`, raw margin, `className`, and `grommet-icons`. Each hit is a candidate failure; map it to the checklist line it violates.
3. Walk the checklist against the artifact. Classify every line pass, fail, not applicable, or cannot determine. Do not skip lines. Inspect Figma via MCP, a screenshot, or code as appropriate.
4. For every fail or cannot-determine, run `generate -- --rule <id>`, then fix it or report it.
5. Report `rule id | result | evidence`. Quote statements verbatim and include rationale only for failures.

### Explain a Rule

1. If you know the id, run `generate -- --rule <id>`. Otherwise run `--checklist` and choose by statement.
2. Answer from statement, rationale, and related links. Name the id so the reader can fetch it again.

## Gotchas

- Never paraphrase a statement; quote it and cite the id.
- Patterns come first. If a pattern or component doc gives the value, use it; foundations cover gaps between and beyond patterns.
- The statement alone is the test. If rationale is needed to decide pass/fail, report that as a knowledge-base gap.
- Token choice rules live in color, spacing, and layout; token tiers and references live in design-tokens. Do not duplicate findings.
- Read `knowledge/core/data/foundations/*.yaml` directly only if the CLI cannot run (no pnpm or outside the monorepo); say so.

## Troubleshooting

- **Unknown rule id:** the error lists valid stable kebab-case ids.
- **No foundation section:** `--rules none` was passed; rerun without it or use `--checklist`.
