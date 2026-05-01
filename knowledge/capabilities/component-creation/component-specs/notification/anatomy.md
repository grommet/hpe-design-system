# Notification — anatomy.md

---

## 1 — Overview

A Notification communicates a system message, status event, or feedback
to the user. It combines a status icon, a title, an optional message body,
optional action links, and an optional dismiss button.

The component has three **kinds**:

| Kind | Description |
|---|---|
| `inline` | Embedded in-page at the point of relevance. Default kind. |
| `global` | Full-width banner anchored to the top of the page. |
| `toast` | Floating, self-dismissing overlay positioned at the edge of the viewport. |

The component has five **status variants**:

| Status | Icon | Background |
|---|---|---|
| `critical` | StatusCritical | background-critical |
| `warning` | StatusWarning | background-warning |
| `normal` | StatusGood | background-ok |
| `info` | Info | background-info |
| `unknown` | StatusUnknown | background-unknown |

---

## 2 — ASCII diagrams

### Inline and toast kinds — column layout, title + message

```
┌──────────────────────────────────────────────────────────┐
│ [Icon]  Title text                              [✕ Close] │
│         Message body text. Actions here.                  │
└──────────────────────────────────────────────────────────┘
```

### Inline — title only (no message, no close)

```
┌──────────────────────────────────────────────────────┐
│ [Icon]  Title text                                   │
└──────────────────────────────────────────────────────┘
```

### Global kind — row layout, full-width, no border-radius

```
┌────────────────────────────────────────────────────────────────────────┐
│   [Icon]  Title text   Message body text. Action link.       [✕ Close] │
└────────────────────────────────────────────────────────────────────────┘
```

### Toast kind — floating, column layout, with shadow

```
                                         ┌───────────────────────────────┐
                                         │ [Icon]  Title      [✕ Close]  │
                                         │         Message body.          │
                                         └───────────────────────────────┘
                                           ╲ (box-shadow: --hpe-shadow-medium)
  (positioned at viewport edge via FloatingLayer — default: top)
```

---

## 3 — Parts table

| Part | Description | Always present |
|---|---|---|
| Container | Root element. Styled per kind and status. Holds all other parts. | Yes |
| StatusIcon | Status-specific icon from `@hpe-design/icons-grommet`. See icon table in §4. Can be replaced via `icon` prop. | Yes |
| IconContainer | Wrapper around StatusIcon. Provides right-side padding to separate icon from text. | Yes |
| TextContainer | Wrapper around Title and (optionally) Message. Provides vertical gap between them. | Yes |
| Title | Primary heading text. Always rendered. | Yes |
| Message | Optional body text below the title (column layout) or inline with title (row layout). | No — conditional on `message` prop |
| CloseButton | Icon button using the `Close` icon. Dismisses the notification. | No — conditional on `onClose` prop |
| Actions | One or more inline action links inside the message area. | No — conditional on `actions` prop |
| FloatingLayer | Fixed-position overlay placing the Container at a viewport edge. | No — toast kind only |

---

## 4 — Icon names per status

The following named icons from `@hpe-design/icons-grommet` are the correct
icons for each status. These names are part of the spec.

| Status | Icon component name | Package |
|---|---|---|
| `critical` | `StatusCritical` | `@hpe-design/icons-grommet` |
| `warning` | `StatusWarning` | `@hpe-design/icons-grommet` |
| `normal` | `StatusGood` | `@hpe-design/icons-grommet` |
| `info` | `Info` | `@hpe-design/icons-grommet` |
| `unknown` | `StatusUnknown` | `@hpe-design/icons-grommet` |

The CloseButton uses the `Close` icon from `@hpe-design/icons-grommet`.

Implementations that do not have access to `@hpe-design/icons-grommet`
must substitute equivalent SVG icons and log a gap.

---

## 5 — States

| State | Trigger | Applies to |
|---|---|---|
| rest | Default — no interaction | Container, StatusIcon, Title, Message, CloseButton, Actions |
| hover | Pointer over CloseButton or Actions | CloseButton, Actions |
| focus | Keyboard focus on CloseButton or an Action | CloseButton, Actions |
| active | Pointer down on CloseButton or an Action | CloseButton, Actions |
| dismissed | `onClose` fires; or toast auto-close timer expires | Container hides (unmounted or rendered false) |
| visible | toast kind: notification is open | FloatingLayer visible |
| hidden | toast kind: after dismiss or auto-close timer | FloatingLayer hidden |

### Status variants (not interactive states)

Status (`critical`, `warning`, `normal`, `info`, `unknown`) is set at
render time and does not change interactively. It determines background,
icon, and text colors simultaneously — they always change together.

---

## 6 — Size variants

The Notification has **no size variants** in v1. Icon, text, and spacing
always use the `medium` scale.

---

## 7 — Layout behaviour

### Inline kind

- Width: determined by the containing element (fills parent width).
- Direction: `column`. The icon and title share the first row. The message
  renders in a separate row directly below the title.
- Border-radius: `--hpe-radius-xsmall` (rounded corners).
- Padding: `--hpe-spacing-xsmall` inline, `--hpe-spacing-3xsmall` block.
- Not floating — anchored in document flow.
- `text-align: left` — see constraints §10.

### Global kind

- Width: full width of the page/viewport.
- Direction: `row`. Icon, title, message, actions, and close button are
  all on a single horizontal line.
- No border-radius (`--hpe-radius-none`).
- Padding: `--hpe-spacing-xlarge` inline, `--hpe-spacing-3xsmall` block.
- Anchored to the top of the page; not floating.
- `text-align: left` — see constraints §10.

### Toast kind

- Width: determined by content. Does not span full width.
- Direction: `column` (same as inline kind).
- Border-radius: `--hpe-radius-xsmall`.
- Padding: `--hpe-spacing-xsmall` inline, `--hpe-spacing-3xsmall` block.
- Box-shadow: `--hpe-shadow-medium` (floating card elevation).
- Background always `--hpe-color-background-front` regardless of status —
  see constraints §4.
- Positioned at the edge of the viewport via FloatingLayer. Default position: `top`.
- Multiple toasts stack vertically within the FloatingLayer.
- `text-align: left` — see constraints §10.

### Icon vertical alignment

The StatusIcon aligns to the **top** of the adjacent TextContainer — not
centered on the full notification height. This is achieved by setting
`align-items: flex-start` (or equivalent) on the row that contains the
IconContainer and TextContainer. See constraints §11.

### Overflow

- Text wraps within the TextContainer.
- Long action labels wrap to the next line within the message area.
- The Container never clips or scrolls — it grows vertically with content.

---

## 8 — Out of scope

- No progress bar or countdown timer on toast.
- No animation tokens — entry/exit animation (if any) is outside the
  token spec. Platforms may implement animation using their own primitives.
- No stacking/queue management — FloatingLayer positioning does not
  manage a notification queue. The consumer controls which notifications
  are open.
