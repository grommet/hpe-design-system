/* eslint-disable max-len */
import {
  IconBrand,
  IconColor,
  IconComponents,
  IconDesign,
  IconDevelop,
  IconFoundation,
  IconGuidelines,
  IconHumanCentered,
  IconIcons,
  IconLayout,
  IconPhilosophy,
  IconPrinciples,
  IconResources,
  IconToken,
  IconType,
} from '../components';

export const structure = [
  {
    name: 'Home',
    pages: [
      'Guidelines',
      'Foundation',
      'Components',
      'Develop',
      'Design',
      'Resources',
    ],
  },
  {
    name: 'Guidelines',
    color: 'green',
    description:
      'This is the heartbeat and mindset of the HPE Design System. It is the ideology and set of standards which hold us accountable to every design decision.',
    icon: size => <IconGuidelines size={size} />,
    pages: ['Philosophy', 'Human Centered', 'Principles'],
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
    description:
      'A clear criteria of creativity, innovation, and craftsmanship which accelerate the way people live and work.',
    icon: size => <IconPrinciples size={size} />,
  },
  {
    name: 'Human Centered',
    description:
      'The starting point of the design system is human centered, generating experiences which are inclusive and vibrant.',
    icon: size => <IconHumanCentered size={size} />,
  },
  {
    name: 'Philosophy',
    description:
      'The HPE Design System is focused on key values which engender and support human engagement and community.',
    icon: size => <IconPhilosophy size={size} />,
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
