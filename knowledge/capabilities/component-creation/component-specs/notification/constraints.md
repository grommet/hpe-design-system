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

The combination of background color, icon, icon color, and text colors
defined in `tokens.md` for each status must all change together — never
mix tokens from different statuses.

For `critical` inline or global, ALL of the following must apply together:
- Background: `--hpe-color-background-critical`
- Icon: `StatusCritical` component with `--hpe-color-icon-critical`
- Title color: `--hpe-color-text-onCritical-strong`
- Message color: `--hpe-color-text-onCritical`

---

## §3 — Kind is mutually exclusive

Exactly one kind may be active at a time: `inline`, `global`, or `toast`.
The component must not combine kind-specific tokens from different kinds.

- `inline` uses `--hpe-radius-xsmall` and `--hpe-spacing-xsmall` padding.
- `global` uses `--hpe-radius-none` and `--hpe-spacing-xlarge` padding.
- `toast` uses `--hpe-radius-xsmall`, `--hpe-spacing-xsmall` padding,
  `--hpe-shadow-medium`, and always `--hpe-color-background-front`.

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

## §6 — Focus must always use all three focus tokens together

When the CloseButton or any Action link receives keyboard focus, all three
focus indicator tokens must be applied together:

```css
outline: var(--hpe-focusIndicator-outline);
outline-offset: var(--hpe-focusIndicator-outlineOffset);
box-shadow: var(--hpe-focusIndicator-boxShadow);
```

Never apply only one or two of these tokens. Never use `outline` alone.

---

## §7 — Custom icon does not change status semantics

When a custom `icon` prop is provided, it replaces the default StatusIcon
visually. The `status` prop still determines the Container background and
all text colors. The custom icon does not override any Container or text
tokens.

---

## §8 — ARIA live region requirements

- `inline` and `global` kinds must expose the notification as a live region
  so assistive technologies announce the content on render.
  - Default: `aria-live="polite"` (or equivalent `role="status"`).
  - For `status='critical'`: `aria-live="assertive"` (or `role="alert"`)
    to interrupt the user immediately.
- `toast` kind relies on the platform's live region mechanism (e.g. an
  ARIA live region in the viewport container). Toasts must be announced
  at the priority matching their status:
  - `critical` → assertive / foreground
  - all others → polite / background
- The CloseButton must always have an accessible label (e.g. "Close notification").

---

## §9 — Actions must not replace the CloseButton

The `actions` array provides supplementary links, not a replacement for the
dismiss mechanism. If a notification is dismissible (`onClose` is provided),
the CloseButton must still be rendered alongside any actions. An action being
clicked must not implicitly close the notification unless the consumer's
`onClose` handler is also triggered.

---

## §10 — Text alignment is always left

All text in all parts of the notification — Title, Message, Actions —
must be `text-align: left` in all three kinds (inline, global, toast).

Text alignment must never be inherited from a parent or assumed to be left.
It must be set explicitly on the Container or TextContainer so that it
cannot be overridden by an ancestor with center or right alignment.

There is no token for this value. Set `text-align: left` in CSS directly.

---

## §11 — Icon aligns to the top of the first line of text

The StatusIcon must be aligned to the **top** of the TextContainer, not
centered on the full notification height. When the message is long and wraps
to multiple lines, the icon must remain pinned to the top alongside the title,
not drift to the vertical center.

Implement by setting `align-items: flex-start` (or equivalent) on the row
that contains the IconContainer and TextContainer.

This constraint applies to all three kinds and is not status-specific.

---

## §12 — No hardcoded values

All visual properties must use CSS custom properties from `hpe-design-tokens`.
If a token is missing, log it in `gaps.md` with a workaround comment.

Current known exceptions:

- Toast FloatingLayer `z-index` has no dedicated token.
  Workaround: `var(--hpe-drop-default-zIndex)` with a comment.
  See GAP-002.
- `text-align: left` has no token — set literally. See §10.
