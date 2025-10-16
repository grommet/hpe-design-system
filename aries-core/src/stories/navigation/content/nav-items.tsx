import {
  Apps,
  Storage,
  Servers,
  Network,
  ShieldSecurity,
  AIGen,
} from '@hpe-design/icons-grommet';
import { type NavItemType } from '../../../js/components';

export const navItems: NavItemType[] = [
  {
    label: 'Components',
    url: '/components',
    icon: <Apps aria-hidden="true" />,
  },
  {
    label: 'Adoption',
    children: [
      { label: 'Teams', url: '/adoption' },
      { label: 'Adoption Levels', url: '/adoption-levels' },
    ],
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Storage',
        children: [
          { label: 'Block Storage', url: '/block-storage' },
          { label: 'Object Storage', url: '/object-storage' },
          { label: 'File Storage', url: '/file-storage' },
        ],
        icon: <Storage aria-hidden="true" />,
      },
      {
        label: 'Compute',
        children: [
          { label: 'Virtual Machines', url: '/virtual-machines' },
          { label: 'Containers', url: '/containers' },
        ],
        icon: <Servers aria-hidden="true" />,
      },
      {
        label: 'Networking',
        children: [
          { label: 'VPC', url: '/vpc' },
          { label: 'Load Balancers', url: '/load-balancers' },
        ],
        icon: <Network aria-hidden="true" />,
      },
      {
        label: 'Security',
        children: [
          { label: 'IAM', url: '/iam' },
          { label: 'KMS', url: '/kms' },
        ],
        icon: <ShieldSecurity aria-hidden="true" />,
      },
      {
        label: 'AI',
        children: [
          { label: 'Machine Learning', url: '/machine-learning' },
          {
            label: 'Natural Language Processing',
            url: '/natural-language-processing',
          },
        ],
        icon: <AIGen aria-hidden="true" />,
      },
    ],
  },
];
