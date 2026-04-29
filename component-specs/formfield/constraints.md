# FormField — Constraints

> These rules must never be broken regardless of framework or implementation.
> Status: v1 draft

---

## §1 — No layout shift on state change

The input container must never change its size between states.

- **Never** change `padding`, `border-width`, `margin`, or `height` between rest, focus, error, success, or disabled states
- Border color changes are allowed — border **width** changes are not
- If a visual state change is needed that would affect layout, use `box-shadow` or `outline` on the **child input**, not on the FormField container
- The FormField container itself never renders a focus ring — focus styling belongs to the child input

---

## §2 — Help, error, success, and info text are mutually exclusive

Only one message below the input container may be visible at a time:

| Priority | Message type | Condition |
|---|---|---|
| 1 (highest) | Error | When validation fails |
| 2 | Success | When validation passes |
| 3 | Info | When explicitly set |
| 4 (lowest) | Help | Default — shown when no other message |

Never show two message types simultaneously. The container height must
not jump when switching between message types — all message variants
must use the same font size and line height tokens.

---

## §3 — Label is always above the input

HPE FormField never uses inline labels (label to the left of the input).
The label always sits above the input container with a consistent margin.

Do not alter label placement based on screen size, state, or content.

---

## §4 — Disabled state uses opacity, not individual token overrides

When a FormField is disabled:

- Apply `opacity: 0.3` (or the resolved token value) to the **entire FormField root**
- Do not change individual border colors, text colors, or background colors
- The child input inherits disabled appearance through opacity — do not
  apply separate disabled styling to the child

> This mirrors the same pattern established in Select constraints.
> Consistency across form controls is required.

---

## §5 — Required indicator is never the only indication of required state

The asterisk is a visual affordance only. The underlying `<input>` or
Radix form control must always have `required` set programmatically
so that the required state is communicated to assistive technology.

Do not rely on the `*` character alone.

---

## §6 — Error, success, and info messages must be associated with the input

Messages below the input must be programmatically associated with the
input control via `aria-describedby` so screen readers announce them.

In `@radix-ui/react-form`, this is handled automatically by
`<Form.Message>` — do not override or remove this association.

---

## §7 — The input container never sets a fixed height

Height is always determined by the child input's content and padding.
Never set `height` or `min-height` on the input container.

---

## §8 — No hardcoded values

All visual properties must use CSS custom properties from `hpe-design-tokens`.
If a token does not exist, log it in `innovation/GAPS.md` and use the
closest available token with a comment.

See: `innovation/INSTRUCTIONS.md §8`