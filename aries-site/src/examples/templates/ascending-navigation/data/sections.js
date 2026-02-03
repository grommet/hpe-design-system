import { User, Home, Template } from '@hpe-design/icons-grommet';

export const sectionConfig = {
  home: {
    label: 'Identity & access',
    subtitle:
      'Manage users, servers, and permissions across your system.',
    details:
      'Control who and what can access your systems. Manage users, servers, '
      + 'roles, and permissions in one place.',
    icon: <Home size="large" />,
  },
  pageOne: {
    label: 'Users',
    subtitle: 'Manage users and their access.',
    details:
      'Invite teammates, assign roles, and review permissions in one place. '
      + 'Use roles to ensure people only have access to what they need.',
    icon: <User size="large" />,
  },
  pageTwo: {
    label: 'Servers',
    subtitle: 'Manage all of your HPE servers.',
    details:
      'See all servers at a glance, check status and performance, and take '
      + 'action when needed.',
    icon: <Template size="large" />,
  },
};
