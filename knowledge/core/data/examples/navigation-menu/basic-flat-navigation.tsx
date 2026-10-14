import { Dashboard, Settings, User } from '@hpe-design/icons-grommet';

const navItems = [
  { label: 'Dashboard', url: '/dashboard', icon: <Dashboard /> },
  { label: 'Settings', url: '/settings', icon: <Settings /> },
  { label: 'Profile', url: '/profile', icon: <User /> },
];

<NavigationMenu
  items={navItems}
  open={true}
  title="My App"
  activeItem="Dashboard"
  onSelect={({ item }) => setActiveItem(item.label)}
/>