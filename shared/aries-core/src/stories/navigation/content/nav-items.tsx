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
    url: '/adoption',
    children: [
      { label: 'Teams', url: '/teams' },
      { label: 'Adoption Levels', url: '/adoption-levels' },
    ],
  },
  {
    label: 'Products, Services & Solutions',
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
        label: 'Networking & Data Delivery',
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

export const navItemsSubheadings: NavItemType[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Components',
    url: '/components',
    children: [
      {
        label: 'Layouts',
        type: 'group',
        children: [
          {
            label: 'Box',
            url: '/components/box',
          },
          {
            label: 'Card',
            url: '/components/card',
          },
          {
            label: 'Grid',
            url: '/components/grid',
          },
        ],
      },
      {
        label: 'Controls',
        type: 'group',
        children: [
          {
            label: 'Anchor',
            url: '/components/anchor',
          },
          {
            label: 'Button',
            url: '/components/button',
          },
          {
            label: 'Menu',
            url: '/components/menu',
          },
        ],
      },
    ],
  },
  {
    label: 'Design tokens',
    url: '/design-tokens',
    children: [
      {
        label: 'Getting started',
        type: 'group',
        children: [
          {
            label: 'Overview',
            url: '/design-tokens/getting-started',
          },
          {
            label: 'Color usage',
            url: '/design-tokens/color-usage',
          },
          {
            label: 'Component states',
            url: '/design-tokens/component-states',
          },
          {
            label: 'Element tokens',
            url: '/design-tokens/element',
          },
          {
            label: 'Global tokens',
            url: '/design-tokens/global',
          },
        ],
      },
      {
        label: 'Building with design tokens',
        type: 'group',
        children: [
          {
            label: 'All design tokens',
            url: '/design-tokens/all-tokens',
          },
          {
            label: 'Using design tokens in code',
            url: '/design-tokens/using-in-code',
          },
          {
            label: 'Using design tokens in Figma',
            url: '/design-tokens/using-in-figma',
          },
          {
            label: 'Versioning',
            url: '/design-tokens/versioning',
          },
        ],
      },
    ],
  },
];

export const navItemsFlex: NavItemType[] = [
  {
    id: 'flex-solutions',
    type: 'group',
    children: [
      {
        label: 'Overview',
        url: '/flex-solutions/overview',
      },
      {
        label: 'Flex Orders',
        url: '/flex-solutions/flex-orders',
      },
      {
        label: 'Flex Devices',
        url: '/flex-solutions/flex-devices',
      },
    ],
  },
  {
    id: 'consumption',
    type: 'group',
    children: [
      {
        label: 'Consumption',
        children: [
          {
            id: 'monitor',
            type: 'group',
            label: 'Monitor',
            border: false,
            children: [
              {
                label: 'Reports',
                url: '/consumption/monitor/reports',
              },
              {
                label: 'Budgets',
                url: '/consumption/monitor/budgets',
              },
              {
                label: 'Data exports',
                url: '/consumption/monitor/data-exports',
              },
              {
                label: 'Billing estimates',
                url: '/consumption/monitor/billing-estimates',
              },
              {
                label: 'Capacity',
                url: '/consumption/monitor/capacity',
              },
            ],
          },
          {
        id: 'optimize',
        label: 'Optimize',
        type: 'group',
        border: false,
        children: [
          {
            label: 'Recommendations',
            url: '/consumption/optimize/recommendations',
          },
        ],
          },
          {
        id: 'settings',
        label: 'Settings',
        type: 'group',
        border: false,
        children: [
          {
            label: 'Data sources',
            url: '/consumption/settings/data-sources',
          },
          {
            label: 'Data rules',
            url: '/consumption/settings/data-rules',
          },
          {
            label: 'Currency',
            url: '/consumption/settings/currency',
          },
          {
            label: 'User management',
            url: '/consumption/settings/user-management',
          },
          {
            label: 'Asset management',
            url: '/consumption/settings/asset-management',
          },
        ],
          },
        ],
      },
      {
        label: 'Sustainability',
        children: [
          {
            label: 'Dashboard',
            url: '/consumption/sustainability/overview',
          },
          {
            label: 'Data configuration',
            url: '/consumption/sustainability/data-configuration',
          },
          {
            label: 'Forecasting',
            url: '/consumption/sustainability/forecasting',
          },
        ],
      },
      {
        label: 'Wellness',
        url: '/consumption/wellness',
      },
    ],
  }
];