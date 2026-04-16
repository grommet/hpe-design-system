# TODO: Accordion

Reviewed against `accordion.mdx.bak` on April 16, 2026.

## Missing visual assets

- Anatomy diagram image not yet created. The `## Anatomy` section contains
  a placeholder comment: `{/* TODO: Insert anatomy diagram image here */}`

## Dos and Don'ts

All `<BestPracticeGroup>` blocks contain placeholder `{/* TODO: ... */}` 
comments. Coded preview examples need to be created for each pair:
- Accordion with single panel open (do) vs all panels forced open (don't)
- Accordion with descriptive labels (do) vs vague labels (don't)

## Props not yet documented

The original `accordion.mdx.bak` did not document all Grommet Accordion
props. The following exist in the Grommet API and were not captured in
the YAML:
- `animate` (boolean) — already included
- `activeIndex` (number | number[]) — already included
- `onActive` — already included

No significant Grommet props appear to be missing from the YAML based on
the existing MDX, but a full comparison against the Grommet docs
(https://v2.grommet.io/accordion#props) should be done before the PR
is finalized.

## Missing variant examples

- `AccordionPanel` with a custom `header` prop — not yet demonstrated.
