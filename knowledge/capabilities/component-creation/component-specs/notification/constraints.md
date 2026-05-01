# Notification — constraints.md

Platform-agnostic implementation rules for the `notification` component.
These constraints must be respected in every framework mapping.
No framework references.

---

## §1 — No layout shift between states

The Container must not change its size, padding, or border between states.
`padding-block`, `padding-inline-start`, `border-radius`, and `box-shadow`
are fixed at rest and must not change on hover, focus, or any other state.
Changes to content (e.g. message text length) may affect height, but padding
and shape must remain stable.

---

## §2 — Status colors are mutually exclusive

Exactly one status is active at a time. The corresponding background,
icon color, title color, and message color tokens must all be applied together.
Partial application (e.g. background but not icon color) is not permitted.

Status → token sets:

| Status | Background (inline/global) | Icon | Title (inline/global) | Message (inline/global) |
|---|---|---|---|---|
| critical | `--hpe-color-background-critical` | `--hpe-color-icon-critical` | `--hpe-color-text-onCritical-strong` | `--hpe-color-text-onCritical` |
| warning | `--hpe-color-background-warning` | `--hpe-color-icon-warning` | `--hpe-color-text-onWarning-strong` | `--hpe-color-text-onWarning` |
| normal | `--hpe-color-background-ok` | `--hpe-color-icon-ok` | `--hpe-color-text-onOk-strong` | `--hpe-color-text-onOk` |
| unknown | `--hpe-color-background-unknown` | `--hpe-color-icon-unknown` | `--hpe-color-text-onUnknown-strong` | `--hpe-color-text-onUnknown` |
| info | `--hpe-color-background-info` | `--hpe-color-icon-info` | `--hpe-color-text-onInfo-strong` | `--hpe-color-text-onInfo` |

---

## §3 — Kind variants are mutually exclusive

A notification is in exactly one kind at a time: inline, global, or toast.
The kind determines:
- Container shape: `--hpe-radius-xsmall` (inline/toast) or `--hpe-radius-none` (global)
- Horizontal padding: `--hpe-spacing-xsmall` (inline/toast) or `--hpe-spacing-xlarge` (global)
- Layout of Title + Message: column (inline/toast) or inline row (global)
- FloatingLayer: present (toast only)

No combination of kind tokens may be applied simultaneously.

---

## §4 — Toast always overrides status background and text colors

When `kind='toast'`, status background tokens must NOT be applied to the
Container. The Container must use `--hpe-color-background-front` exclusively.
Similarly, Title and Message text colors must use `--hpe-color-text-strong`
and `--hpe-color-text-default` respectively — not the per-status on-color
variants. The `box-shadow: --hpe-shadow-medium` token must also be applied
to the toast Container. Omitting the shadow is not acceptable.

---

## §5 — Auto-close timer pauses on hover and on focus

For `kind='toast'` with `autoClose=true`, the dismiss timer must be suspended
while the pointer is over the toast or keyboard focus is within the toast.
The timer resumes when the pointer leaves or focus moves out. This ensures
users who are reading or interacting with the notification are not interrupted.

---

## §6 — Focus indicator uses all three tokens together

The focus ring for CloseButton and Actions must always apply all three tokens:

```
outline:        var(--hpe-focusIndicator-outline);
outline-offset: var(--hpe-focusIndicator-outlineOffset);
box-shadow:     var(--hpe-focusIndicator-boxShadow);
```

Never use only one or two of these tokens. Never substitute a custom
`outline` or `box-shadow` value — it will break the two-colour ring.
These tokens are defined in `global.css` and apply to `:focus-visible` only.

---

## §7 — CloseIcon and StatusIcon use the same size token

Both the status icon and the close button icon must be sized using:

```
width:  var(--hpe-icon-medium-size);   /* 16px */
height: var(--hpe-icon-medium-size);   /* 16px */
```

Sizing via a component-specific prop (e.g. `size="medium"`) is acceptable
only when it resolves to the same 16px value. If the prop does not respect
this token, use CSS to override.

---

## §8 — ARIA requirements

| Kind | Role | aria-live | Notes |
|---|---|---|---|
| inline | `status` or `alert` | `polite` (default) or `assertive` for critical | `aria-atomic="true"` required |
| global | `status` or `alert` | `polite` (default) or `assertive` for critical | `aria-atomic="true"` required |
| toast | Managed by live region primitive | `polite` (default) or `assertive` for critical | Implemented via the platform's live region mechanism |

- `status='critical'` should use `aria-live="assertive"` (interrupts the user)
- All other statuses use `aria-live="polite"` (waits for idle)
- The StatusIcon must be `aria-hidden="true"` — status is conveyed in the Title text
- The CloseButton must have an accessible label (e.g. `aria-label="Close notification"`)

---

## §9 — CloseButton is conditional

The CloseButton must only be rendered when an `onClose` handler is provided.
When absent, there must be no reserved space, no invisible button, and no
padding gap where the button would appear. The Container end-side padding
must be applied directly to the content area when no CloseButton is present.

---

## §10 — Text alignment is always left

`text-align: left` must be set explicitly on the Container, Title, and Message.
Never rely on browser defaults or inherited values.
There is no token for this value — set it as the literal value `left`.
This applies to all three kinds (inline, global, toast) without exception.

---

## §11 — Icon aligns to the top of the first line of text

The StatusIcon must align to the cap-height of the first line of the adjacent
Title text, not the center of the full text block. This is achieved by:

```
align-items: flex-start;
```

on the Container (or the inner row that contains the IconContainer and
TextContainer). This ensures that when the message is long and wraps to
multiple lines, the icon remains pinned to the top of the content — not
floating mid-way through the text block.

---

## §12 — All visual properties must use CSS custom properties

Every colour, spacing, radius, shadow, font-size, font-weight, line-height,
and z-index value must be sourced from an `hpe-design-tokens` CSS variable.
If a required token does not exist, log it in `gaps.md` and document
the workaround used (e.g. a sibling semantic token or a hardcoded exception
with a comment). Hardcoded values with no token equivalent and no gap entry
are not permitted.
