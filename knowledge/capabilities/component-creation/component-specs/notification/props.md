# Notification — props.md

Platform-agnostic public API for the Notification component.
No framework references. Props are backed by anatomy parts and tokens.

---

## 1 — Overview

A Notification renders a status-aware message to the user. With no props
beyond `title`, it renders an inline notification with `unknown` status,
no close button, and no message body. The consumer controls:

- The status and kind (inline / global / toast)
- Whether the notification is dismissible
- The title, message, and optional action links
- For toast kind: positioning, auto-close timing

The component handles:

- Selecting the correct status icon and background color from `tokens.md`
- Applying the correct layout for the chosen kind
- Announcing content to assistive technologies via the live region
- Auto-closing toast notifications after `duration` ms (default: 5000)
- Pausing the auto-close timer on hover or focus (toast kind)

---

## 2 — Props table

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | — | Yes | Primary heading text of the notification. |
| `message` | `string \| node` | `undefined` | No | Optional body description. Plain strings are wrapped in a paragraph element; nodes are rendered as-is. |
| `status` | `'critical' \| 'warning' \| 'normal' \| 'info' \| 'unknown'` | `'unknown'` | No | Status variant. Determines icon, background, and text colors. |
| `kind` | `'inline' \| 'global' \| 'toast'` | `'inline'` | No | Presentation kind. Inline is embedded; global is full-width; toast is floating and auto-dismissing. |
| `onClose` | `function` | `undefined` | No | If provided, a CloseButton is rendered. Called with the triggering event when the user dismisses the notification. |
| `actions` | `array` | `undefined` | No | Array of action objects rendered as inline links. Each object: `{ label: string, href?: string, onClick?: function }`. |
| `icon` | `node` | `undefined` | No | Custom icon element. Replaces the default status icon. Does not affect status semantics. |
| `autoClose` | `boolean` | `true` | No | Toast kind only. When `true`, the notification auto-closes after `duration` ms. Has no effect on inline or global kinds. |
| `duration` | `number` | `5000` | No | Toast kind only. Time in milliseconds before the notification auto-closes. Only used when `autoClose` is `true`. |
| `position` | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | No | Toast kind only. Viewport position for the FloatingLayer. |
| `id` | `string` | `undefined` | No | HTML `id` attribute applied to the Container. Required when the consumer needs to reference the notification (e.g. for `aria-describedby`). |
| `messages` | `{ close: string }` | `{ close: 'Close notification' }` | No | Localised string overrides. `close` sets the accessible label of the CloseButton. |
| `ariaLive` | `'polite' \| 'assertive'` | see description | No | Overrides the `aria-live` polarity. Default: `'assertive'` when `status='critical'`; `'polite'` for all other statuses. |

---

## 3 — Prop groups

### Content

| Prop | Purpose |
|---|---|
| `title` | Required heading |
| `message` | Optional body description |
| `actions` | Optional inline action links |
| `icon` | Optional custom icon override |

### Behaviour

| Prop | Purpose |
|---|---|
| `onClose` | Controls dismissibility and receives dismiss event |
| `autoClose` | Enables/disables toast auto-close timer |
| `duration` | Auto-close timer value (ms) |

### Appearance

| Prop | Purpose |
|---|---|
| `status` | Status variant (critical, warning, normal, info, unknown) |
| `kind` | Presentation kind (inline, global, toast) |

### Accessibility

| Prop | Purpose |
|---|---|
| `id` | Anchors `aria-describedby` references |
| `messages` | Localised strings (close button label) |
| `ariaLive` | Live region polarity override |

### Layout

| Prop | Purpose |
|---|---|
| `position` | Viewport edge position for toast FloatingLayer |

---

## 4 — Callback props

### `onClose(event)`

| Item | Detail |
|---|---|
| When it fires | User clicks the CloseButton, or the toast auto-close timer completes and the platform signals dismissal. |
| Arguments | `event` — the synthetic pointer/keyboard event from the CloseButton click; `undefined` when fired by auto-close timer. |
| Return value | Ignored. |

---

## 5 — Enum reference

### `status`

| Value | Description | Icon | Background |
|---|---|---|---|
| `'critical'` | Error or danger requiring immediate attention | StatusCritical | `--hpe-color-background-critical` |
| `'warning'` | Caution — potential issue or risk | StatusWarning | `--hpe-color-background-warning` |
| `'normal'` | Success or expected outcome | StatusGood | `--hpe-color-background-ok` |
| `'info'` | Neutral informational message | Info | `--hpe-color-background-info` |
| `'unknown'` | Status cannot be determined | StatusUnknown | `--hpe-color-background-unknown` |

### `kind`

| Value | Description | Layout |
|---|---|---|
| `'inline'` | Embedded in-page, rounded corners | column |
| `'global'` | Full-width top-of-page banner | row |
| `'toast'` | Floating auto-dismissing overlay | column |

### `position` (toast kind only)

| Value | Description |
|---|---|
| `'top'` | Centered at top of viewport |
| `'top-left'` | Top-left corner |
| `'top-right'` | Top-right corner |
| `'bottom'` | Centered at bottom of viewport |
| `'bottom-left'` | Bottom-left corner |
| `'bottom-right'` | Bottom-right corner |

### `ariaLive`

| Value | Description |
|---|---|
| `'polite'` | Announced when the screen reader is idle |
| `'assertive'` | Interrupts the screen reader immediately |

---

## 6 — Accessibility props

| Prop | ARIA attribute | Required | Default behaviour if omitted |
|---|---|---|---|
| `ariaLive` | `aria-live` on Container | No | `'assertive'` for critical; `'polite'` for all others |
| `messages.close` | `aria-label` on CloseButton | No | `'Close notification'` |
| `id` | `id` on Container | No | No `id` applied; consumers must supply when referencing the notification |
| `actions[].label` | Button/link text and accessible name | Yes (per action) | — |

---

## 7 — Usage examples

### Minimal — required props only

```
<Notification title="File saved." />
```

Renders an inline notification with unknown status, no close button,
no message, and a default unknown status icon.

### Typical — most common real-world usage

```
<Notification
  title="Upload failed."
  message="The file exceeds the 50 MB size limit."
  status="critical"
  onClose={handleClose}
/>
```

Renders an inline critical notification with title, message body, and
a close button.

### Full — all significant props set

```
<Notification
  title="Scheduled maintenance"
  message="The system will be unavailable from 02:00–04:00 UTC."
  status="warning"
  kind="toast"
  autoClose={true}
  duration={8000}
  position="top-right"
  onClose={handleClose}
  actions={[
    { label: "View schedule", href: "/maintenance" },
    { label: "Dismiss", onClick: handleClose }
  ]}
  messages={{ close: "Close maintenance alert" }}
  ariaLive="polite"
  id="maintenance-notification"
/>
```

Renders a warning toast that auto-closes after 8 seconds, positioned
at the top-right, with a message, two action links, and a close button.

---

## 8 — Props not provided

| Omitted prop | Reason |
|---|---|
| `disabled` | Notifications are always active while visible. There is no disabled state concept for a notification. |
| `size` | The component has no size variants in v1. The medium scale is always used. |
| `animate` | Enter/exit animation is a platform-mapping concern, not a component API concern. |
| `color` / `background` | Colors are fully determined by `status` and `kind` via design tokens. Allowing overrides would bypass the token system. |
| `direction` | Layout direction is determined by `kind`, not exposed as a separate prop. |
| `open` / `visible` | Notification presence is controlled by the consumer rendering it (mount/unmount). It does not manage its own visibility externally; toast visibility is managed internally via the auto-close lifecycle. |
