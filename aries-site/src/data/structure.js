/* eslint-disable max-len */
import {
  IconComponents,
  IconDesign,
  IconDevelop,
  IconFoundation,
  IconGuidelines,
  IconResources,
  IconBrand,
  IconColor,
  IconIcons,
  IconLayout,
  IconType,
  IconToken,
} from '../components/icons';

export const structure = [
  {
    name: 'Guidelines',
    color: 'green',
    description:
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
    icon: size => <IconGuidelines size={size} />,
    pages: ['Principles', 'Human Centered', 'Philosophy'],
  },
  {
    name: 'Foundation',
    color: 'red',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: size => <IconFoundation size={size} />,
    pages: [
      'Branding',
      'Color',
      'Typography',
      'Layout',
      'Iconography',
      'Tokens',
    ],
  },
  {
    name: 'Components',
    color: 'blue',
    description:
      'Our component library provides a vetted set interface elements for use in your applications and websites. Using the latest web technology to keep you compliant and performant.',
    icon: size => <IconComponents size={size} />,
    pages: [],
  },
  {
    name: 'Develop',
    color: 'orange',
    description:
      'Coding best practices, concepts, and requirements when using the brand for digital experiences.',
    icon: size => <IconDevelop size={size} />,
    pages: ['Code'],
  },
  {
    name: 'Design',
    color: 'purple',
    description:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
    icon: size => <IconDesign size={size} />,
    pages: [],
  },
  {
    name: 'Resources',
    color: 'yellow',
    description:
      'Tutorials, case studies, videos, how-to&aposs, articles, upcoming events and more about HPE Design and the Design System from the team.',
    icon: size => <IconResources size={size} />,
    pages: ['Examples', 'Videos', 'Designer', 'Themer', 'Grommet'],
  },
  {
    name: 'Principles',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Human Centered',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Philosophy',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Branding',
    description: 'CHanged',
    icon: size => <IconBrand size={size} />,
  },
  {
    name: 'Color',
    description: 'Something',
    icon: size => <IconColor size={size} />,
  },
  {
    name: 'Typography',
    description: 'Something',
    icon: size => <IconType size={size} />,
  },
  {
    name: 'Iconography',
    description: 'Something',
    icon: size => <IconIcons size={size} />,
  },
  {
    name: 'Layout',
    description: 'Something',
    icon: size => <IconLayout size={size} />,
  },
  {
    name: 'Tokens',
    description: 'Something',
    icon: size => <IconToken size={size} />,
  },
  {
    name: 'Code',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Examples',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Videos',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Designer',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Themer',
    description: 'Something',
    icon: '',
  },
  {
    name: 'Grommet',
    description: 'Something',
    icon: '',
  },
];
