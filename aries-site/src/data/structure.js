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
    seoDescription:
      "The HPE Design System is the way Hewlett Packard Enterprise's brand, technology, and it's partners share a single language for application, web, and digital experiences.",
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
    seoDescription:
      'The heartbeat and mindset of the HPE Design System describing the ideology and standards informing every design decision.',
    pages: ['Philosophy', 'Human Centered', 'Principles'],
  },
  {
    name: 'Foundation',
    color: 'red',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: size => <IconFoundation size={size} />,
    seoDescription:
      'Foundational elements of HPE which encompass the voice, language, and visuals that personify our brand.',
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
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: [],
  },
  {
    name: 'Develop',
    color: 'orange',
    description:
      'Coding best practices, concepts, and requirements when using the brand for digital experiences.',
    icon: size => <IconDevelop size={size} />,
    seoDescription:
      'HPE Design Systme coding best practices, concepts, and requirements when implementing user interfaces for digital experiences.',
    pages: ['Code'],
  },
  {
    name: 'Design',
    color: 'purple',
    description:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
    icon: size => <IconDesign size={size} />,
    seoDescription:
      'View patterns, interactions, and other best practices for how to succedd using resources included with the HPE Design System.',
    pages: [],
  },
  {
    name: 'Resources',
    color: 'yellow',
    description:
      'Tutorials, case studies, videos, how-tos, articles, upcoming events and more about HPE Design and the Design System from the team.',
    icon: size => <IconResources size={size} />,
    seoDescription:
      'View tutorials, case studies, videos, how-tos, articles, and other helpful resources to succeed with the HPE Design System.',
    pages: ['Examples', 'Videos', 'Designer', 'Themer', 'Grommet'],
  },
  {
    name: 'Principles',
    description:
      'A clear criteria of creativity, innovation, and craftsmanship which accelerate the way people live and work.',
    icon: size => <IconPrinciples size={size} />,
    seoDescription:
      'HPE Design System principles provide clear criteria for creating experiences our clients and partners deserve.',
  },
  {
    name: 'Human Centered',
    description:
      'The starting point of the design system is human centered, generating experiences which are inclusive and vibrant.',
    icon: size => <IconHumanCentered size={size} />,
    seoDescription:
      'Unlocking human potential through human centered design. HPE Design System is inclusive, attentive, adaptable, and conversational.',
  },
  {
    name: 'Philosophy',
    description:
      'The HPE Design System is focused on key values which engender and support human engagement and community.',
    icon: size => <IconPhilosophy size={size} />,
    seoDescription:
      'Learn about the underlying philosophy guiding the HPE Design System and how generosity and community enable HPE to craft experiences which advance the way people live and work',
  },
  {
    name: 'Branding',
    description:
      'The Element is about focus. It creates momentum and energy. It is a building block. It can move, change, expand, and constrain. It works across many touch points.',
    icon: size => <IconBrand size={size} />,
    seoDescription:
      'Logos are a powerful expression of our brand and who we are. Learn how to access and apply HPE and Aruba Networks logos in the experiences you create.',
  },
  {
    name: 'Color',
    description:
      'Bringing out the depth and dimension of our identity, the HPE Design System use of color evokes energy and inspiration.',
    icon: size => <IconColor size={size} />,
    seoDescription:
      'HPE Design System color palette brings out the depth and dimension of our identity. From sophisticated, neutral hues reflective of technology to vibrant, saturated colors that evoke energy and inspiration.',
  },
  {
    name: 'Typography',
    description:
      'The MetricHPE font is an integral part of our personality and design. When we’re making a statement, our visual language is clear, recognized and understood.',
    icon: size => <IconType size={size} />,
  },
  {
    name: 'Iconography',
    description:
      'Icons are the integral part of our visual storytelling style. This clean, dynamic style remains flexible while retaining the voice of our brand.',
    icon: size => <IconIcons size={size} />,
  },
  {
    name: 'Layout',
    description:
      'The HPE Design System provides the framework to build a composition that brings clarity and simplicity to navigate the digital landscape.',
    icon: size => <IconLayout size={size} />,
  },
  {
    name: 'Tokens',
    description:
      'Authentication and security to build confidence and safety for your users in the midst of their digital experience.',
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
