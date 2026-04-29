# Workspace Instructions

These instructions guide Copilot during our design-to-code evaluations. When generating React/Grommet components from design artifacts, please adhere to these rules:

1. **Framework & Library**: Always use React and the HPE Design System (Grommet).
2. **Component Style**: Produce functional components using React Hooks (`useState`, `useEffect`, etc.).
3. **Styling**: Utilize Grommet's layout and styling props (e.g., `pad`, `gap`, `margin`, `align`, `justify`) directly on the components instead of custom CSS or `styled-components` whenever possible.
4. **Design Tokens**: Prefer Grommet's t-shirt sizes (e.g., `'small'`, `'medium'`, `'large'`) and theme colors (e.g., `'brand'`, `'text-strong'`, `'background-front'`) to match the HPE Design System.
5. **Accessibility**: Ensure elements are accessible by providing `a11yTitle` or `aria-label` where necessary.
6. **Code Quality**: Ensure the component is clean, easily readable, and ready for review in the `sandbox/grommet-app` test environment.

## Figma Code Connect Wiring
When asked to wire up a component for Figma Code Connect using the CLI approach:
1. **Import `figma`**: Use `import figma from '@figma/code-connect';`.
2. **Setup `figma.connect`**: Attach Code Connect mappings to the component using its corresponding Figma component URL.
3. **Map Properties**: Correctly map Figma component properties (variants, booleans, text) to the React/Grommet component properties using Code Connect CLI mapping syntax.
4. **Dynamic Example Block**: Provide the `example` render function showing how the component dynamically maps the values in Figma to the architecture of the React/Grommet component.