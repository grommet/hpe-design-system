---
name: Coding Guidelines
description: 'Coding guidelines for React components using the HPE Design System (Grommet)'
applyTo: '**/*.{js,jsx,ts,tsx}'
---

# Instructions: Coding Guidelines

## Rules and Guidelines

When writing or reviewing React components, follow these core principles and best practices:

## Framework & Libraries

1. **Framework:** Always use React and the HPE Design System (Grommet). Do not introduce alternative UI frameworks or component libraries.
2. **Component Style:** Write functional components using React Hooks (`useState`, `useEffect`, `useContext`, etc.). Avoid class components.

## Styling

1. **Grommet Props First:** Use Grommet's built-in layout and styling props (`pad`, `gap`, `margin`, `align`, `justify`, `direction`, etc.) directly on components instead of custom CSS or `styled-components`.
2. **No Inline Styles:** Avoid inline `style` objects unless no Grommet prop equivalent exists.

### Good Example — Grommet layout props

```jsx
<Box direction="row" gap="small" align="center" pad="medium">
  <Text>Label</Text>
  <Button label="Submit" primary />
</Box>
```

### Bad Example — Custom CSS / inline styles

```jsx
<div
  style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '16px' }}
>
  <span>Label</span>
  <button>Submit</button>
</div>
```

## Design Tokens

1. **Sizing:** Prefer Grommet's t-shirt size tokens (`'xsmall'`, `'small'`, `'medium'`, `'large'`, `'xlarge'`) for sizing props.
2. **Color:** Prefer HPE theme color tokens (e.g., `'brand'`, `'text-strong'`, `'text-weak'`, `'background-front'`, `'background-back'`) over hardcoded hex values or CSS color names.

### Good Example — Theme tokens

```jsx
<Text color="text-strong" size="small">Description</Text>
<Box background="background-front" pad="medium" />
```

### Bad Example — Hardcoded values

```jsx
<Text color="#444444" style={{ fontSize: '14px' }}>Description</Text>
<Box background="#f5f5f5" style={{ padding: '16px' }} />
```

## Theming

1. **Dark/light mode:** Manage `themeMode` state at the root `<Grommet>` component only (typically the app's entry file). Never manage it inside a nested `App` component or pass it down through undocumented context — the prop cannot be threaded back up to `<Grommet>`.
2. **No custom ThemeContext:** Never create a new `ThemeContext`. The `Grommet` component already provides a theme context used throughout the application; use the `themeMode` prop instead.

```jsx
// Good — themeMode state lives at the Grommet root
function Root() {
  const [themeMode, setThemeMode] = useState('light');
  return (
    <Grommet theme={hpe} themeMode={themeMode} full>
      <App themeMode={themeMode} setThemeMode={setThemeMode} />
    </Grommet>
  );
}
```

## Styling Escape Hatch

When Grommet component props alone cannot achieve the required styling, `styled-components` is the approved method for adding custom CSS. Use either the `styled()` wrapper or Grommet's theme-level `extend` key:

```jsx
// Option 1: styled() wrapper — only add what Grommet props cannot express
import styled from 'styled-components';
import { Box } from 'grommet';

const SnapScrollBox = styled(Box)`
  scroll-snap-type: x mandatory;
`;

// Option 2: Grommet theme extend (applied globally via theme config)
// box: { extend: 'scroll-snap-type: x mandatory;' }
```

- Treat any use of `styled()` as a signal to discuss with the design system team — recurring needs may warrant a new design token or Grommet prop.
- Do not add arbitrary global CSS or className-based overrides outside of `styled-components`.

## Accessibility

1. **Labels:** Provide `a11yTitle` or `aria-label` on interactive and icon-only elements so screen readers can identify them.
2. **Buttons:** Ensure interactive components like `Button` always have a visible label or an accessible title.

```jsx
// Icon-only button — requires a11yTitle
<Button icon={<Search />} a11yTitle="Search" onClick={handleSearch} />

// Button with label — a11yTitle optional but recommended when label alone is ambiguous
<Button label="Delete item" a11yTitle="Delete selected item" onClick={handleDelete} />
```

## Code Quality

1. **Single Responsibility:** Keep components focused — one responsibility per component.
2. **Exports:** Export components as named exports unless the file is a page-level default export.
3. **State Ownership:** Co-locate related state and handlers within the component that owns them.
4. **Verification:** Use the `sandbox/grommet-app` environment to verify component behavior before submitting for review.

---

## Related References

- [guidelines.instructions.md](../code-connect/guidelines.instructions.md): Required when authoring Figma Code Connect files for HPE Design System components.
- [grommet-layouts.instructions.md](grommet-layouts.instructions.md): Page and app layout structure.
- [grommet-responsive.instructions.md](grommet-responsive.instructions.md): Responsive design patterns.
- [grommet-data.instructions.md](grommet-data.instructions.md): Presenting and manipulating data collections.
