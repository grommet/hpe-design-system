const navItems = [
  {
    label: 'Components',
    children: [
      { label: 'Button', url: '/components/button' },
      { label: 'Card', url: '/components/card' },
      { label: 'Grid', url: '/components/grid' },
    ],
  },
  {
    label: 'Tokens',
    children: [
      { label: 'Color', url: '/tokens/color' },
      { label: 'Spacing', url: '/tokens/spacing' },
    ],
  },
];

<NavigationMenu
  items={navItems}
  open={true}
  title="Design System"
  activeItem="Button"
  onSelect={({ item }) => setActiveItem(item.label)}
/>