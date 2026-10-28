# Screen Patterns in Figma

Use these patterns as starting points when composing common product screens.
Build within the HPE Design System App container and use existing library
components rather than recreating them. Keep component styles and states as
provided. For variable usage and responsive behavior, see
[Design Tokens in Figma](./design-variables.md) and
[Responsive Layouts in Figma](./responsive-layouts.md).

## Dashboard

Use a wide content area for dashboards. Organize related information into clear
sections, then use a fluid grid for peer metrics or cards so the number of
columns adapts to the available width.

**Do:** Use consistent cards for related peer metrics and a fluid grid that
reflows as the screen narrows.

**Don't:** Put every item in a different fixed-width column, or nest cards
inside other cards.

**Why:** Consistent peer groups are easier to scan and adapt more reliably to
different screen widths.

## List or Data Table

Use a wide content area for lists, tables, and charts. Keep search, filters,
and actions visually distinct from the results; use cards for self-contained
items, not as decoration around toolbars or filters.

**Do:** Give results a clear primary area, with related controls grouped near
the results they affect.

**Don't:** Constrain a wide table to a narrow reading column or wrap a filter
toolbar in a card just to add a boundary.

**Why:** Data needs room to be compared, while unnecessary surfaces compete
with the content.

## Form or Wizard

Use a narrow content area for forms and wizards. Group fields by task or topic,
make the next action clear, and keep the flow focused.

**Do:** Present a readable form column with related fields grouped together.

**Don't:** Stretch fields across a dashboard-width page or place unrelated
content beside a form without a clear task-related reason.

**Why:** A focused width helps users follow the task and scan field labels and
values.

## Settings or Long-Form Content

Use a narrow content area for settings, articles, and other long-form content.
For settings, group related options so each group has a clear purpose. Keep
paragraphs at a readable line length even when the frame is wide.

**Do:** Use distinct, titled groups for related settings, and keep explanatory
copy readable.

**Don't:** Put all settings into one undifferentiated list or stretch body copy
across the entire page.

**Why:** Clear grouping supports scanning, and controlled line length makes
long content easier to read.

## Detail or Supporting Task

Keep the main page visible when a user needs supporting details, filters, or a
short add/edit task alongside it. Use a side panel for that supporting work;
use an interruptive confirmation only when the user must resolve it before
continuing. Reserve a full-screen flow for a substantial, multi-step task.

**Do:** Choose the panel or dialog based on whether the user needs to keep
working with the page behind it.

**Don't:** Interrupt the page with a blocking dialog for supporting
information, or force a multi-step task into a small dialog.

**Why:** The presentation should match how much the task interrupts the
current work.
