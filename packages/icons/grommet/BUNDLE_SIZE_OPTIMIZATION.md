# Bundle Size Optimization Guide

This package has been optimized to dramatically reduce bundle size for consuming applications through proper tree-shaking and granular imports.

## Key Optimizations

### 1. Tree-Shaking Enabled
- ✅ `sideEffects: false` in package.json
- ✅ `preserveModules: true` for individual icon files
- ✅ Individual icon exports available

### 2. Granular Import Paths
Each icon is now available as a separate module, enabling perfect tree-shaking:

```javascript
// ❌ Before: Imports all 450+ icons (~650KB)
import { Calculator, User, Settings } from '@hpe-design/icons-grommet';

// ✅ After: Individual imports (~2-4KB per icon)
import { Calculator } from '@hpe-design/icons-grommet/icons/Calculator';
import { User } from '@hpe-design/icons-grommet/icons/User';
import { Settings } from '@hpe-design/icons-grommet/icons/Settings';
```

### 3. Bundle Size Comparison

| Import Method | Bundle Size | Tree-Shaking |
|---------------|-------------|--------------|
| Full library import | ~650KB | ❌ No |
| Individual icon imports | ~1-4KB per icon | ✅ Perfect |
| Modern bundler with tree-shaking | ~1-4KB per icon | ✅ Automatic |

### 4. Usage Examples

#### Single Icon Import (Recommended)
```javascript
import { Calculator } from '@hpe-design/icons-grommet/icons/Calculator';

function App() {
  return <Calculator color="brand" />;
}
```

#### Multiple Individual Imports
```javascript
import { User } from '@hpe-design/icons-grommet/icons/User';
import { Settings } from '@hpe-design/icons-grommet/icons/Settings';
import { Menu } from '@hpe-design/icons-grommet/icons/Menu';

function NavBar() {
  return (
    <nav>
      <User />
      <Settings />
      <Menu />
    </nav>
  );
}
```

#### Barrel Imports (Still Supported)
```javascript
// This will still work with modern bundlers that support tree-shaking
import { Calculator, User, Settings } from '@hpe-design/icons-grommet';
```

### 5. Modern Bundler Support

Modern bundlers (Webpack 5+, Vite, Rollup, esbuild) will automatically tree-shake unused icons when importing from the main package:

```javascript
// Modern bundlers will only include the used icons
import { Calculator, User } from '@hpe-design/icons-grommet';
// Result: Only Calculator and User are included in bundle (~2-8KB total)
```

### 6. Configuration for Older Bundlers

For older bundlers or to guarantee minimal bundle size, use individual imports:

```javascript
// Webpack babel-plugin-import configuration
// .babelrc
{
  "plugins": [
    ["import", {
      "libraryName": "@hpe-design/icons-grommet",
      "libraryDirectory": "dist/icons",
      "camel2DashComponentName": false
    }, "hpe-icons"]
  ]
}
```

### Benefits Summary
- 🎯 **Perfect Tree-Shaking**: Only import what you use
- 📦 **Reduced Bundle Size**: From 650KB to 1-4KB per icon
- ⚡ **Faster Loading**: Smaller bundles = faster app startup
- 🔧 **Easy Migration**: Existing imports still work
- 🌟 **Better Performance**: Reduced memory footprint

The package maintains backward compatibility while providing these new optimization opportunities.