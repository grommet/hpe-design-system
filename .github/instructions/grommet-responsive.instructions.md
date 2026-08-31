---
name: Grommet Responsive Design
description: 'How to implement responsive design with `grommet`.'
applyTo: '**/*.{js,jsx,ts,tsx}'
---

# Instructions: Implementing Responsive Design in Grommet

`grommet` has built-in support for responsive design. Use the responsive props provided by `grommet` components to ensure your UI adapts to different screen sizes.

## Rules and Guidelines

- Use `ResponsiveContext` to adjust component behavior based on the screen size.
- Prefer `responsive="container"` for components that should respond to their parent container's size rather than the overall window size.
- Never hardcode pixel-based breakpoints — use the theme's breakpoint names (`xsmall`, `small`, `medium`, `large`, `xlarge`).

### Good Example — Responsive to window size

```jsx
import React from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';

const ResponsiveBox = () => {
  const breakpoint = React.useContext(ResponsiveContext);
  return (
    <Box
      width={['xsmall', 'small'].includes(breakpoint) ? 'medium' : 'large'}
      pad={['xsmall', 'small'].includes(breakpoint) ? 'small' : 'medium'}
      background="background-front"
    >
      <Text size={['xsmall', 'small'].includes(breakpoint) ? 'small' : 'medium'}>
        This box is responsive to the window size. The current breakpoint is {breakpoint}.
      </Text>
    </Box>
  );
};
export default ResponsiveBox;
```

## Responsive to Window vs. Container

For greater control and more fluid designs, use `responsive="container"`. This makes the component respond to the size of its parent container rather than the overall window size.

```jsx
<Box responsive="container">{/* ... */}</Box>
```

`useContext(ResponsiveContext)` must be called inside a child component rendered *within* the `responsive="container"` `Box`. This is because `responsive="container"` creates a new `ResponsiveContext` scope for its descendants — calling `useContext` above the container reads the window breakpoint instead.

```jsx
import React from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';

const ContainerContent = () => {
  const breakpoint = React.useContext(ResponsiveContext);
  return (
    <Box
      width={['xsmall', 'small'].includes(breakpoint) ? 'medium' : 'large'}
      pad={['xsmall', 'small'].includes(breakpoint) ? 'small' : 'medium'}
      background="background-front"
    >
      <Text size={['xsmall', 'small'].includes(breakpoint) ? 'small' : 'medium'}>
        This box is responsive to its container size. The current breakpoint is {breakpoint}.
      </Text>
    </Box>
  );
};

const ContainerResponsiveBox = () => (
  <Box responsive="container">
    <ContainerContent />
  </Box>
);
export default ContainerResponsiveBox;
```

## Responsive Breakpoints

Responsive breakpoints are defined in the theme. The default Grommet breakpoints are:

- `xsmall`: up to 480px
- `small`: 481px to 768px
- `medium`: 769px to 1024px
- `large`: 1025px to 1440px
- `xlarge`: 1441px and above

Responsive breakpoints can be contextual to the window or parent container when using `responsive="container"`.

---

## Related References

- [grommet-layouts.instructions.md](grommet-layouts.instructions.md): Page and app layout structure.
- [coding-guidelines.instructions.md](coding-guidelines.instructions.md): General Grommet component, token, and accessibility rules.
