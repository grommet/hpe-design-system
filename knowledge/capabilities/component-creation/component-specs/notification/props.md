# Notification — props.md

Platform-agnostic public API for the Notification component.
No framework references. Props are backed by anatomy parts and tokens.

---

## 1 — Overview

A Notification renders a status-aware message to the user. With no props
beyond `title`, it renders an inline notification with `unknown` status,
no close button, and no message body.

The consumer controls:

- The status and kind (inline / global / toast)
- Whether the notification is dismissible (`onClose`)
- The title, message, optional action links, and optional custom icon
- For toast kind: viewport position, auto-close timing

The component handles:

- Selecting the correct status icon and background from `tokens.md`
- Applying the correct layout for the chosen kind
- Text alignment to the left in all cases (constraints §10)
- Icon alignment to the top of the first title line (constraints §11)
- Announcing content to assistive technologies via the live region (constraints §8)
- Auto-closing toast notifications after `duration` ms (default: 8000)
- Pausing the auto-close timer on hover or focus (toast kind)

---

## 2 — Props table

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | — | Yes | Primary heading text. Always rendered. |
| `message` | `string \| node` | `undefined` | No | Optional body description. Plain strings are wrapped in a text element; nodes are rendered as-is. |
| `status` | `'critical' \| 'warning' \| 'normal' \| 'info' \| 'unknown'` | `'unknown'` | No | Status variant. Determines icon, background, and text colors. |
| `kind` | `'inline' \| 'global' \| 'toast'` | `'inline'` | No | Presentation kind. Inline is in-document; global is full-width; toast is floating and auto-dismissing. |
| `onClose` | `function` | `undefined` | No | If provided, a CloseButton is rendered. Called with the triggering event when the notification is dismissed. |
| `actions` | `array` | `undefined` | No | Array of action objects rendered as inline links. Each object: `{ label: string, href?: string, onClick?: function }`. |
| `icon` | `node` | `undefined` | No | Custom icon element. Replaces the default StatusIcon. Does not affect status semantics. |
| `autoClose` | `boolean` | `true` | No | Toast kind only. When `true`, the notification auto-closes after `duration` ms. Has no effect on inline or global kinds. |
| `duration` | `number` | `8000` | No | Toast kind only. Time in milliseconds before auto-close fires. Only used when `autoClose` is `true`. |
| `position` | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | No | Toast kind only. Viewport position for the FloatingLayer. |
| `id` | `string` | `undefined` | No | HTML `id` on the Container. Required when the consumer needs to reference the notification (e.g. for `aria-describedby`). |
| `messages` | `{ close: string }` | `{ close: 'Close notification' }` | No | Localised string overrides. `close` sets the accessible label of the CloseButton. |
| `ariaLive` | `'polite' \| 'assertive'` | see description | No | Overrides the `aria-live` polarity. Default: `'assertive'` when `status='critical'`; `'polite'` for all other statuses. See constraints §8. |
| `time` | `number` | `undefined` | No | Alias for `duration`. When provided, overrides `duration`. Included for parity with the Grommet reference implementation. |

---

## 3 — Prop groups

### Content

| Prop | Purpose |
|---|---|
| `title` | Required heading |
| `message` | Optional body text |
| `actions` | Optional inline action links |
| `icon` | Optional custom icon override |

### Behaviour

| Prop | Purpose |
|---|---|
| `onClose` | Controls dismissibility; receives dismiss event |
| `autoClose` | Enables/disables toast auto-close timer |
| `duration` | Auto-close timer value in ms |
| `time` | Alias for `duration` |

### Appearance

| Prop | Purpose |
|---|---|
| `status` | Status variant |
| `kind` | Presentation kind (inline / global / toast) |

### Accessibility

| Prop | Purpose |
|---|---|
| `id` | Anchors `aria-describedby` references |
| `messages` | Localised strings — close button label |
| `ariaLive` | Overrides ARIA live region polarity |

### Layout

| Prop | Purpose |
|---|---|
| `position` | Toast FloatingLayer viewport position |

---

## 4 — Callback props

### `onClose(event)`

- **When it fires:** User clicks the CloseButton, or presses Escape (platform-dependent) while the notification is focused.
- **Arguments:** The triggering DOM event, or no argument if called by the auto-close timer.
- **Return value:** Ignored.

### `action.onClick(event)` (per action in the `actions` array)

- **When it fires:** User clicks or activates the action link.
- **Arguments:** The triggering DOM event.
- **Return value:** Ignored.
- **Note:** Clicking an action does not automatically close the notification — see constraints §9.

---

## 5 — Enum reference

### `status`

| Value | Description |
|---|---|
| `critical` | Error or danger — red background, StatusCritical icon |
| `warning` | Caution — orange background, StatusWarning icon |
| `normal` | Success or healthy — green background, StatusGood icon |
| `info` | Neutral information — blue background, Info icon |
| `unknown` | Status cannot be determined — grey background, StatusUnknown icon |

### `kind`

| Value | Description |
|---|---|
| `inline` | In-document; width follows parent; column layout; rounded corners |
| `global` | Full-width banner; no border-radius; row layout |
| `toast` | Floating overlay; auto-closing; always white background; column layout; shadow |

### `position` (toast kind only)

| Value | Description |
|---|---|
| `top` | Centered at top of viewport (default) |
| `top-left` | Top-left corner of viewport |
| `top-right` | Top-right corner of viewport |
| `bottom` | Centered at bottom of viewport |
| `bottom-left` | Bottom-left corner of viewport |
| `bottom-right` | Bottom-right corner of viewport |

---

## 6 — Accessibility props

| Prop | ARIA mapping | Required | Default behaviour if omitted |
|---|---|---|---|
| `messages.close` | `aria-label` on the CloseButton | Required when `onClose` is provided | "Close notification" |
| `ariaLive` | `aria-live` on the Container (inline/global) or live region type on FloatingLayer (toast) | No | `'assertive'` for `critical`; `'polite'` for all others |
| `id` | `id` on the Container | No | No id attribute |

---

## 7 — Usage examples

### Minimal — required props only

```
Notification
  title = "System updated successfully"
```

Renders an inline notification with `unknown` status, no message, no close button.

### Typical — most common real-world usage

```
Notification
  title = "Node unreachable"
  message = "Node cluster-3 has stopped responding."
  status = critical
  kind = inline
  onClose = () => dismiss()
```

Renders an inline critical notification with a CloseButton.

### Full — all significant props set

```
Notification
  title = "Storage threshold approaching"
  message = "Disk usage is at 85%."
  status = warning
  kind = toast
  autoClose = true
  duration = 6000
  position = top-right
  onClose = () => dismissToast()
  actions = [
    { label: "Expand storage", href: "/storage/expand" },
    { label: "Dismiss", onClick: () => dismissToast() }
  ]
  messages = { close: "Close warning" }
  ariaLive = polite
```

Renders a toast notification in the top-right corner. Auto-closes after 6 seconds.
Shows a CloseButton and two action links.

---

## 8 — Props not provided

| What | Why |
|---|---|
| `size` | No size variants in v1. Always renders at the medium scale. |
| `animate` | Animation is a platform concern. No animation tokens exist. |
| `open` | For inline and global kinds, visibility is controlled by the consumer rendering or not rendering the component. For toast kind, the auto-close timer and onClose handle visibility. An explicit `open` boolean is not exposed to avoid conflicting with the timer. |
| `color` | Background and text color are determined by `status` via tokens. Custom colors are not exposed. |
| `pad` | Internal padding values are fixed by the spec and must not be overridden per-instance. |
