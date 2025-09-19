# HPE Icons

A comprehensive icon library for the HPE Design System, providing 450+ professionally designed SVG icons optimized for use in React applications with Grommet integration.

## Features

- **450+ Icons**: Comprehensive collection of business, technology, and interface icons
- **Multiple Formats**: Available as raw SVGs and React components
- **Grommet Integration**: Pre-styled components with Grommet theming support
- **TypeScript Support**: Full TypeScript definitions included
- **Tree Shakeable**: Import only the icons you need
- **Accessible**: Built with accessibility best practices
- **Customizable**: Full control over size, color, and styling

## Installation

```bash
npm install hpe-icons
# or
yarn add hpe-icons
```

## Usage

### Grommet Integration

The easiest way to use HPE icons is with the Grommet integration, which provides pre-styled React components with built-in theming support:

```tsx
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Accessibility, Cloud, User } from 'hpe-icons/grommet';

function App() {
  return (
    <Grommet theme={hpe} themeMode="auto" >
      <Accessibility />
      <Cloud size="xxlarge" />
      <StatusWarning color="warning" />
      <User size="small" color="onStrong" />
    </Grommet>
  );
}
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

For a complete list of all 450+ available icons, explore the Storybook documentation or check the `public/img/` directory.

## Development

### Running Storybook

To explore all available icons and their usage:

```bash
yarn storybook
```

### Building

```bash
yarn build
```

### Scripts

- `yarn dev` - Start development server
- `yarn build` - Build the library for production
- `yarn lint` - Run ESLint
- `yarn storybook` - Start Storybook for icon exploration
- `yarn build-storybook` - Build Storybook for deployment

## Package Structure

```
hpe-icons/
├── dist/                    # Built library files
│   ├── hpe-icons.js        # Main entry point (ES modules)
│   ├── hpe-icons.cjs       # CommonJS build
│   └── grommet/            # Grommet integration build
├── public/img/             # Source SVG files (450+ icons)
├── src/js/
│   ├── index.ts            # Main entry point
│   └── grommet/            # Grommet integration
│       ├── icons/          # Generated React components
│       ├── themes/         # Default themes
│       └── StyledIcon.jsx  # Base styled component
└── .storybook/             # Storybook configuration
```

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

- [HPE Design System](https://github.com/grommet/hpe-design-system)
- [Grommet](https://v2.grommet.io/)
- [Design Tokens](../design-tokens)
