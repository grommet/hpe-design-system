# HPE Icons - Grommet Integration

HPE Icons optimized for React applications with Grommet integration. This package provides professionally designed SVG icons as React components with built-in Grommet theming support.

## Features

- **450+ Icons**: Comprehensive collection of business, technology, and interface icons
- **Grommet Integration**: Pre-styled React components with Grommet theming support
- **TypeScript Support**: Full TypeScript definitions included
- **Tree Shakeable**: Import only the icons you need
- **Accessible**: Built with accessibility best practices
- **Customizable**: Full control over size, color, and styling

## Installation

```bash
npm install @hpe-design/icons-grommet
# or
yarn add @hpe-design/icons-grommet
# or
pnpm install @hpe-design/icons-grommet
```

## Usage

### Grommet Integration

The easiest way to use HPE icons is with the Grommet integration, which provides pre-styled React components with built-in theming support:

```tsx
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Accessibility, Cloud, User, StatusWarning } from '@hpe-design/icons-grommet';

function App() {
  return (
    <Grommet theme={hpe} themeMode="auto">
      <Accessibility />
      <Cloud size="xxlarge" />
      <StatusWarning color="status-warning" />
      <User size="small" color="text-onDark" />
    </Grommet>
  );
}
```

### Optimized Imports

Modern bundlers (Webpack 5+, Vite, Rollup, esbuild) will automatically tree-shake unused icons when importing from the main package. However, importing icons from their full path will further ensure minimization.

```javascript
import { UserAdmin } from '@hpe-design/icons-grommet/icons/UserAdmin';
```

### Available Props

All Grommet icon components support the following props:

- `size`: `'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'` or custom size string
- `color`: Any color from your theme or CSS color value
- `a11yTitle`: Accessibility label for screen readers

### Theming

Icons respect Grommet's theming system. All icons respect semantic icon colors provided by `hpe-design-tokens` and/or `grommet-theme-hpe`.

## Available Icons

### Categories

The library includes icons across multiple categories:

- **Interface**: Navigation, actions, controls
- **Technology**: Cloud, servers, networking, security
- **Business**: Analytics, documents, communication
- **Users**: People, roles, permissions
- **Media**: Audio, video, images
- **Status**: Success, warning, error indicators
- **And many more...**

### Complete Icon List

For a complete list of all 450+ available icons, explore the [Storybook](https://hpe-design-icons-grommet.netlify.app/) documentation or check the `src/js/icons/` directory.

## Development

### Running Storybook

To explore all available icons and their usage:

```bash
pnpm storybook
```

### Building

```bash
pnpm build
```

### Scripts

- `pnpm build` - Build the library for production (uses Vite)
- `pnpm copy-types` - Copy TypeScript definitions to dist
- `pnpm lint` - Run ESLint
- `pnpm storybook` - Start Storybook for icon exploration
- `pnpm build-storybook` - Build Storybook for deployment

## Package Structure

```
packages/icons-grommet/
├── dist/                    # Built library files
│   ├── hpe-icons.js        # Main entry point (ES modules)
│   ├── hpe-icons.cjs       # CommonJS build
│   └── hpe-icons.d.ts      # TypeScript definitions
├── src/js/                 # Source files
│   ├── index.ts            # Main entry point
│   ├── StyledIcon.jsx      # Base styled component
│   ├── icons/              # Icon React components (450+ icons)
│   ├── themes/             # Default themes
│   └── utils.ts            # Utility functions
├── .storybook/             # Storybook configuration
├── package.json            # Package configuration
├── vite.config.ts          # Vite build configuration
└── tsconfig.json           # TypeScript configuration
```

## Migrating from grommet-icons

Information for migrating from grommet-icons to @hpe-design/icons-grommet can be found in this [migration guide](https://github.com/grommet/hpe-design-system/wiki/Migrating-from-grommet%E2%80%90icons-to-@hpe%E2%80%90design%5Cicons%E2%80%90grommet).

## Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## Contributing

This package is part of the [HPE Design System](https://github.com/grommet/hpe-design-system). Please refer to the main repository for contribution guidelines.

## License

Apache-2.0 License. See [LICENSE](./LICENSE) file for details.

## Related

- [HPE Design System](https://design-system.hpe.design/)
- [HPE theme for Grommet](https://github.com/grommet/grommet-theme-hpe/tree/master)
- [Design Tokens](../design-tokens)
