# Grommet Icons to HPE Design Icons Migration Codemod

## Overview

This codemod automatically migrates your codebase from `grommet-icons` to `@hpe-design/icons-grommet`, handling all necessary icon name remappings and import updates.

## What it does

1. **Updates library imports**: Changes all imports from `grommet-icons` to `@hpe-design/icons-grommet`
2. **Remaps icon names**: Automatically updates icon names according to the new naming conventions
3. **Updates JSX elements**: All JSX components using the old icon names are updated
4. **Updates references**: Variable assignments, function calls, and object properties are updated
5. **Handles aliased imports**: Preserves your custom aliases while updating the icon names
6. **Warns about deprecated icons**: Alerts you to icons that have been removed with no direct replacement

## Icon Remapping Examples

### Status Icons
- `StatusCriticalSmall` → `StatusCritical`
- `StatusGoodSmall` → `StatusGood`
- `StatusWarningSmall` → `StatusWarning`
- `StatusInfoSmall` → `StatusInfo`
- `StatusDisabledSmall` → `StatusDisabled`
- `StatusUnknownSmall` → `StatusUnknown`

### Chart Icons
- `BarChart` → `ChartBar`
- `LineChart` → `ChartLine`
- `PieChart` → `ChartPie`

### Navigation Icons
- `Next` → `Right`
- `Previous` → `Left`
- `CaretNext` → `CaretRight`
- `CaretPrevious` → `CaretLeft`

### Form Icons
- `FormAdd` → `Add`
- `FormEdit` → `Edit`
- `FormClose` → `Close`
- `FormSearch` → `Search`
- `FormCalendar` → `Calendar`
- `FormTrash` → `Trash`
- ... and many more

### Circle Icons
- `CircleAlert` → `Alert`
- `CircleInformation` → `Info`
- `CirclePlay` → `Play`
- `CircleQuestion` → `Help`
- `EmptyCircle` → `CircleEmpty`

### Star Icons
- `Star` → `StarFill`
- `StarOutline` → `Star`

### Other Notable Remappings
- `Basket` → `Cart`
- `Cli` → `Console`
- `Terminal` → `Console`
- `Schedule` → `Calendar`
- `Plan` → `Calendar`
- `Tasks` → `Progress`
- `Troubleshoot` → `Tools`
- `VolumeControl` → `Dial`

See the complete mapping in the codemod file: `transforms/migrate-grommet-icons-to-hpe.js`

## Usage

### Basic Usage

```bash
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/
```

### Dry Run (Preview Changes)

```bash
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --dry
```

### With Custom Quote Style

```bash
npx hpe-design-system-codemods migrate-grommet-icons-to-hpe src/ --quote single
```

## Before & After Example

### Before Migration

```jsx
import React from 'react';
import { Box, Button } from 'grommet';
import { 
  StatusCriticalSmall, 
  StatusGoodSmall, 
  Next, 
  Previous,
  BarChart
} from 'grommet-icons';

export const StatusCard = ({ status }) => {
  const Icon = status === 'error' ? StatusCriticalSmall : StatusGoodSmall;
  
  return (
    <Box direction="row" gap="small">
      <Icon />
      <BarChart />
      <Button icon={<Previous />} />
      <Button icon={<Next />} />
    </Box>
  );
};
```

### After Migration

```jsx
import React from 'react';
import { Box, Button } from 'grommet';
import { 
  StatusCritical, 
  StatusGood, 
  Right, 
  Left,
  ChartBar
} from '@hpe-design/icons-grommet';

export const StatusCard = ({ status }) => {
  const Icon = status === 'error' ? StatusCritical : StatusGood;
  
  return (
    <Box direction="row" gap="small">
      <Icon />
      <ChartBar />
      <Button icon={<Left />} />
      <Button icon={<Right />} />
    </Box>
  );
};
```

## Deprecated Icons

The following icons have been deprecated with no direct replacement:

### Logos & Brand Icons
- Social media logos (Facebook, Twitter, Instagram, LinkedIn, etc.)
- Technology logos (Github, Docker, Kubernetes, React, etc.)
- Payment logos (Visa, Mastercard, PayPal, etc.)
- Other brand icons (Apple, Google, Microsoft, etc.)

### Glyph Icons
- Text formatting (Bold, Italic, Underline, etc.)
- Code-related (Css3, Html5, Java, Js, etc.)
- Other utility glyphs

When the codemod encounters a deprecated icon, it will:
1. Display a warning message
2. Keep the import to avoid breaking your code
3. Allow you to manually find a suitable replacement

## Aliased Imports

The codemod handles aliased imports correctly:

**Before:**
```jsx
import { StatusCriticalSmall as ErrorIcon } from 'grommet-icons';
```

**After:**
```jsx
import { StatusCritical as ErrorIcon } from '@hpe-design/icons-grommet';
```

Your custom alias (`ErrorIcon`) is preserved, and all references to it remain unchanged.

## Testing

The codemod includes comprehensive tests covering:
- ✅ Library import updates
- ✅ Icon name remapping
- ✅ JSX element updates
- ✅ Identifier reference updates
- ✅ Aliased imports
- ✅ Mixed scenarios
- ✅ Deprecated icon warnings
- ✅ Edge cases

Run tests with:
```bash
npm test
```

## Next Steps After Migration

1. **Install the new package**:
   ```bash
   npm uninstall grommet-icons
   npm install @hpe-design/icons-grommet
   ```

2. **Review deprecated icon warnings**: Find suitable replacements for any deprecated icons

3. **Test your application**: Ensure all icons render correctly

4. **Update any tests**: If you have snapshot tests, update them

## Support

For issues or questions about the migration:
- Check the [HPE Design System documentation](https://design-system.hpe.design/)
- Open an issue in the [HPE Design System repository](https://github.com/grommet/hpe-design-system)
