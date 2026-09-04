# Stepper follow-up items

## Inferred fields — verify before merging

- `description` was authored from the Grommet Stepper API because the existing Stepper MDX page is empty; verify the wording against approved HPE guidance.
- `usage.whenToUse` was inferred from the Stepper workflow API; verify the scenarios against the intended HPE use cases.
- `anatomy` was inferred from the Grommet Stepper implementation; verify the regions, requiredness, and substep behavior against the Figma design and Grommet source.
- `dosAndDonts` was inferred because no legacy documentation exists; verify the guidance against HPE content standards before publishing.
- `behaviors` was inferred from the Stepper runtime, indicator state mapping, keyboard handlers, and horizontal/vertical layout styles; verify the state taxonomy and interaction guidance against HPE requirements.
- `contentGuidelines` was inferred from the Stepper data model and supplied workflow scenarios; verify the writing guidance against HPE content standards.
- `accessibility` was inferred from the Stepper DOM structure, focus behavior, keyboard handlers, and ARIA attributes in the installed Grommet source; verify keyboard expectations and screen-reader behavior with accessibility review.

## Props scope — verify before merging

- The YAML includes the explicit public `StepperProps` members only.
- The installed type extends `Omit<React.HTMLAttributes<HTMLOListElement>, 'children'>`; inherited HTML, ARIA, and DOM event members are intentionally excluded from this first definition and should be reviewed before treating the prop list as complete.

## Example references

- The generated playground, use-case examples, and label-clarity previews are
  linked through `examples[].codeFile` in `stepper.yaml`.
- Add future Stepper examples to the YAML when they are created.
