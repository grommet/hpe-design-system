# Color, Spacing, and Layout in Figma

Use these guidelines when creating or reviewing HPE Design System product
designs in Figma. They focus on applying the variables available to consumers
and building clear, responsive page layouts.

## Color

### Choose colors by role and target

> Choose color by target and role, such as background-front, text-strong,
> border-weak, or icon-critical.
> — `color-use-semantic-roles`

> Every color token names the target it is applied to.
> — `color-names-its-target`

In Figma, choose a variable that matches both what you are styling and the role
it plays. For example, use a `text-*` variable for text, an `icon-*` variable
for an icon, a `background-*` variable for a surface, and a `border-*` variable
for a border. Do not interchange variables for different targets just because
they currently look the same.

### Use complete, intentional status cues

> Convey status with a status icon (icon-critical, icon-warning, icon-ok,
> icon-unknown) and, when a surface is needed, a background-[role] paired with
> text-on[Role]. Never signal status by text color alone. Text that names or
> describes a status uses the text-[role] token for that status.
> — `color-convey-status-with-icon-not-text`

When designing a status message, include a status icon; do not rely on colored
text as the only signal. If the status needs a colored surface, pair that
surface with its matching on-role text variable.

### Keep foreground and background pairings together

> Pair every strong background with its onStrong text and icon tokens, and
> every role background with its on[Role] tokens: background-critical with
> text-onCritical, background-primary-strong with text-onPrimaryStrong. Use the
> most specific pairing that exists.
> — `color-pair-strong-with-onstrong`

In Figma, use the corresponding text and icon variables for the selected
background. These pairings are designed to maintain contrast as the palette
changes; avoid choosing a foreground color by eye.

### Use one background approach consistently

> Use one background approach across an application. Basic uses background
> everywhere with background-contrast for secondary content. Layered uses
> background-back for the page and background-front for primary content
> surfaces. Never place background-back inside a background-front region.
> — `color-pick-one-background-approach`

Follow the established approach for the product or screen family. Do not mix
the basic and layered approaches on related screens, or place a back surface
inside a front surface.

### Reserve decorative color for decoration

> Use decorative-* only for illustration and non-interactive ornamentation
> where the hue carries no meaning. For a functional accent on a UI element,
> use background-accent-* or border-accent-*. Never use either palette to
> convey status.
> — `color-decorative-is-not-functional`

Decorative colors are not text or icon backgrounds. For an accent that is part
of the interface, choose the matching accent variable for the background or
border instead.

### Preserve component states

> When building a bespoke component that the design system does not provide,
> style its interaction states (rest, hover, focus, active) and application
> states (disabled, selected, readOnly, error) with the semantic state tokens
> for the target and role. Do not derive a state color by adjusting opacity or
> lightness. Design system components already carry their states; do not
> restyle them.
> — `color-style-states-with-state-tokens`

When using a provided component in a Figma design, keep its established
appearance and states. For a bespoke component, represent its states with the
appropriate semantic variables rather than manually lightening, darkening, or
fading a color.

## Spacing

### Use named spacing variables

> Express every spacing value, whether between siblings, inside a container, or
> around an element, as a reference to a named spacing token, never as a literal
> number.
> — `spacing-use-tokens-everywhere`

In Figma, use named spacing variables for gaps rather than entering custom
numbers. This keeps spacing tied to the design system and allows it to adapt at
the small breakpoint. For variable scopes, see
[Design Tokens in Figma](./design-variables.md).

> Use a named spacing step. When no step is an exact fit, take the nearest one,
> preferring the smaller of two equally close steps, and report the gap to the
> design system team. Never interpolate.
> — `spacing-use-nearest-named-step`

If the available spacing steps do not fit exactly, choose the nearest step;
when equally close, choose the smaller one. Do not create an in-between value.
Report a recurring gap in the scale to the design system team.

### Keep spacing and dimensions in their own scales

> Never use a container token where a spacing token belongs, or the reverse.
> Spacing tokens size the space between and around things; container tokens
> size the width and height of the things themselves.
> — `spacing-keep-container-and-spacing-scales-apart`

Use spacing values for gaps and padding; use container variables for the width
and height of frames or components. In Figma, check the variable scope before
binding: spacing variables are for `GAP`, and container dimensions are for
`WIDTH_HEIGHT`.

### Create hierarchy with spacing

> Spacing should decrease as things nest, so the gap between groups is always
> larger than the gap within them.
> — `spacing-decreases-as-things-nest`

Use larger gaps to separate sections and smaller gaps to group related content.
For the standard page rhythm:

> Use xxlarge between a page's columns, xlarge between content sections, small
> between a section's heading and its body, and medium between peers inside a
> section such as cards in a grid.
> — `spacing-page-rhythm`

Apply the corresponding named spacing variables in Figma. Use one consistent
spacing step between rows and columns of the same grid.

### Give surfaces room around their contents

> A surface's padding should exceed the gap between its contents.
> — `spacing-surface-padding-exceeds-inner-gap`

For a card or other contained surface, leave more space between its edge and
contents than between the contents themselves. The default relationship is
medium padding with small internal gaps.

## Layout

### Match the frame width to the content

> Set kind on Page, not PageContent. Use the default, wide (max 1536px), for
> dashboards, tables, lists, and charts; narrow (max 768px) for forms, wizards,
> articles, and settings; and full for content that must reach the viewport
> edge, such as maps.
> — `layout-choose-page-kind-by-content`

When setting up a Figma screen frame, use the same content intent: allow
dashboards, tables, lists, and charts a wide content area; keep forms, wizards,
articles, and settings narrower for readability; use the full viewport only
when content needs to reach the edge.

For long-form text, keep the text column narrow rather than stretching it across
a wide page. See `layout-constrain-long-form-text`.

### Choose a layout that supports the content

> Use Grid when items must align in two dimensions or wrap into rows. Use Box
> for a single row or column.
> — `layout-use-grid-for-two-dimensions`

In Figma, use a single-direction Auto Layout for a row or column. Use a grid or
wrapping layout when items need to align across rows and columns, such as a set
of cards.

> For a set of like items such as cards, tiles, or metrics, use a fluid grid.
> — `layout-use-fluid-grid-for-repeating-peers`

For repeated peer items, design a layout that can add or remove columns as the
available width changes. Use fixed, role-based columns only when the regions
have distinct purposes, such as filters beside results.

### Check responsive layouts

> Design and check every layout at the five HPE breakpoints: xsmall (576px and
> below), small (577 to 768px), medium (769 to 1080px), large (1081 to 1439px),
> and xlarge (1440px and above).
> — `layout-validate-at-hpe-breakpoints`

Review the design at representative frame widths in all five ranges. Check that
content remains readable, repeated items reflow appropriately, and controls or
regions do not collide or overflow.

> Use ResponsiveContext to change structure: columns, areas, what renders, and
> where content goes. Do not use it to step spacing or radius down at the small
> breakpoint.
> — `layout-use-responsive-context-for-structure`

In Figma, make responsive changes to the arrangement or visibility of content
when needed. Keep spacing and radius tied to their variables rather than
manually changing them just because the frame is narrower.
