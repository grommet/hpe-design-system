# @hpe-design/icons-svg

HPE Icons in SVG format for use with the HPE Design System.

## Installation

```bash
npm install @hpe-design/icons-svg
```

## Usage

### Approach 1 — Import as URL (`<img>` tag)

The simplest approach. The icon is treated as a static asset and resolves to a URL.

> ⚠️ **`fill="currentColor"` has no effect when rendered via `<img>`.** To change the colour you must use a CSS `filter`. Use Approach 2 if you need CSS colour control.

```javascript
import addIcon from '@hpe-design/icons-svg/add.svg';
import closeIcon from '@hpe-design/icons-svg/close.svg';

// Use in your HTML
const iconElement = `<img src="${addIcon}" alt="Add" class="icon" />`;
```

### Approach 2 — Inline SVG (full CSS colour control)

Inject the SVG markup directly into the DOM so that `fill="currentColor"` inherits the CSS `color` property from any ancestor element.

**Option A — Raw import (Vite only):**

The `?raw` query suffix is a [Vite built-in](https://vite.dev/guide/assets#importing-asset-as-string) that returns the file content as a string.

```javascript
// Vite only — no additional configuration required
import addIcon from '@hpe-design/icons-svg/add.svg?raw';

document.getElementById('icon-container').innerHTML = addIcon;
```

**Option B — Dynamic fetch (framework-agnostic):**

```javascript
async function loadIcon(iconName) {
  // In a bundled app the icons are served from your build output.
  // Adjust the base path to match your asset serving setup.
  const response = await fetch(`/assets/${iconName}.svg`);
  return response.text();
}

// Usage
loadIcon('add').then(svgContent => {
  document.getElementById('icon-container').innerHTML = svgContent;
});
```

### Styling Icons with CSS

Most icons use `fill="currentColor"`, making them easy to style with CSS when rendered as **inline SVG** (Approach 2). The icon inherits the foreground `color` from its parent element.

> **Note:** CSS `color`-based styling does not apply when icons are rendered via an `<img>` tag (Approach 1).

```css
/* Basic icon styling */
.icon {
  width: 24px;
  height: 24px;
  color: #333; /* This sets the fill color */
}

/* Icon variations */
.icon-primary {
  color: #0073e7; /* Blue */
}

.icon-success {
  color: #00c781; /* Success Green */
}

.icon-warning {
  color: #ff8c00; /* Warning Orange */
}

.icon-error {
  color: #ff5757; /* Error Red */
}

/* Hover effects */
.icon-button {
  color: #666;
  transition: color 0.2s ease;
  cursor: pointer;
}

.icon-button:hover {
  color: #0073e7;
}

/* Different sizes */
.icon-small {
  width: 16px;
  height: 16px;
}

.icon-medium {
  width: 24px;
  height: 24px;
}

.icon-large {
  width: 32px;
  height: 32px;
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .icon {
    color: #ffffff;
  }

  .icon-button {
    color: #cccccc;
  }

  .icon-button:hover {
    color: #4d9fff;
  }
}
```

## Available Icons

This package includes 450+ icons covering various categories:

- **Actions**: add, close, edit, delete, save, etc.
- **Navigation**: arrow, caret directions, menu, etc.
- **Status**: success, warning, error, info, etc.
- **Communication**: mail, chat, phone, etc.
- **Media**: play, pause, stop, volume, etc.
- **Files**: document types, folder, archive, etc.
- **System**: settings, tools, security, network, etc.
- **Business**: analytics, chart, money, etc.

## TypeScript Support

The package includes TypeScript definitions. When using with TypeScript:

```typescript
import addIcon from '@hpe-design/icons-svg/add.svg';

// TypeScript will recognize the imported icon as a string (URL)
const iconUrl: string = addIcon;
```

## Bundler Configuration

Detailed, annotated configuration examples for **Vite** and **Webpack** (including how to support both URL and raw-string imports in the same project) can be found in [`examples/bundlers/`](./examples/bundlers/).

## Browser Support

These SVG icons work in all modern browsers that support SVG:

- Chrome 4+
- Firefox 3+
- Safari 3.2+
- Edge 12+

## Performance Tips

1. **Bundle Splitting**: Only import the icons you need to keep bundle size small
2. **Icon Fonts Alternative**: Use SVG icons instead of icon fonts for better performance and accessibility
3. **Caching**: SVG files are cached by browsers, improving repeat visit performance
4. **Tree Shaking**: Modern bundlers will only include imported icons in your final bundle

## Contributing

This package is part of the HPE Design System. For contributions and issues, please visit the [HPE Design System repository](https://github.com/grommet/hpe-design-system).

## License

Apache-2.0

## Related Packages

- `@hpe-design/icons-grommet` - HPE icons as Grommet/React components
- `grommet-theme-hpe` - HPE theme for Grommet
- `grommet` - React component library
