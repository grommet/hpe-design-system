# Select — Constraints

> These rules must never be broken regardless of framework or implementation.
> Status: v3 — GAP-009 corrected

---

## Changelog

| Version | Change |
|---|---|
| v1 | Initial constraints |
| v3 | GAP-009: §2 corrected — drop bottom padding rule was factually wrong |

---

## §1 — No layout shift on state change

The trigger must never change its size between states.

- **Never** change `padding`, `border-width`, `margin`, or `height` between
  rest, focus, hover, open, or disabled states
- Border color changes are allowed — border **width** changes are not
- Use `box-shadow` and `outline` for focus — never `border-color` on focus
- `min-height` must always be applied using
  `--hpe-formField-default-medium-input-container-minHeight` (36px)

---

## §2 — Drop padding applies to both top and bottom

> **v3 correction (GAP-009):** The v1 and v2 constraint stated that `paddingY`
> should only be applied to the top of the drop, with the bottom gap provided
> by the last option's own padding combined with flex gap. This is incorrect.
>
> CSS `gap` on a flex column only adds space **between** items — not after the
> last item. The last option's internal `paddingY` is internal to that element
> and does not create space between the item and the drop edge.

**Correct rule:** Apply `--hpe-select-default-medium-drop-paddingY` to **both**
`padding-top` and `padding-bottom` on the viewport. This ensures consistent
breathing room above the first option and below the last option.

```css
/* Correct */
.hpe-select__viewport {
  padding-block: var(--hpe-select-default-medium-drop-paddingY);
  padding-inline: var(--hpe-select-default-medium-drop-paddingX);
}
```

The drop must always render in a portal — always use `<Select.Portal>`.
Without it the drop is inline and breaks layouts.

---

## §3 — Viewport has no background or border

Only `<Select.Content>` (the drop container) has surface styling —
background, border-radius, and box-shadow.

`<Select.Viewport>` must never have:
- `background`
- `border`
- `border-radius`
- `box-shadow`

These properties belong exclusively to `<Select.Content>`.

---

## §4 — Option `position: relative` is required

Every `<Select.Item>` must have `position: relative` in CSS.
This is required for `<Select.ItemIndicator>` to be positioned
absolutely within the option boundary.

Do not remove this rule. Do not change it to `position: static`.

Option height must never change between states. Do not alter
`padding`, `border-width`, or `min-height` on any state selector.

---

## §5 — Selected marker has rounded outer corners only

The selected marker (`<Select.ItemIndicator>`) must have:
- `border-top-left-radius` — token value
- `border-bottom-left-radius` — token value
- `border-top-right-radius: 0` — always hard zero
- `border-bottom-right-radius: 0` — always hard zero

The right corners are always square — the marker sits flush against
the option's left interior edge.

---

## §6 — Always use `position="popper"` on `<Select.Content>`

HPE Select uses `position="popper"` — not the Radix default of
`"item-aligned"`. This aligns the drop below the trigger, matching
the Grommet Drop behaviour.

Never omit this prop. Never switch to `"item-aligned"`.

---

## §7 — Trigger width matching

With `position="popper"`, use `min-width: var(--radix-select-trigger-width)`
on `<Select.Content>`. This Radix-provided CSS variable ensures the drop
is never narrower than the trigger.

Never hardcode a pixel width on the drop.

---

## §8 — Disabled state uses opacity on the whole trigger

When the trigger is disabled, apply `opacity: 0.3` to the entire
`.hpe-select__trigger`. Do not change individual border colors,
text colors, or background colors on the disabled state.

Child elements (value text, icon) inherit disabled appearance
through opacity — do not apply separate disabled styling to them.

---

## §9 — Do not apply a focus border to the trigger

The trigger must not change its `border-color` on focus.
Focus is communicated exclusively by the two-colour focus ring:

```css
outline: var(--hpe-focusIndicator-outline);
outline-offset: var(--hpe-focusIndicator-outlineOffset);
box-shadow: var(--hpe-focusIndicator-boxShadow);
```

Both `outline` and `box-shadow` must be applied together.
Never apply only one of them.

---

## §10 — Icon size is controlled by CSS, not by the icon component prop

The trigger icon must be sized using
`--hpe-element-medium-icon-size` (16px) via CSS:

```css
.hpe-select__icon svg {
  width: var(--hpe-element-medium-icon-size);
  height: var(--hpe-element-medium-icon-size);
}
```

Do not use the `size` prop on `<FormDown>` or any other grommet-icons
component to control size. The `size` prop maps to Grommet-internal
size names that do not correspond to HPE token values.

---

## §11 — No hardcoded values

All visual properties must use CSS custom properties from `hpe-design-tokens`.
If a token is missing, log it in `innovation/GAPS.md` and use the closest
available token with a comment.

See: `innovation/INSTRUCTIONS.md §8`