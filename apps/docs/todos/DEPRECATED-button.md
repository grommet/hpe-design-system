# DEPRECATED — Button component refactor

Review date: 2026-03-19
Reviewer: Julia Mayer-Lauren
Branch: project-sanderson-refactor-button-julia

This file records every section or piece of content from the original `button.mdx` that was removed, restructured, or relocated during the refactor. Use it to verify nothing meaningful was lost.

---

## Removed sections and their fate

| Original section | Disposition | Where content landed |
| --- | --- | --- |
| `## Guidance` | Dropped — was a catch-all wrapper heading with no template equivalent | Sub-content redistributed; see rows below |
| `### About Button` | Dropped — flat bullet list of use cases | Replaced by `## Use cases` with gerund `###` subheadings |
| `### Button labeling` | Restructured | Prose moved to `## Content Guidelines > Label wording`; Add/New/Create table preserved verbatim |
| `### Button alignment` | Relocated | Moved to `## Behaviors and States > General Behaviors > Alignment` |
| `### Button ordering` | Relocated | Moved to `## Behaviors and States > General Behaviors > Ordering` |
| `### Buttons vs. anchors` | Relocated | Pattern-level do/don't → `## Dos and Don'ts > Buttons vs. anchors`; brief principle also noted in `## Accessibility > ARIA` |
| `### Cancel buttons` | Restructured | `#### Styling` subheading dropped; content and BestPracticeGroup moved to `## Dos and Don'ts > Cancel button styling` |
| `### Toggle buttons` | Split | Best practices list → `## Content Guidelines > Toggle button labels`; icon-state pattern noted in TODO (no example exists) |
| `## Primary buttons` | Dropped entirely | This section was conceptual prose about why primary buttons are valuable. Not a template section. Key information ("only one per view") preserved in `## Variants > Primary button`. |
| `### When to use a primary action button` | Dropped | Rolled into `## Variants > Primary button` description |
| `## Responsiveness` | Relocated | `### Best practices` bullets → `## Behaviors and States > General Behaviors > Responsiveness`; `### Single buttons` and `### Button groups` BestPracticeGroups → `## Dos and Don'ts` |
| `### Button states` (under Variants) | Relocated | Guidance prose moved to `## Behaviors and States > Application States > Disabled`; BestPracticeGroup example moved to Use cases > Toggling between states |
| `#### Busy button` (under Variants) | Relocated | Moved to `## Behaviors and States > Application States > Busy` with both examples retained |
| `### A11y guidance` heading | Flattened | Prose redistributed: button-vs-anchor distinction → `## Accessibility > ARIA`; keyboard table added as new structured subsection |

---

## Prose removed without a direct landing spot

The following prose appeared in the original MDX but has no clean template equivalent and was not carried forward. It is preserved here verbatim in case it is needed for future reference.

### From `## Primary buttons`

> Primary buttons highlight actions on a page delivering the most benefit to users. They are helpful in enabling users' goals, unlocking new value by enabling a new experience, capability, or creation of something which hadn't previously existed.
>
> Primary buttons have increased visual weight through placement and contrast, drawing users' attention by distinguishing the button from surrounding content.

**Reason dropped:** Marketing/rationale prose explaining the philosophy behind primary buttons. Not instructional. The actionable guidance ("only one per view") was preserved in Variants.

### From `### When to use a primary action button`

> Primary action buttons are used within enterprise applications. They are meant to assist and are designed to maximize a user's experience by highlighting the most common or important action on a page and allowing the user to accomplish a goal or task.
>
> Actions supported by primary action buttons are numerous and may be constructive or destructive in nature. Example actions include: create, schedule, deploy, add, save, and depending on context could even be cancel or delete.

**Reason dropped:** Overly broad and partially duplicated by Use cases section. The examples list (create, deploy, add, save) is less useful than the scenario-based use case subheadings.

### From `### Responsiveness > Best practices`

> Ensure you are always being mindful of our responsive page layouts when designing user experiences. Even if you don't anticipate your users leveraging mobile or tablet devices, they may be reducing/expanding browser widths, zooming in on content, or manipulating the browser in unanticipated ways. As a best practice, always design for a usable UI on all browser widths and resolutions.

**Reason dropped:** Introductory framing, not actionable rules. The three bullet rules that followed were preserved in General Behaviors > Responsiveness.

---

## Structure changes summary

- **`## Guidance`** — This was a legacy catch-all heading. The template has no equivalent. All meaningful sub-content was redistributed.
- **`## Primary buttons`** — Was a standalone section; redundant with Variants. Dropped.
- **`## Responsiveness`** — Was a top-level section; per template, responsive behavior lives under Behaviors and States > General Behaviors. BestPracticeGroups moved to Dos and Don'ts.
- **Variant subheadings** — "Button states" and "Busy button" were listed under `## Variants` in the original. States are not variants; moved to Application States.
