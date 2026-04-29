# Select — Grommet Mapping

> Maps the platform-agnostic Select spec to Grommet's theme and component API.
> Read alongside: `../anatomy.md`, `../tokens.md`, `../constraints.md`
>
> Grommet components used: `Select`, `SelectMultiple`
> Theme keys: `select`, `selectMultiple`, `button.option`, `global.drop`
> Source of truth for these mappings: `grommet-theme-hpe/src/js/themes/hpe.js`
> Status: v1 draft

---

## How Grommet implements Select

Grommet's Select is not a single self-contained component. Its visual 
output is composed from several theme keys spread across the theme object:

| Anatomy part | Grommet theme key(s) |
|---|---|
| Trigger | `global.control`, `global.input` (via FormField) |
| Drop | `global.drop` |
| Listbox | `select.listbox` |
| Option | `button.option`, `button.hover.option`, `button.selected.option`, `button.disabled.option` |
| Selected Marker | `button.active.extend`, `button.selected.option.extend` |
| Clear Button | `select.clear` |
| Search Input | `select.search` |
| Icons (chevron, search) | `select.icons` |

> **Key insight for non-Grommet implementations:** Options in Grommet are 
> rendered as `Button` components with `kind="option"`. This is why option 
> tokens live under `button.*` in the theme, not under `select.*`. 
> In other frameworks, these tokens apply to whatever element renders 
> each list item.

---

## 1. Trigger

Grommet's Select trigger inherits from the global form input theme.
There is no `select.trigger` theme key — the trigger is styled globally.

```js
// grommet-theme-hpe/src/js/themes/hpe.js

global: {
  control: {
    border: {
      radius: components.hpe.formField.default.medium.input.container.borderRadius,
      color: components.hpe.formField.default.input.container.rest.borderColor,
    },
  },
  input: {
    font: {
      weight: components.hpe.formField.default.medium.value.fontWeight,
    },
    padding: {
      horizontal: components.hpe.formField.default.medium.input.container.paddingX,
      vertical: components.hpe.formField.default.medium.input.container.paddingY,
    },
  },
}
```

**Disabled state:**
```js
select: {
  control: {
    extend: ({ disabled }) => css`
      ${disabled && `opacity: 0.3;`}
    `,
  },
}
```

---

## 2. Drop

```js
// grommet-theme-hpe/src/js/themes/hpe.js

global: {
  drop: {
    background: components.hpe.drop.default.background,
    border: {
      radius: components.hpe.drop.default.borderRadius,
    },
    margin: components.hpe.drop.default.margin,
    intelligentMargin: true,       // enables automatic flip behaviour
    shadowSize: 'medium',          // maps to global.elevation.medium
    zIndex: components.hpe.drop.default.zIndex,
  },
}
```

**Drop internal padding and gap (applied via extend on the listbox):**
```js
select: {
  listbox: {
    extend: () => `
      padding-top: ${components.hpe.select.default.medium.drop.paddingY};
      padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
      display: flex;
      flex-direction: column;
      gap: ${components.hpe.select.default.medium.drop.gapY};
    `,
  },
}
```

> **Note:** `paddingY` is applied only to `padding-top`, not `padding-bottom`.
> See `constraints.md §2` for why.

---

## 3. Option

In Grommet, options are `Button` components with `kind="option"`.
All option token application flows through `button.*` theme keys.

**Rest state:**
```js
button: {
  option: {
    color: components.hpe.select.default.option.rest.textColor,
    border: {
      radius: components.hpe.select.default.medium.option.borderRadius,
      width: components.hpe.select.default.medium.option.borderWidth,
      color: components.hpe.select.default.option.rest.borderColor,
    },
    pad: {
      horizontal: components.hpe.select.default.medium.option.paddingX,
      vertical: components.hpe.select.default.medium.option.paddingY,
    },
    font: {
      weight: components.hpe.select.default.option.rest.fontWeight,
    },
  },
}
```

**Hover state:**
```js
button: {
  hover: {
    option: {
      background: components.hpe.select.default.option.hover.background,
      border: {
        color: components.hpe.select.default.option.hover.borderColor,
      },
      color: components.hpe.select.default.option.hover.textColor,
    },
  },
}
```

**Selected state:**
```js
button: {
  selected: {
    option: {
      background: components.hpe.select.default.option.selected.rest.background,
      border: {
        color: components.hpe.select.default.option.selected.rest.borderColor,
      },
      color: components.hpe.select.default.option.selected.rest.textColor,
      font: {
        weight: components.hpe.select.default.option.selected.rest.fontWeight,
      },
    },
  },
}
```

**Selected + hover state:**
```js
button: {
  hover: {
    option: {
      // applied via extend when aria-selected is true
      extend: (props) =>
        props['aria-selected'] && `
          background: ${components.hpe.select.default.option.selected.hover.background};
          color: ${components.hpe.select.default.option.selected.hover.textColor};
        `,
    },
  },
}
```

**Disabled state:**
```js
button: {
  disabled: {
    option: {
      background: components.hpe.select.default.option.disabled.rest.background,
      border: {
        color: components.hpe.select.default.option.disabled.rest.borderColor,
      },
      color: components.hpe.select.default.option.disabled.rest.textColor,
      font: {
        weight: components.hpe.select.default.option.disabled.rest.fontWeight,
      },
    },
  },
}
```

---

## 4. Selected Marker

Grommet implements the Selected Marker as a CSS `::before` pseudo-element
applied via `extend` on the selected option button.

```js
button: {
  selected: {
    option: {
      extend: ({ theme, disabled }) => `
        position: relative;
        &::before {
          display: block;
          position: absolute;
          content: '';
          width: ${components.hpe.select.default.medium.option.marker.width};
          border-top-left-radius: ${components.hpe.select.default.medium.option.marker.borderTopLeftRadius};
          border-bottom-left-radius: ${components.hpe.select.default.medium.option.marker.borderBottomLeftRadius};
          top: ${components.hpe.select.default.medium.option.marker.top};
          bottom: ${components.hpe.select.default.medium.option.marker.bottom};
          left: ${components.hpe.select.default.medium.option.marker.left};
          background: ${
            !disabled
              ? components.hpe.select.default.option.marker.rest.background
              : 'border-disabled'
          };
        }
      `,
    },
  },
}
```

> **For non-Grommet implementations:** The `::before` pseudo-element is 
> a CSS web implementation detail. The anatomical requirement is simply 
> that a non-flow element appears on the leading edge of the selected option.
> In Radix, this is handled via `<Select.ItemIndicator>`. 
> See `mappings/radix.md`.

---

## 5. Clear Button

```js
select: {
  clear: {
    container: {
      background: 'transparent',
      pad: components.hpe.select.default.medium.drop.paddingX,
    },
    button: {
      border: {
        radius: components.hpe.select.default.medium.option.borderRadius,
        size: components.hpe.select.default.medium.option.borderWidth,
      },
      padding: {
        horizontal: components.hpe.select.default.medium.option.paddingX,
        vertical: components.hpe.select.default.medium.option.paddingY,
      },
      hover: {
        background: components.hpe.select.default.option.hover.background,
        color: 'text-strong',
      },
      color: 'text-strong',
      font: {
        weight: components.hpe.select.default.option.rest.fontWeight,
      },
    },
  },
}
```

---

## 6. Icons

```js
select: {
  icons: {
    color: 'icon',        // semantic alias → hpe.color.icon.default
    down: Down,           // chevron icon when closed
    up: Up,               // chevron icon when open
    search: <Search aria-hidden />,
    margin: {
      left: 'xsmall',
      right: '12px',      // hardcoded — no token — see gaps below
    },
  },
}
```

---

## 7. Grommet Select props reference

These are the key props on `<Select>` that affect visual output.
This is not a complete props list — see Grommet docs for full reference.

| Prop | Type | Effect | Token / value |
|---|---|---|---|
| `disabled` | `boolean` | Applies `opacity: 0.3` to trigger | Hardcoded opacity — no token |
| `multiple` | `boolean` | Switches to `SelectMultiple` behaviour | — |
| `searchPlaceholder` | `string` | Shows search input when set | — |
| `clear` | `boolean \| object` | Shows Clear Button | See `select.clear` theme key |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | Changes button/option sizing | Size tokens — medium is default |
| `dropProps` | `object` | Passes props to the Drop container | Merges with `global.drop` |
| `dropHeight` | `string` | Controls max height of the Drop | Semantic sizing token |
| `valueLabel` | `node` | Custom render for trigger value | — |

---

## 8. Known gaps in Grommet mapping

| Gap | Detail | Impact |
|---|---|---|
| Icon right margin is hardcoded to `12px` | No token controls this value | Minor — icon spacing can't be updated via tokens alone |
| Trigger disabled opacity is hardcoded to `0.3` | No `opacity` token in the token library | If the disabled treatment ever changes, it requires a code change not a token update |
| `selected + hover` state uses `aria-selected` detection via `extend` | This is a workaround for a Grommet limitation | Non-Grommet implementations should use their framework's selected+hover state detection instead |
| No explicit `open` state token on the trigger | The open state is not visually differentiated from rest in the current spec | Future: may want a border-color or background token for the trigger when the drop is open |