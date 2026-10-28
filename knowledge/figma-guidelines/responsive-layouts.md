# Responsive Layouts in Figma

Use these guidelines when designing HPE Design System screens at different
viewport widths. Preserve the purpose and priority of the content as the
layout adapts. Use the components and variables from the HPE Design System
libraries; see [Using the HPE Design System Libraries](./library-usage.md) and
[Design Tokens in Figma](./design-variables.md).

## Check the HPE Breakpoints

Design and review each layout across all five HPE breakpoint ranges:

- **xsmall:** 576px and below
- **small:** 577px to 768px
- **medium:** 769px to 1080px
- **large:** 1081px to 1439px
- **xlarge:** 1440px and above

Choose a representative frame width within each range and check that content
remains readable, controls remain usable, and regions do not collide or
overflow. Do not review only a desktop frame; a layout that works at one width
may fail at a breakpoint.

## Adapt Structure, Not Token Values

When a screen gets narrower, change its structure when needed: reflow columns,
move supporting regions, or change which content is visible. Keep spacing and
radius values bound to their semantic variables rather than manually reducing
them for a small frame. The design system already adapts those tokens at the
small breakpoint.

**Do:** Let a grid of peer cards reflow to fewer columns as the frame narrows.

**Don't:** Keep cards in a fixed number of columns until they become cramped,
or shrink their gaps by replacing the bound spacing variables with smaller
values.

**Why:** Fluid layouts adapt to available space while preserving the system's
spacing behavior.

## Reflow Repeated Items

For peer content such as metric cards, tiles, or product cards, use a grid that
can add or remove columns with the available width. Use a single row or column
for one-directional content; use a grid when items need to align in both
directions.

**Do:** Let repeated cards wrap into fewer columns at narrower widths.

**Don't:** Use a fixed-width row of cards that overflows, or use a wrapping
layout when alignment across rows and columns matters.

**Why:** A fluid grid accommodates different viewport widths and keeps peer
items aligned.

## Handle Supporting Panels on Small Screens

On xsmall and small screens, show at most one side panel at a time, such as
navigation, a contextual pane, or a side drawer. If the user opens another
panel, close the one that is already open.

**Do:** Present one full-width panel at a time and return the user to the page
content when it closes.

**Don't:** Stack or open multiple side panels over one another on a narrow
screen.

**Why:** At these widths, panels use the available screen and can obscure each
other and the page.

## Keep Reading and Task Flows Comfortable

Keep forms, wizards, settings, and long-form reading in a narrow content area.
For long-form text, preserve a readable line length instead of stretching
paragraphs across a wide frame. Use a wide area for content such as dashboards,
tables, lists, and charts; reserve the full viewport width for content that
needs it, such as a map.

**Do:** Keep a form or article readable on a wide frame and let its content
adapt within the narrower frame.

**Don't:** Stretch long paragraphs across the full width of a large screen, or
force a wide data view into a narrow column.

**Why:** The content's purpose should determine its usable width; wider is not
always more readable or useful.
