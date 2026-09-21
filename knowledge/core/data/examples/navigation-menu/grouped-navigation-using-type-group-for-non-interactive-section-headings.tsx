const navItems = [
  {
    label: 'Components',
    children: [
      {
        label: 'Layout',
        type: 'group',
        children: [
          { label: 'Box', url: '/components/box' },
          { label: 'Grid', url: '/components/grid' },
        ],
      },
      {
        label: 'Controls',
        type: 'group',
        children: [
          { label: 'Button', url: '/components/button' },
          { label: 'Menu', url: '/components/menu' },
        ],
      },
    ],
  },
];

<NavigationMenu
  items={navItems}
  open={true}
  title="Components"
  activeItem="Button"
  onSelect={({ item }) => setActiveItem(item.label)}
/>