# Notification — anatomy.md

Platform-agnostic structural specification for the `notification` component.
No framework references.

---

## 1 — Overview

A Notification communicates system or application events to the user.
It appears in one of three layout kinds:

- **inline** — embedded in the page flow at the point of relevance
- **global** — a full-width banner, typically at the top of the page
- **toast** — a floating overlay that auto-dismisses after a timer expires

The component carries a `status` that drives background color, icon, and
text colors. Five statuses are defined: critical, warning, normal, unknown, info.

---

## 2 — Parts

| Part | Always present | Conditional | Notes |
|---|---|---|---|
| Container | ✓ | | Outer flex row; present in all kinds |
| IconContainer | ✓ | | Wraps StatusIcon; provides gap to TextContainer |
| StatusIcon | ✓ | | Status-specific icon; replaced by consumer-supplied icon prop |
| TextContainer | ✓ | | Vertical flex column; holds Title and Message |
| Title | ✓ | | Primary label; always present |
| Message | | ✓ | Body text; optional |
| MessageText | | ✓ | Span within Message holding the text string; provides trailing margin before actions |
| Actions | | ✓ | Zero or more inline links/buttons after the message text |
| CloseButton | | ✓ | Dismiss button; present only when `onClose` is provided |
| CloseIcon | | ✓ | Icon inside CloseButton |
| FloatingLayer | | ✓ | Positioning container for toast kind only |

---

## 3 — Visual structure

### Inline / global kind

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────┐  ┌──────────────────────────────────┐  ┌───────┐ │
│  │StatusIcon│  │ Title text                        │  │ Close │ │
│  └──────────┘  │                                   │  │  Icon │ │
│  IconContainer │ Message text  [Action]  [Action]  │  └───────┘ │
│                └──────────────────────────────────┘            │
│                  TextContainer                     CloseButton  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         Container (flex row, align-items: flex-start)
```

For global kind: Title and Message are inline (on the same line), so the
TextContainer appears as a single text row rather than a column stack.

### Toast kind (floating)

```
                          ┌────────────────────────────────────┐
                          │ ╔══════════════════════════════════╗│
                          │ ║                                  ║│  ← box-shadow
                          │ ║  [Icon]  Title text      [Close] ║│
                          │ ║          Message text [Action]   ║│
                          │ ║                                  ║│
                          │ ╚══════════════════════════════════╝│
                          │  FloatingLayer (fixed position)     │
                          └────────────────────────────────────┘
```

---

## 4 — Icon component names

All status icons are from `@hpe-design/icons-grommet`.

| Status | Icon component | Close button icon |
|---|---|---|
| critical | `StatusCritical` | `Close` |
| warning | `StatusWarning` | `Close` |
| normal | `StatusGood` | `Close` |
| unknown | `StatusUnknown` | `Close` |
| info | `Info` | `Close` |

The StatusIcon is decorative when the status is also communicated in the Title
text. It must be marked `aria-hidden="true"` on the icon wrapper.

---

## 5 — States

| State | Applies to | Description |
|---|---|---|
| rest (open) | Container, all parts | Default visible state |
| hover | Toast Container | Auto-close timer pauses while pointer is over the toast |
| focus | CloseButton, Actions | Focus ring using all three focusIndicator tokens |
| active | CloseButton, Actions | Pressed state — delegated to Button / Anchor |
| dismissed | Container | Consumer unmounts for inline/global; auto-close or close event for toast |
| swipe | Toast Container | Swipe-to-dismiss gesture (platform-specific) |

---

## 6 — Kinds

### inline
- Embedded in page flow; takes its natural width
- Status background applied to container
- `border-radius: --hpe-radius-xsmall`
- Title and Message in column layout (Message below Title)
- CloseButton optional

### global
- Full-width banner; typically at viewport or page top
- Status background applied to container
- `border-radius: --hpe-radius-none`
- `padding-inline-start/end: --hpe-spacing-xlarge` (48px) — wider horizontal padding
- Title and Message rendered inline (on the same line)
- CloseButton optional

### toast
- Floating overlay rendered in a dedicated viewport position
- Background always `--hpe-color-background-front` — never status background
- `border-radius: --hpe-radius-xsmall`
- `box-shadow: --hpe-shadow-medium` — required elevation for floating cards
- Auto-close timer (default 8 000 ms); pauses on hover and focus
- Title and Message in column layout (Message below Title)
- CloseButton optional; auto-close handles dismiss independently
- Rendered inside a FloatingLayer with z-index `--hpe-drop-default-zIndex` (GAP-002)

---

## 7 — Statuses

| Status value | Background token (inline/global) | Icon | Icon color token |
|---|---|---|---|
| critical | `--hpe-color-background-critical` | `StatusCritical` | `--hpe-color-icon-critical` |
| warning | `--hpe-color-background-warning` | `StatusWarning` | `--hpe-color-icon-warning` |
| normal | `--hpe-color-background-ok` | `StatusGood` | `--hpe-color-icon-ok` |
| unknown | `--hpe-color-background-unknown` | `StatusUnknown` | `--hpe-color-icon-unknown` |
| info | `--hpe-color-background-info` | `Info` | `--hpe-color-icon-info` |

---

## 8 — Layout behaviour

- The Container is always a horizontal flex row (`flex-direction: row`)
- `align-items: flex-start` on the Container — the StatusIcon aligns to the
  top of the first line of the adjacent Title text, not the center of the
  text block. See constraints §11.
- `text-align: left` must be set explicitly on all text parts — never assumed
  or inherited. See constraints §10.
- The TextContainer is a vertical flex column for inline and toast kinds.
  For the global kind, Title and Message are rendered inline on the same line.
- When the CloseButton is absent, the TextContainer's padding-inline-end is
  applied directly to the Container. When the CloseButton is present, the
  end-side padding is carried by the CloseButton itself.
- The FloatingLayer (toast only) controls viewport position. The Container
  inside it takes its natural width.

---

## 9 — Out of scope

- Notification queue management (multiple simultaneous toasts)
- Notification grouping or stacking layout
- Animation tokens for toast enter / exit transitions — no tokens exist in
  `hpe-design-tokens` for motion timing (see GAP-003 note in gaps.md)
- Per-notification width limits
