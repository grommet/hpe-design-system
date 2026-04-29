---
name: Code Connect Component Guidelines
description: 'Planning inputs, naming requirements, and figma.connect authoring rules for creating or updating Code Connect files from Figma.'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Instructions: Code Connect Component Guidelines

## Rules and Guidelines

Before implementing a Code Connect file from Figma, capture the basic planning inputs clearly and consistently. Then follow the authoring rules below when writing the `figma.connect` call.

## Planning Inputs

Before creating or updating a Code Connect file:

1. **Component Name:** Identify the Grommet component to connect (e.g., `Button` from `grommet`).
2. **Figma Source:** Capture the exact Figma component node URL, including the `node-id` query parameter.
3. **Variant Inventory:** Review all Figma component properties (variants, booleans, strings) before mapping to confirm nothing is missed.
4. **Repo Reference:** Locate the closest existing Code Connect file in `packages/code-connect/src/` before creating a new one.

## Required Imports

1. **`figma` import:** Always import `figma` as a default import from `@figma/code-connect`.
2. **Component import:** Import the target Grommet component from `grommet`.

```jsx
import figma from '@figma/code-connect';
import { Button } from 'grommet';
```

## `figma.connect` Structure

Use `figma.connect` with exactly three arguments:

1. The React/Grommet component reference.
2. The Figma component node URL.
3. A config object containing `props` and `example`.

```jsx
figma.connect(
  ComponentName,
  'https://www.figma.com/design/<fileKey>/...?node-id=<nodeId>',
  {
    props: {
      /* property mappings */
    },
    example: (
      {
        /* destructured props */
      },
    ) => <ComponentName /* mapped props */ />,
  },
);
```

## Property Mapping

Use the appropriate `figma.*` helper for each Figma property type:

| Figma Property Type | Helper              | Usage                                          |
| ------------------- | ------------------- | ---------------------------------------------- |
| Text / string       | `figma.string`      | `label: figma.string('Label')`                 |
| Boolean             | `figma.boolean`     | `disabled: figma.boolean('Disabled')`          |
| Variant / enum      | `figma.enum`        | `size: figma.enum('Size', { small: 'small' })` |
| Instance swap       | `figma.instance`    | `icon: figma.instance('Icon')`                 |
| Nested props        | `figma.nestedProps` | Map sub-component properties                   |

### Enum Mapping Rules

1. **True for boolean variants:** Use `true` as the mapped value when a variant option enables a boolean prop (e.g., `primary: figma.enum('Kind', { primary: true })`).
2. **Match casing:** Map Figma variant option names exactly as they appear in the Figma panel, then assign the correct React prop value.

```jsx
props: {
  primary: figma.enum('Kind', { primary: true }),
  secondary: figma.enum('Kind', { secondary: true }),
  size: figma.enum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  }),
  disabled: figma.enum('State', { disabled: true }),
},
```

## Example Render Function

1. **Consume all props:** The `example` function must destructure and apply every prop defined in the `props` block.
2. **Mirror the API:** Reflect the component's actual JSX usage — do not add hardcoded values or extra props that aren't mapped.

```jsx
example: ({ label, primary, secondary, size, disabled }) => (
  <Button
    label={label}
    primary={primary}
    secondary={secondary}
    size={size}
    disabled={disabled}
  />
),
```

## Full Example

```jsx
import figma from '@figma/code-connect';
import { Button } from 'grommet';

figma.connect(
  Button,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694',
  {
    props: {
      label: figma.string('Label'),
      primary: figma.enum('Kind', { primary: true }),
      secondary: figma.enum('Kind', { secondary: true }),
      size: figma.enum('Size', {
        xSmall: 'xsmall',
        small: 'small',
        medium: 'medium',
        large: 'large',
        xLarge: 'xlarge',
      }),
      disabled: figma.enum('State', { disabled: true }),
    },
    example: ({ label, primary, secondary, size, disabled }) => (
      <Button
        label={label}
        primary={primary}
        secondary={secondary}
        size={size}
        disabled={disabled}
      />
    ),
  },
);
```

## What to Avoid

1. **No unmapped props:** Do not pass hardcoded values in the `example` function for props that should be driven by Figma.
2. **No missing props:** Do not omit a Figma property from the `props` block without a documented reason.
3. **No wrong node URL:** Always use the exact Figma component node URL with `node-id` — not a page or frame URL.

---

## Related References

- [code-connect-file-structure.instructions.md](code-connect-file-structure.instructions.md): Defines file naming conventions and where to place Code Connect files.
- [code-connect-guidelines.instructions.md](code-connect-guidelines.instructions.md): High-level overview of the Code Connect workflow and sync process.
- [coding-guidelines.instructions.md](../coding-guidelines.instructions.md): Covers React/Grommet component authoring conventions used in the `example` render function.
