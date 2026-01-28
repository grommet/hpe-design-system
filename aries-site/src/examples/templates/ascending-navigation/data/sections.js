import { User, Home, Help, Template } from '@hpe-design/icons-grommet';

export const sectionConfig = {
  home: {
    label: 'Identity & access',
    subtitle: 'Securely manage users and access to resources.',
    details: 'Securely Lorem ipsum dolor.',
    icon: <Home size="large" />,
  },
  pageOne: {
    label: 'Users',
    subtitle:
      'Invite users to your organization and assign access to resources.',
    details: 'Securely Lorem ipsum dolor.',
    icon: <User size="large" />,
  },
  pageTwo: {
    label: 'Hardware',
    subtitle: 'This is hardware section.',
    details: 'Securely Lorem ipsum dolor.',
    icon: <Template size="large" />,
  },
  pageThree: {
    label: 'Help',
    subtitle: 'This is the help section.',
    details: 'Securely Lorem ipsum dolor.',
    icon: <Help size="large" />,
  },
};
