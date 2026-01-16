# Navigation Menu Components Documentation

## Overview

The Navigation Menu component system provides a hierarchical, accessible navigation interface for applications. It consists of several interconnected components that work together to create an interactive navigation experience with collapsible functionality.

## Component Architecture

```mermaid
graph TD
    A[NavigationMenu] --> B[NavContainer]
    B --> C[Nav - Grommet]
    C --> D[NavList]
    D --> E[List - Grommet]
    D --> F[NavItem]
    F --> G[Button - Grommet]
    F --> H[ItemContainer]
    F --> I[Collapsible - Grommet]
    H --> J[ActiveMarker]
    H --> K[ItemLabel]
    K --> L[Text - Grommet]
    K --> M[Icon - React.ReactNode]

    style A fill:#e3f2fd
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#e1f5fe
    style F fill:#fff3e0
    style H fill:#e8f5e8
    style J fill:#ffebee
    style K fill:#e8f5e8
```

## Components

### NavigationMenu (Root Component)

The root component that provides the complete navigation interface with collapsible functionality.

**Props:**

- `activeItem?: string` - The ID of the currently active navigation item
- `header?: React.ReactNode` - Custom header content for the navigation
- `items: NavItemType[]` - Array of navigation items to display
- `open: boolean` - Controls whether the navigation is expanded or collapsed
- `title?: string` - Title text displayed in the navigation header
- `onSelect?: ({ item, event }: { item: NavItemType; event: React.MouseEvent | React.KeyboardEvent }) => void` - Callback function triggered when an item is selected

**Features:**

- **Collapsible Interface**: Toggle between expanded and collapsed states
- **Active State Management**: Track and highlight the currently active item
- **Custom Header Support**: Optional header with title and custom content
- **Item Selection**: Handle user interactions with navigation items
- **Responsive Design**: Adapts to different screen sizes and contexts

**Usage Example:**

```tsx
<NavigationMenu
  items={navigationItems}
  open={isOpen}
  title="Main Navigation"
  activeItem={currentActiveItem}
  onSelect={handleItemSelect}
/>
```

### NavContainer

Layout container component that provides the header functionality and manages the collapsible state.

**Props:**

- `children: React.ReactNode` - Child content (typically NavList)
- `header?: React.ReactNode` - Custom header content
- `open: boolean` - Whether the navigation is expanded
- `setOpen: (open: boolean) => void` - Function to toggle open/closed state
- `title?: string` - Title for the navigation header
- `...rest` - Additional props for styling (pad, width, etc.)

**Features:**

- **Sticky Header**: Header remains visible when scrolling
- **Toggle Button**: Built-in expand/collapse functionality
- **Screen Reader Support**: Accessible title handling
- **Responsive Width**: Dynamic width based on open state

### NavList

The main container component that manages navigation state and renders navigation items.

**Props:**

- `items: NavItemWithLevel[]` - Array of navigation items
- `activeItem?: string` - Currently active item label
- `onSelect?: ({ item, event }: { item: NavItemType; event: React.MouseEvent | React.KeyboardEvent }) => void` - Callback when an item is selected
- `...rest` - Additional props for accessibility (role, aria-labelledby, etc.)

**Features:**

- **Automatic expansion**: Parent items are automatically expanded when their children are active
- **Multi-level nesting**: Supports hierarchical navigation structures
- **State management**: Tracks expanded/collapsed state of parent items
- **Performance optimization**: Uses `useMemo` for expensive calculations

### NavItem

The core navigation item component that renders individual navigation entries.

**Props:**

- `active?: boolean` - Whether the item is currently active
- `actions?: React.ReactNode` - Action elements (expand/collapse icons)
- `children?: React.ReactNode` - Child content (nested navigation)
- `icon?: React.ReactNode` - Icon to display with the item
- `label: string` - Display text for the item
- `level?: 1 | 2` - Nesting level (affects indentation)
- `onClick?: () => void` - Click handler
- `url?: string` - URL for navigation (if applicable)
- `...rest` - Additional props (id, aria attributes, etc.)

**Visual States:**

- **Default**: Normal appearance
- **Hover**: Highlighted background
- **Active**: Distinct background with accent marker
- **Expanded**: Shows collapse icon, reveals children

### ItemContainer

Layout wrapper that provides consistent styling and state-based visual feedback.

**Props:**

- `active: boolean | undefined` - Active state
- `children: React.ReactNode` - Content to wrap
- `gap?: string` - Spacing between elements (default: 'xsmall')
- `hover: boolean` - Hover state

**Features:**

- **Responsive layout**: Uses Grommet Box for flexible layout
- **State-based styling**: Different backgrounds for active/hover states
- **Consistent spacing**: Standardized padding and gaps

### ItemLabel

Text and icon display component for navigation items.

**Props:**

- `icon: React.ReactNode` - Icon element
- `label: string` - Text label

**Features:**

- **Icon-text alignment**: Proper alignment of icon and text
- **Consistent typography**: Uses design system text styles
- **Flexible icons**: Accepts any React node as icon

### ActiveMarker

Visual indicator for active navigation items.

**Props:**

- `active: boolean | undefined` - Whether parent item is active
- `hover: boolean | undefined` - Whether parent item is hovered

**Features:**

- **Visual feedback**: Colored bar indicating active state
- **State-responsive**: Different colors for active and hover states
- **Subtle design**: Minimal visual element that doesn't interfere with content

## Types

### NavItemType

```typescript
export type NavItemType = {
  label: string; // Display text
  url?: string; // Navigation URL
  icon?: React.ReactNode; // Display icon
  children?: NavItemType[]; // Nested items
  type?: 'group' | 'item'; // Optional grouping type
};
```

### NavItemWithLevel

```typescript
type NavItemWithLevel = NavItemType & {
  level?: 1 | 2; // Nesting level for indentation
};
```

## Usage Examples

### Basic Navigation Menu

```tsx
const basicNavItems: NavItemType[] = [
  {
    label: 'Dashboard',
    url: '/dashboard',
    icon: <Dashboard />,
  },
  {
    label: 'Settings',
    url: '/settings',
    icon: <Settings />,
  },
];

<NavigationMenu
  items={basicNavItems}
  open={isOpen}
  title="Main Menu"
  activeItem="Dashboard"
  onSelect={handleItemSelect}
/>;
```

### Hierarchical Navigation Menu

```tsx
const hierarchicalNavItems: NavItemType[] = [
  {
    label: 'Components',
    icon: <Components />,
    children: [
      { label: 'Button', url: '/components/button' },
      { label: 'Input', url: '/components/input' },
      { label: 'Card', url: '/components/card' },
    ],
  },
  {
    label: 'Templates',
    icon: <Templates />,
    children: [
      { label: 'Dashboard', url: '/templates/dashboard' },
      { label: 'Form', url: '/templates/form' },
    ],
  },
];

<NavigationMenu
  items={hierarchicalNavItems}
  open={isOpen}
  title="HPE Design System"
  activeItem="Button"
  onSelect={handleItemSelect}
/>;
```

### Grouped Navigation Menu

```tsx
const groupedNavItems: NavItemType[] = [
  {
    label: 'Components',
    children: [
      {
        label: 'Layout',
        type: 'group',
        children: [
          { label: 'Box', url: '/components/box' },
          { label: 'Grid', url: '/components/grid' },
          { label: 'Layer', url: '/components/layer' },
        ],
      },
      {
        label: 'Controls',
        type: 'group',
        children: [
          { label: 'Button', url: '/components/button' },
          { label: 'CheckBox', url: '/components/checkbox' },
        ],
      },
    ],
  },
];

<NavigationMenu
  items={groupedNavItems}
  open={isOpen}
  title="Grouped Components"
  onSelect={handleItemSelect}
/>;
```

### Navigation Menu with Custom Header

```tsx
<NavigationMenu
  items={navItems}
  open={isOpen}
  header={<CustomHeaderComponent />}
  activeItem={activeItem}
  onSelect={({ item }) => console.log('Item selected:', item)}
/>
```

### Custom Routing (Client-side Navigation)

You can prevent the default browser navigation and handle routing manually (e.g., with Next.js router or React Router) by using the `event` object passed to `onSelect`.

```tsx
import { useRouter } from 'next/router';

const MyNavigation = () => {
  const router = useRouter();

  return (
    <NavigationMenu
      items={navItems}
      open={true}
      title="App Navigation"
      onSelect={({ item, event }) => {
        // Prevent full page reload
        event.preventDefault();
        // Handle client-side routing
        if (item.url) {
          router.push(item.url);
        }
      }}
    />
  );
};
```

### Using NavList Directly (Advanced)

For more direct control, you can use NavList without the NavigationMenu wrapper:

```tsx
<NavList
  items={navItems}
  activeItem="Button"
  onSelect={({ item }) => console.log('Item selected:', item)}
/>
```

### Accessible Navigation Menu

```tsx
<NavigationMenu
  items={navItems}
  open={isOpen}
  title="Accessible Navigation"
  activeItem={activeItem}
/>
```

### Advanced NavList with Accessibility

```tsx
<NavList
  items={navItems}
  activeItem={activeItem}
  role="navigation"
  aria-label="Main navigation"
/>
```

## State Management Flow

```mermaid
sequenceDiagram
   role="group"` on grouped item containers
- `role="heading"` on group headings
- `aria-haspopup` for items with children
- `aria-expanded` for collapsible items
- `aria-labelledby` for nested menus and group
    participant NavList
    participant NavItem
    participant State

    User->>NavigationMenu: Provide props (open, items, etc.)
    NavigationMenu->>NavContainer: Pass header, title, open state
    NavContainer->>NavList: Pass items, activeItem, callbacks

    User->>NavItem: Click item
    NavItem->>NavList: onClick()
    NavList->>NavigationMenu: onSelect() via props
    NavigationMenu->>State: activeItem updated (by parent)
    State->>NavigationMenu: Re-render with new activeItem
    NavigationMenu->>NavList: Pass updated activeItem
    NavList->>NavList: parentsToExpand calculated
    NavList->>State: setExpanded()
    State->>NavItem: Re-render with new state
    NavItem->>User: Visual feedback

    User->>NavContainer: Click toggle button
    NavContainer->>NavigationMenu: setOpen() via callback
    NavigationMenu->>State: open state updated
    State->>NavContainer: Re-render with new open state
    NavContainer->>User: Navigation expands/collapses
```

## Accessibility Features

### ARIA Support

- `role="menubar"` on main list
- `role="menu"` on nested lists
- `role="menuitem"` on individual items
- `aria-haspopup` for items with children
- `aria-expanded` for collapsible items
- `aria-labelledby` for nested menus

### Keyboard Navigation

- Compatible with standard menu navigation patterns
- Supports screen readers through semantic markup
- Proper focus management

### Visual Accessibility

- High contrast active states
- Clear hover indicators
- Consistent spacing and typography
- Scalable icons and text

## Performance Optimizations

### Memoization

- `useMemo` for expensive parent-finding calculations
- `useMemo` for item level adjustments
- Prevents unnecessary re-renders

### State Updates

- Efficient expansion state management
- Minimal re-renders when state changes
- Optimized dependency arrays

## Styling and Theming

The components use Grommet's theming system for consistent styling:

- **Background colors**: `background-active`, `background-hover`
- **Text colors**: `text-strong`
- **Primary colors**: `background-primary-strong`
- **Spacing**: Design system spacing tokens
- **Border radius**: `xsmall` for subtle rounded corners

## Best Practices

### Data Structure

- Keep navigation hierarchy shallow (max 2 levels recommended)
- Use meaningful, descriptive labels
- Provide icons for better visual hierarchy

### Performance

- Avoid deep nesting in navigation data
- Use stable keys for list items
- Minimize state updates

### Accessibility

- Always provide meaningful labels
- Use appropriate ARIA attributes
- Test with screen readers
- Ensure keyboard navigation works

### UX Guidelines

- Keep navigation structure predictable
- Provide visual feedback for interactions
- Auto-expand parents of active items
- Use consistent iconography

## Browser Support

Compatible with modern browsers supporting:

- ES6+ JavaScript features
- React 18+
- CSS Grid and Flexbox
- Modern ARIA attributes

## Dependencies

- **Grommet**: UI component library
- **Grommet Icons**: Icon components
- **React**: Core framework (v18+)
- **TypeScript**: Type definitions

## Troubleshooting

### Common Issues

1. **Items not expanding**: Check that `activeItem` matches the exact label
2. **Styling issues**: Verify Grommet theme is properly configured
3. **Accessibility warnings**: Ensure proper ARIA attributes are set
4. **Performance issues**: Check for unnecessary re-renders in parent components

### Debug Tips

- Use React DevTools to inspect component state
- Check console for accessibility warnings
- Test keyboard navigation thoroughly
- Verify theme values in browser dev tools
