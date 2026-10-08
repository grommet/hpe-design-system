# HPE Design Token Resolver for VS Code

Hover a supported, imported Grommet component or HPE icon value to see its
resolved HPE Design Token value. In JSX and TSX files, completion suggestions
offer the available manifest-backed values inside supported string props, with
each suggestion showing its resolved value inline. Color token hovers and
completion documentation include an inline swatch beside the resolved value.

Supported layout props are `gap`, `margin`, `pad`, `round`, `borderWidth`, and
`background`, including nested `pad`, `margin`, `background.color`, and
`border.color` and `border.size` values. Layout `width` and `height` values,
including `min` and `max` object values, resolve against container tokens. It
also supports direct semantic background aliases such as `decorative-blue` and
`foreground-critical` when a generated token exists. It supports the
`size` and semantic `color` props on Grommet `Text` and `Heading`, plus semantic
`color`, `size`, and `margin` on `Text`, plus semantic `color`, `size`, and
`margin` on `Heading`, `Paragraph`, and `Anchor`, plus semantic `color` and
`size` on `Paragraph` and `Anchor`. Named HPE icons support semantic
`color` and `size` props. Grommet `Button` supports spacing-token `gap`,
`margin`, and `pad` props, semantic `color`, and direct semantic
`hoverIndicator`. Grommet `Box` and `Button` also support one-level object-form
semantic `hoverIndicator.color` and `hoverIndicator.background` values. Grommet
`Calendar`, `Chart`, `List`, and `Skeleton`
support spacing-token `margin` props. Grommet `Chart`, `DataChart`, and `List`
support spacing-token `pad` props. Grommet `Drop` supports spacing-token
`margin` and radius-token `round` props. Grommet `Skeleton` supports
spacing-token `pad` and radius-token `round` props. Grommet `CheckBox` supports
a spacing-token `pad` prop. Grommet `DataTable`, `Image`, `Meter`, `Stack`,
`Table`, and `Tabs` support spacing-token `margin` props. HPE CSS custom
properties, such as
`--hpe-spacing-medium`, resolve in CSS-family files.

Grommet `Grid` supports container-token `rows` and `columns`, including the
`size` field in responsive object-form `columns` values.

Grommet `DataTable` also supports direct and object-form semantic `background`,
object-form border color and size, and spacing-token `pad` props. Grommet
`Spinner` supports semantic `color`.

Grommet `Chart`, `Diagram` connection colors, and `Meter` support semantic
`color`. Grommet `Drop` supports the same layout token props as `Box`, including
spacing, dimensions, radius, borders, and semantic backgrounds. Grommet
`Skeleton` supports container-token
`height` and `width`, including `min` and `max` object values. Grommet
`TextInput` supports container-token `width`, including `min` and `max` object
values. Grommet `Carousel` supports container-token `height` and `width`,
including `min` and `max` object values. Grommet `Button`, `Meter`, `RangeInput`, `RangeSelector`, and
`WorldMap` support semantic `color`; `WorldMap` also supports semantic
`hoverColor`. Grommet and `Layer` support direct and object-form semantic
`background` values. Grommet `Layer` also supports spacing-token `margin`, and
Grommet `List` supports direct semantic `background` values. Grommet `Menu`
supports direct and object-form semantic `dropBackground` values. Grommet
`DropButton`, `FormField`, and `Menu` support spacing-token `margin` props.
Grommet `Cards`, `Select`, and `SelectMultiple` support spacing-token `margin`
props. Grommet `Select` and `SelectMultiple` support container-token
`dropHeight` values. Grommet `Cards` supports a spacing-token `pad` prop.
Grommet `Distribution` supports spacing-token `gap` and `margin` props.
Grommet `Video` supports a spacing-token `margin` prop. Grommet `Accordion`,
`Nav`, `PageHeader`, `Pagination`, `Sidebar`, `Spinner`, `Tag`, and `Toolbar`
support the same layout token props as `Box`, including spacing, dimensions,
radius, borders, and semantic backgrounds.

Grommet `Data`, `Stepper`, and `ToggleGroup`, plus `WizardContent`,
`WizardFooter`, `WizardHeader`, `WizardProgress`, and `WizardStepHeader`, also
support the same layout token props as `Box`.

Grommet `CheckBoxGroup` and `RadioButtonGroup` support the same layout token
props as `Box`. Grommet `Avatar` supports semantic `background`, object-form
`background.color`, object-form border color and size, `borderWidth`, spacing,
and radius props; its `height` and `width` props are intentionally not
supported. Grommet `DataView` supports a spacing-token `margin` prop.
Grommet `DataTableGroupBy` supports spacing-token `margin` and container-token
`dropHeight` props.
Grommet `TableCell` supports semantic `background`, object-form border color
and size, and spacing-token `pad` props.

The extension first loads `hpe-design-tokens` IDE manifests from the open
workspace. It checks the installed package and the HPE monorepo package location,
then falls back to its bundled token data when no manifest is available. Set
`hpeDesignTokens.manifestPath` to use a different manifest and
`hpeDesignTokens.dimensionMode` to select a mode such as `small`.
Set `hpeDesignTokens.colorMode` to `dark` to resolve dark-mode semantic colors.
The packaged extension includes generated default-dimension, light, and dark
token data as a fallback when no workspace manifest is available.

JSX token values are parsed with the TypeScript syntax tree, so direct props and
multiline object values resolve without relying on line-based pattern matching.
Grommet components must be named imports from `grommet`; HPE icons must be named
imports from `@hpe-design/icons-grommet`. Aliased named imports are supported.

## Package locally

Build the current token manifests and create a versioned VSIX bundle:

```bash
pnpm --filter hpe-design-token-resolver package
```

The command writes `hpe-design-token-resolver-<version>.vsix` to this package
directory. Install it with:

```bash
code --install-extension packages/hpe-design-tokens-vscode/hpe-design-token-resolver-<version>.vsix --force
```
