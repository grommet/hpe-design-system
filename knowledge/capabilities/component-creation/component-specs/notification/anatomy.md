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

### Inline and global kinds (column layout, with title and message)

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

### Global kind (row layout, full-width, no border-radius)

```
┌────────────────────────────────────────────────────────────────────────┐
│   [Icon]  Title text   Message body text. Action link.       [✕ Close] │
└────────────────────────────────────────────────────────────────────────┘
```

### Toast kind (floating, column layout, same as inline visually)

```
                                         ┌───────────────────────────┐
                                         │ [Icon]  Title    [✕ Close] │
                                         │         Message body.      │
                                         └───────────────────────────┘
  (positioned top-right by default — FloatingLayer handles placement)
```

---

## 3 — Parts table

| Part | Description | Always present |
|---|---|---|
| Container | Root element. Holds all other parts. Styled per kind and status. | Yes |
| StatusIcon | Status-appropriate icon (critical, warning, ok, info, unknown). Can be replaced by custom `icon` prop. | Yes |
| IconContainer | Wrapper around StatusIcon. Provides right-side padding. | Yes |
| TextContainer | Wrapper around Title and (optionally) Message. Provides vertical gap. | Yes |
| Title | Primary heading text of the notification. | Yes |
| Message | Optional body text rendered below the title (column) or inline (row). | No — conditional on `message` prop |
| CloseButton | Icon button to dismiss the notification. | No — conditional on `onClose` prop |
| Actions | One or more inline action links rendered inside the message area. | No — conditional on `actions` prop |
| FloatingLayer | Fixed-position overlay that places the Container at a viewport edge. Toast kind only. | No — toast kind only |

---

## 4 — States

| State | Trigger | Applies to |
|---|---|---|
| rest | Default — no interaction | Container, StatusIcon, Title, Message, CloseButton, Actions |
| hover | Pointer over CloseButton or Actions | CloseButton, Actions |
| focus | Keyboard focus on CloseButton or an Action link | CloseButton, Actions |
| active | Pointer down on CloseButton or an Action link | CloseButton, Actions |
| dismissed | `onClose` fires; toast auto-close timer expires | Container hides (rendered false or unmounted) |
| visible | toast kind: notification is open | FloatingLayer visible |
| hidden | toast kind: after dismiss or auto-close timer | FloatingLayer hidden |

### Status variants (not interactive states)

Status is set at render time and does not change. It is not a hover or
focus state. Status determines background, icon, and text color.

---

## 5 — Size variants

The Notification has **no size variants** in v1. The icon, text, and
spacing always use the `medium` scale.

---

## 6 — Layout behaviour

### Inline kind

- Width: determined by its containing element (full width of parent).
- Layout direction: `column` (icon + title on first row, message below).
  Icon and title share a horizontal row; message wraps beneath.
- Border-radius: `--hpe-radius-xsmall` (rounded corners).
- Padding: `--hpe-spacing-xsmall` horizontal, `--hpe-spacing-3xsmall` vertical.

### Global kind

- Width: full width of the page/viewport.
- Layout direction: `row` (icon, title, message, actions, close all on one line).
- No border-radius: `--hpe-radius-none`.
- Padding: `--hpe-spacing-xlarge` horizontal, `--hpe-spacing-3xsmall` vertical.
- Anchored to the top of the page; not floating.

### Toast kind

- Width: determined by content (min-width governed by content, max by viewport
  margin). Does not span full width.
- Layout direction: `column` (same as inline kind).
- Border-radius: `--hpe-radius-xsmall`.
- Padding: `--hpe-spacing-xsmall` horizontal, `--hpe-spacing-3xsmall` vertical.
- Positioned at the edge of the viewport via FloatingLayer.
- Default position: `top` (centered at top of viewport).
- Multiple toasts stack vertically.
- Background is always `--hpe-color-background-front` (white) regardless of
  status — status icon color is the status indicator.

### Overflow

- Text wraps within the TextContainer.
- Long action labels wrap to next line within the message area.
- The Container never clips or scrolls — it grows vertically with content.

---

## 7 — Out of scope

- Notification does not manage a queue or stack of multiple notifications.
  That is the consumer's responsibility (or a Viewport/Provider pattern).
- Notification does not implement confirm/cancel dialogs.
  Use a Modal or AlertDialog for responses that require user action.
- Notification does not animate enter/exit transitions.
  Animation is the platform mapping's responsibility.
- Notification does not support a `disabled` state — it is always active
  while visible.
- Notification does not support multiple simultaneous status values.
- The FloatingLayer's exact positioning algorithm (anchoring, viewport
  collision detection) is out of scope for this spec — it is handled by
  the platform primitive (e.g. a portal or fixed-position viewport mechanism).
