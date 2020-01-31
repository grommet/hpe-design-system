/* eslint-disable max-len */
import {
  IconBrand,
  IconColor,
  IconComponents,
  IconControls,
  IconDesign,
  IconDevelop,
  IconFoundation,
  IconGuidelines,
  IconHumanCentered,
  IconIcons,
  IconInput,
  IconLayout,
  IconLayoutComponents,
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
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
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
    pages: ['Branding', 'Color', 'Typography', 'Iconography', 'Tokens'],
  },
  {
    name: 'Components',
    color: 'blue',
    description:
      'Our component library provides a vetted set interface elements for use in your applications and websites. Using the latest web technology to keep you compliant and performant.',
    icon: size => <IconComponents size={size} />,
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: ['Layout', 'Controls', 'Input'],
  },
  {
    name: 'Develop',
    color: 'orange',
    description:
      'Coding best practices, concepts, and requirements when using the brand for digital experiences.',
    icon: size => <IconDevelop size={size} />,
    seoDescription:
      'HPE Design System coding best practices, concepts, and requirements when implementing user interfaces for digital experiences.',
    pages: [],
  },
  {
    name: 'Design',
    color: 'purple',
    description:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
    icon: size => <IconDesign size={size} />,
    seoDescription:
      'View patterns, interactions, and other best practices for how to succeed using resources included with the HPE Design System.',
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
    pages: [],
  },
  {
    name: 'Principles',
    description:
      'A clear criteria of creativity, innovation, and craftsmanship which accelerate the way people live and work.',
    icon: size => <IconPrinciples size={size} />,
    seoDescription:
      'HPE Design System principles provide clear criteria for creating experiences our clients and partners deserve.',
    sections: [
      'Innovative and Adventurous',
      'Purposeful and Useful',
      'Integrated but Composable',
    ],
  },
  {
    name: 'Human Centered',
    description:
      'The starting point of the design system is human centered, generating experiences which are inclusive and vibrant.',
    icon: size => <IconHumanCentered size={size} />,
    seoDescription:
      'Unlocking human potential through human centered design. HPE Design System is inclusive, attentive, adaptable, and conversational.',
    sections: ['Inclusive', 'Attentive', 'Conversational'],
  },
  {
    name: 'Philosophy',
    description:
      'The HPE Design System is focused on key values which engender and support human engagement and community.',
    icon: size => <IconPhilosophy size={size} />,
    seoDescription:
      'Learn about the underlying philosophy guiding the HPE Design System and how generosity and community enable HPE to craft experiences which advance the way people live and work',
    sections: ['Relational', 'Generous', 'Community'],
  },
  {
    name: 'Branding',
    description:
      'The Element is about focus. It creates momentum and energy. It is a building block. It can move, change, expand, and constrain. It works across many touch points.',
    icon: size => <IconBrand size={size} />,
    seoDescription:
      'Logos are a powerful expression of our brand and who we are. Learn how to access and apply HPE and Aruba Networks logos in the experiences you create.',
    sections: ['HPE Logo', 'HPE Element', 'Aruba Logo', 'Aruba Icon'],
  },
  {
    name: 'Color',
    description:
      'Bringing out the depth and dimension of our identity, the HPE Design System use of color evokes energy and inspiration.',
    icon: size => <IconColor size={size} />,
    seoDescription:
      'HPE Design System color palette brings out the depth and dimension of our identity. From sophisticated, neutral hues reflective of technology to vibrant, saturated colors that evoke energy and inspiration.',
    sections: [
      'Color Palettes',
      'Brand Color',
      'Core Palette',
      'Light Palette',
      'Dark Palette',
      'Background Colors',
      'Background Palette',
      'Contrast',
      'Text Colors',
      'Text Color Palette',
      'Call to Action Text',
    ],
  },
  {
    name: 'Typography',
    description:
      'The MetricHPE font is an integral part of our personality and design. When we’re making a statement, our visual language is clear, recognized and understood.',
    icon: size => <IconType size={size} />,
    seoDescription:
      'HPE Design System guidance for applying typefaces, font weights, styles, sizing, and more.',
    sections: [
      'Typographic scales',
      'Presentation scale',
      'Display scale',
      'Hand scale',
      'Typeface',
      'Font weights',
      'Font styles',
      'Font stacks',
    ],
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
      'Grid, box, header and footer. All the core components to build the foundation for your content.',
    icon: size => <IconLayoutComponents size={size} />,
    seoDescription:
      "Get started with HPE Design System's foundational layout components Header, Main, Footer, and more.",
    sections: ['Box', 'Footer', 'Grid', 'Header', 'Layer', 'Main', 'Stack'],
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
  {
    name: 'Controls',
    description:
      'Bringing your project to life and creating meaningful experiences that make sense for your customers.',
    icon: size => <IconControls size={size} />,
    seoDescription:
      'HPE Design System styled interactive components for your applications.',
    sections: ['Accordion', 'Anchor', 'Button', 'Menu', 'Tabs'],
  },
  {
    name: 'Input',
    description:
      'Thoughtful and intentional use of input components can bring about engaging experiences.',
    icon: size => <IconInput size={size} />,
    seoDescription: '',
    sections: [
      'Checkbox',
      'MaskedInput',
      'RadioButtonGroup',
      'RangeInput',
      'Select',
      'TextArea',
      'TextInput',
      'Form',
    ],
  },
];
