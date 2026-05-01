# Notification — props.md

Platform-agnostic public API contract for the `notification` component.
No framework references.

---

## 1 — Overview

**What the component does:**
A Notification communicates a system or application event. It renders a
container with a status icon, title text, optional body message, optional
inline actions, and an optional close button. It appears in one of three
kinds: inline (embedded in page flow), global (full-width banner), or toast
(floating overlay with auto-dismiss).

**What renders by default with no props set:**
A Container with an `unknown` status icon, no title, no message, no close
button, and `kind='inline'` layout.

**What the consumer controls:**
- Content: title, message, actions, status icon
- Status variant: determines background, icon, and text colors
- Kind: inline, global, or toast layout
- Dismiss behaviour: `onClose` handler; `autoClose` and `duration` for toast
- Accessibility: ARIA live region polarity, accessible labels

**What the component handles internally:**
- Auto-close timer management (toast kind)
- Timer pause/resume on hover and focus (toast kind)
- Status icon selection from the icon map
- ARIA role and `aria-live` defaults based on status
- Padding split between content area and CloseButton

---

## 2 — Props table

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | `undefined` | Yes | Primary notification label. Displayed prominently. |
| `message` | `string \| node` | `undefined` | No | Body text below the title (inline/toast) or inline with title (global). |
| `status` | `'critical' \| 'warning' \| 'normal' \| 'unknown' \| 'info'` | `'unknown'` | No | Determines background color, icon, title color, and message color. |
| `kind` | `'inline' \| 'global' \| 'toast'` | `'inline'` | No | Layout variant. Controls shape, padding, floating layer, and text layout. |
| `onClose` | `function` | `undefined` | No | Called when the user dismisses the notification. When absent, no CloseButton is rendered. |
| `actions` | `array` | `undefined` | No | Inline links or buttons after the message. Each item: `{ label: string, href?: string, onClick?: function }`. |
| `icon` | `node` | `undefined` | No | Override the default status icon. When provided, replaces the status-derived icon. |
| `autoClose` | `boolean` | `true` | No | Toast only. When `true`, the notification auto-dismisses after `duration` ms. When `false`, it persists until explicitly closed. |
| `duration` | `number` | `8000` | No | Toast only. Auto-close delay in milliseconds. Has no effect when `autoClose=false`. |
| `time` | `number` | `undefined` | No | Grommet-parity alias for `duration`. When provided, overrides `duration`. |
| `position` | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` | No | Toast only. Viewport position of the FloatingLayer. |
| `id` | `string` | `undefined` | No | Applied to the Container element. For external reference and ARIA targeting. |
| `messages` | `object` | `{ close: 'Close notification' }` | No | Localisation object. Currently supports `messages.close` for the CloseButton `aria-label`. |
| `ariaLive` | `'polite' \| 'assertive'` | `undefined` | No | Override the default ARIA live region polarity. Defaults: `assertive` for critical, `polite` for all others. |

---

## 3 — Prop groups

### Content

| Prop | Purpose |
|---|---|
| `title` | Primary notification label |
| `message` | Body text (string or node) |
| `actions` | Inline action links or buttons |
| `icon` | Icon node — overrides status icon |

### Behaviour

| Prop | Purpose |
|---|---|
| `onClose` | Dismiss callback; also controls whether CloseButton renders |
| `autoClose` | Toast only — enable or disable auto-dismiss |
| `duration` | Toast only — auto-dismiss delay in ms |
| `time` | Alias for `duration` (Grommet parity) |

### Appearance

| Prop | Purpose |
|---|---|
| `status` | Status variant — drives background, icon, text colors |
| `kind` | Layout kind — inline, global, or toast |
| `position` | Toast FloatingLayer position in the viewport |

### Accessibility

| Prop | Purpose |
|---|---|
| `ariaLive` | Override ARIA live polarity (`polite` / `assertive`) |
| `messages` | Localisable string object for accessible labels |
| `id` | Element ID for external ARIA association |

### Layout

| Prop | Purpose |
|---|---|
| `position` | Toast FloatingLayer viewport position |

---

## 4 — Callback props

### `onClose`

- **When it fires:** When the user activates the CloseButton (click or keyboard
  Enter/Space). For toast kind, also fires when the auto-close timer expires
  (depending on platform implementation).
- **Arguments:** `(event)` — the originating DOM or synthetic event. May be
  `undefined` when fired by the auto-close timer.
- **Return value:** Ignored.
- **Side effect:** The component does not manage its own open state. The
  consumer is responsible for unmounting or hiding the notification after
  this fires.

### `actions[n].onClick`

- **When it fires:** When the user activates an action element.
- **Arguments:** `(event)` — the originating event.
- **Return value:** Ignored.

---

## 5 — Enum reference

### `status`

| Value | Background (inline/global) | Icon | Typical use |
|---|---|---|---|
| `critical` | `--hpe-color-background-critical` | `StatusCritical` | Error, failure, danger |
| `warning` | `--hpe-color-background-warning` | `StatusWarning` | Caution, degraded state |
| `normal` | `--hpe-color-background-ok` | `StatusGood` | Success, healthy |
| `unknown` | `--hpe-color-background-unknown` | `StatusUnknown` | Indeterminate, no data |
| `info` | `--hpe-color-background-info` | `Info` | Neutral information |

### `kind`

| Value | Layout | Background | Border-radius | FloatingLayer |
|---|---|---|---|---|
| `inline` | Embedded in flow | Status-based | `--hpe-radius-xsmall` | No |
| `global` | Full-width banner | Status-based | `--hpe-radius-none` | No |
| `toast` | Floating overlay | Always `background-front` | `--hpe-radius-xsmall` | Yes |

### `position` (toast only)

| Value | Viewport placement |
|---|---|
| `top` | Top-centre |
| `top-left` | Top-left corner |
| `top-right` | Top-right corner |
| `bottom` | Bottom-centre |
| `bottom-left` | Bottom-left corner |
| `bottom-right` | Bottom-right corner |

### `ariaLive`

| Value | ARIA equivalent | When to use |
|---|---|---|
| `polite` | `aria-live="polite"` | Non-urgent — waits for idle before announcing |
| `assertive` | `aria-live="assertive"` | Urgent — interrupts the user immediately |

---

## 6 — Accessibility props

| Prop | ARIA attribute | Required | Default behaviour when omitted |
|---|---|---|---|
| `ariaLive` | `aria-live` | No | `assertive` when `status='critical'`, `polite` otherwise |
| `messages.close` | `aria-label` on CloseButton | No (only if CloseButton renders) | `'Close notification'` |
| `id` | `id` on Container | No | No ID applied |

**Role selection:**
- When `ariaLive` resolves to `assertive` → Container receives `role="alert"` (equivalent to `aria-live="assertive"` + `aria-atomic="true"`)
- When `ariaLive` resolves to `polite` → Container receives `role="status"`
- `aria-atomic="true"` must always be applied
- StatusIcon wrapper must have `aria-hidden="true"` — status is already communicated in the title text

---

## 7 — Usage examples

### Minimal — required props only

```
Notification(
  title: "System alert"
)
```

Renders with `status='unknown'`, `kind='inline'`, no message, no close button.

### Typical — most common real-world usage

```
Notification(
  title: "Storage threshold approaching"
  message: "Disk usage has reached 85%. Consider expanding capacity soon."
  status: "warning"
  kind: "inline"
  onClose: () => dismissNotification()
)
```

Renders an inline warning notification with a CloseButton.

### Full — all significant props set

```
Notification(
  title: "Node unreachable"
  message: "Node cluster-3 has stopped responding. Failover has been initiated."
  status: "critical"
  kind: "toast"
  position: "top-right"
  autoClose: true
  duration: 10000
  onClose: (event) => setToastOpen(false)
  actions: [
    { label: "View logs", href: "/logs/cluster-3" },
    { label: "Dismiss", onClick: () => setToastOpen(false) }
  ]
  messages: { close: "Dismiss critical alert" }
  ariaLive: "assertive"
  id: "node-unreachable-toast"
)
```

---

## 8 — Props not provided

| What | Why |
|---|---|
| `open` / `visible` | The component does not own its own open state. The consumer controls visibility by mounting or unmounting the notification (or, for toast, by managing `open` state externally through the platform's live region primitive). Exposing `open` as a prop on the Notification itself would conflate two separate concerns. |
| `color` | Background and text color are always derived from `status` and `kind`. Exposing a `color` override would bypass the semantic token system and create inaccessible combinations. |
| `size` | The notification has a fixed typographic and spacing scale (`medium`) with no size variant in the reference theme. |
| `elevation` | The `box-shadow` value is fixed for the toast kind (`--hpe-shadow-medium`). Custom elevation levels are not part of the spec. |
| `rounded` / `borderRadius` | Border-radius is fixed per kind (see §3 kind enum). No per-instance override. |
| `direction` | Layout direction (column vs inline) is determined by `kind`. The global kind is always inline; inline and toast are always column. This is not consumer-configurable at the notification level. |
