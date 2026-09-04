# Stepper follow-up items

## Inferred fields — verify before merging

- `description` was authored from the Grommet Stepper API because the existing Stepper MDX page is empty; verify the wording against approved HPE guidance.
- `usage.whenToUse` was inferred from the Stepper workflow API; verify the scenarios against the intended HPE use cases.
- `anatomy` was inferred from the Grommet Stepper implementation; verify the regions, requiredness, and substep behavior against the Figma design and Grommet source.
- `dosAndDonts` was inferred because no legacy documentation exists; verify the guidance against HPE content standards before publishing.

## Props scope — verify before merging

- The YAML includes the explicit public `StepperProps` members only.
- The installed type extends `Omit<React.HTMLAttributes<HTMLOListElement>, 'children'>`; inherited HTML, ARIA, and DOM event members are intentionally excluded from this first definition and should be reviewed before treating the prop list as complete.

## Missing examples

- `examples` is intentionally empty because no Stepper example files currently exist. Add path-based references after examples are authored.
