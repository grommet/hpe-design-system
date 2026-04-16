# DEPRECATED: Accordion

Content review against `accordion.mdx.bak` on April 16, 2026.

## Removed sections

| Original section | Reason removed | Where content landed |
|---|---|---|
| `## Guidance` | Section heading not part of the new template structure | Content redistributed — see below |
| `### About accordion` (under Guidance) | Unstructured prose replaced by structured Use Cases and Behaviors | Redistibuted to Use Cases and Behaviors sections |

## Redistributed prose

### Original "Guidance" intro

> "When seeking to provide maximum content in limited, vertical space,
> an accordion is a good choice."

→ Captured in `### Reducing page length without sacrificing content access`
use case description.

> "Accordions help organize information, which helps the user consume the
> information they need at a faster pace."

→ Captured in `### Organizing reference content into named sections` use
case description.

### Original "About accordion" bullets

| Original content | Where it landed |
|---|---|
| "Accordion has two states: Collapsed / Expanded" | `## Behaviors and States → Application states` |
| "The chevron icon is used to identify the expand or collapse action" | `## Anatomy → Panel header` and `Chevron icon` rows |
| "The default behavior is for all of the panels to be closed" | `## Variants → Default` description |
| "The accordion labels should be kept short and to the point" | `## Content Guidelines` bullet 1 |

### Original "Accessibility" prose

> "Buttons are used for the accordion panels which makes them accessible
> by screen readers and keyboard."
> "Having a very descriptive heading label helps so the user gets to the
> content section they are interested in faster."
> "To help with readability, accordions should only have one panel open
> at a time."

→ Preserved verbatim in the `## Accessibility` section of the new MDX,
condensed to two paragraphs.

## Content not migrated

- The original `### WCAG compliance` subheading and `<AccessibilitySection>`
  call were preserved exactly. No content was lost.
