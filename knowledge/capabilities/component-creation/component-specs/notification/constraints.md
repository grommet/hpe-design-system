# Notification — constraints.md

Rules that must never be broken regardless of framework or implementation.
Every constraint references exact CSS variable names from `tokens.md`.

---

## §1 — No layout shift between states

Do not change the size, padding, or border-width of any part when
transitioning between states (rest → hover → focus → active → dismissed).
Specifically:

- Container `padding-inline` and `padding-block` must remain fixed at
  `--hpe-spacing-xsmall` / `--hpe-spacing-3xsmall` (inline/toast) or
  `--hpe-spacing-xlarge` / `--hpe-spacing-3xsmall` (global) across all states.
- CloseButton must not change its own padding, size, or border on hover or focus.
- No border is added or removed on interaction; shape changes must not shift
  surrounding content.

---

## §2 — Status is mutually exclusive

Exactly one status may be active at a time:
`critical`, `warning`, `normal`, `info`, or `unknown`.

The combination of background color, icon color, and text colors defined
in `tokens.md` for each status must all change together — never mix
tokens from different statuses.

For example, a `critical` notification must use:
- `--hpe-color-background-critical` (inline/global)
- `--hpe-color-icon-critical`
- `--hpe-color-text-onCritical-strong` (title)
- `--hpe-color-text-onCritical` (message)

Not any combination from another status variant.

---

## §3 — Kind is mutually exclusive

Exactly one kind may be active at a time: `inline`, `global`, or `toast`.
The component must not combine kind-specific tokens from different kinds.

- `inline` uses `--hpe-radius-xsmall` and `--hpe-spacing-xsmall` padding.
- `global` uses `--hpe-radius-none` and `--hpe-spacing-xlarge` padding.
- `toast` uses `--hpe-radius-xsmall`, `--hpe-spacing-xsmall` padding,
  and always `--hpe-color-background-front` regardless of status.

---

## §4 — Toast background is always front regardless of status

When `kind = 'toast'`, the Container background must always be
`--hpe-color-background-front`. The status-specific backgrounds
(`--hpe-color-background-critical`, etc.) must NOT be applied in
toast kind.

The status icon color still uses the status-specific icon token
(`--hpe-color-icon-critical` etc.) to convey status in the toast.

Title must use `--hpe-color-text-strong` and message must use
`--hpe-color-text-default` in toast kind — not the `onX` variants.

---

## §5 — Toast auto-closes by default

When `kind = 'toast'`, the notification must auto-close after the
configured `duration` has elapsed. A consumer setting `autoClose = false`
must prevent the timer entirely. The timer must:

- Pause when the user focuses or hovers on the notification.
- Resume when focus/hover is lost.
- Be cancelled if the notification is explicitly dismissed before it fires.

---

## §6 — Close button focus must always use all three focus tokens

When the CloseButton receives keyboard focus, all three focus indicator
tokens must be applied together:

```css
outline: var(--hpe-focusIndicator-outline);
outline-offset: var(--hpe-focusIndicator-outlineOffset);
box-shadow: var(--hpe-focusIndicator-boxShadow);
```

Never apply only one or two of these tokens. Never use `outline` alone.
The same rule applies to any Action link that receives focus.

---

## §7 — Custom icon does not change status semantics

When a custom `icon` is provided, it replaces the default StatusIcon
visually. The status prop still determines the background color and text
colors. The custom icon does not override the Container background or
text tokens.

---

## §8 — ARIA live region requirements

- `inline` and `global` kinds must expose the notification as a live
  region so assistive technologies announce the content.
  - Default sensitivity: `aria-live="polite"` (or `role="status"`).
  - For `critical` status: `aria-live="assertive"` (or `role="alert"`)
    to interrupt the user immediately.
- `toast` kind relies on the platform's live region mechanism.
  Toasts must be announced at the appropriate priority matching the
  `status` (polite for info/normal/warning/unknown; assertive for critical).
- The close button must have an accessible label (e.g. "Close notification").

---

## §9 — Action links must not replace the close action

The `actions` array provides supplementary links, not a replacement for
the dismiss mechanism. If a notification is dismissible (`onClose` is
provided), the CloseButton must still be rendered alongside any actions.
An action link being clicked must not implicitly close the notification
unless the consumer's `onClose` handler is also triggered.

---

## §10 — No hardcoded values

All visual properties must use CSS custom properties from `hpe-design-tokens`.
If a token is missing, log it in `gaps.md` with a workaround comment.

Current known exception:

- Toast FloatingLayer `z-index` has no dedicated token.
  Workaround: use `var(--hpe-drop-default-zIndex)` with a comment.
  See GAP-002.
