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

export const navItemsSubheadings = [
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
