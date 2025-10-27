# @hpe-design/icons-svg

HPE Icons in SVG format for use with the HPE Design System.

## Installation

```bash
npm install @hpe-design/icons-svg
```

## Usage

### Importing Individual SVG Icons

You can import individual SVG files directly from the package:

*Note: this doesn't let you style the color as easily with CSS and you have to use something like `filter` to adjust the color* 

```javascript
// Import as a URL/path
import addIcon from '@hpe-design/icons-svg/icons/add.svg';
import closeIcon from '@hpe-design/icons-svg/icons/close.svg';
import searchIcon from '@hpe-design/icons-svg/icons/search.svg';

// Use in your HTML
const iconElement = `<img src="${addIcon}" alt="Add" class="icon" />`;
```

### Loading SVG as Raw String

You can also load SVG content as raw strings for dynamic usage:

```javascript
// Using fetch to load SVG content
async function loadIcon(iconName) {
  const response = await fetch(`/node_modules/@hpe-design/icons-svg/${iconName}.svg`);
  return await response.text();
}

// Usage
loadIcon('add').then(svgContent => {
  document.getElementById('icon-container').innerHTML = svgContent;
});
```

You can also load the svg as a raw string with a bundler setup to allow raw imports like:
```javascript
import addIcon from "@hpe-design/icons-svg/add.svg?raw"

document.getElementById('icon-container').innerHTML = addIcon;
```

### Styling Icons with CSS

All icons use `fill="currentColor"`, making them easy to style with CSS. They can simply inherit the current foreground `color` from their parent, or you can give them a specific color:

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

## Webpack Configuration

If you're using Webpack, you might need to configure it to handle SVG imports:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
};
```

## Browser Support

These SVG icons work in all modern browsers that support SVG:

- Chrome 4+
- Firefox 3+
- Safari 3.2+
- Edge 12+
- Internet Explorer 9+

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