/* eslint-disable max-len */
import {
  IconBrand,
  IconCircle,
  IconColor,
  IconControls,
  IconDesign,
  IconDevelop,
  IconDiamond,
  IconGuidelines,
  IconHumanCentered,
  IconIcons,
  IconInput,
  IconLayoutComponents,
  IconPhilosophy,
  IconPrinciples,
  IconResources,
  IconSquare,
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
      'Templates',
      'Components',
      'Develop',
      'Design',
      'Resources',
    ],
  },
  {
    name: 'Feedback',
    seoDescription:
      'Something missing or looking for more information? Get in touch to help make the HPE Design System better.',
    pages: [],
  },
  {
    name: 'Foundation',
    color: 'green!',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: (size, color) => <IconCircle size={size} color={color} />,
    seoDescription:
      'Foundational elements of HPE which encompass the voice, language, and visuals that personify our brand.',
    pages: [
      'Branding',
      'Color',
      'Human Centered',
      'Iconography',
      'Philosophy',
      'Principles',
      'Tokens',
      'Typography',
    ],
  },
  {
    name: 'Templates',
    color: 'orange!',
    description:
      'Jumpstart application design and development with use-case specific templates. Interactive templates demonstrate desired user experiences and the building block components used to create them.',
    icon: (size, color) => <IconDiamond size={size} color={color} />,
    seoDescription:
      'HPE Design System starter templates for jumpstarting application screen design and development.',
    pages: ['Dashboards', 'Forms', 'List Views'],
  },
  {
    name: 'Components',
    color: 'purple!',
    description:
      'Our component library provides a vetted set interface elements for use in your applications and websites. Using the latest web technology to keep you compliant and performant.',
    icon: (size, color) => <IconSquare size={size} color={color} />,
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: ['Layout', 'Controls', 'Input'],
  },
  {
    name: 'Branding',
    description:
      'The Element is about focus. It creates momentum and energy. It is a building block. It can move, change, expand, and constrain. It works across many touch points.',
    icon: (size, color) => <IconBrand size={size} color={color} />,
    seoDescription:
      'Logos are a powerful expression of our brand and who we are. Learn how to access and apply HPE and Aruba Networks logos in the experiences you create.',
    sections: ['HPE Logo', 'HPE Element', 'Aruba Logo', 'Aruba Icon'],
  },
  {
    name: 'Color',
    description:
      'Bringing out the depth and dimension of our identity, the HPE Design System use of color evokes energy and inspiration.',
    icon: (size, color) => <IconColor size={size} color={color} />,
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
      'Status Colors',
    ],
  },
  {
    name: 'Controls',
    description:
      'Bringing your project to life and creating meaningful experiences that make sense for your customers.',
    icon: (size, color) => <IconControls size={size} color={color} />,
    seoDescription:
      'HPE Design System styled interactive components for your applications.',
    sections: ['Accordion', 'Anchor', 'Button', 'Menu', 'Tabs'],
  },
  {
    name: 'Dashboards',
    description:
      'At-a-glance preview for operation critical information with easy access to areas requiring attention.',
    icon: (size, color) => <IconBrand size={size} color={color} />,
    seoDescription:
      'HPE Design System dashboard template for screens featuring content within tiles.',
    sections: [],
  },
  {
    name: 'Design',
    color: 'purple',
    description:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
    icon: (size, color) => <IconDesign size={size} color={color} />,
    seoDescription:
      'View patterns, interactions, and other best practices for how to succeed using resources included with the HPE Design System.',
    pages: [],
    sections: [
      'Preferred environment',
      'Getting started',
      'HPE Design System Sticker Sheet',
    ],
  },
  {
    name: 'Develop',
    color: 'orange',
    description:
      'Coding best practices, concepts, and requirements when using the brand for digital experiences.',
    icon: (size, color) => <IconDevelop size={size} color={color} />,
    seoDescription:
      'HPE Design System coding best practices, concepts, and requirements when implementing user interfaces for digital experiences.',
    pages: [],
    sections: [
      'Preferred environment',
      'Getting started',
      'Applying the HPE theme',
      "What is our team doesn't use ReactJS?",
    ],
  },
  {
    name: 'Forms',
    description:
      'Common form use cases from application configuration to payment acceptance.',
    icon: (size, color) => <IconBrand size={size} color={color} />,
    seoDescription: 'HPE Design System form examples and templates.',
    sections: [
      'Sign In',
      'Sign Up',
      'Change Password',
      'Pay',
      'Settings',
      'Filter',
      'Sort',
      'Shipping',
      'Customize',
    ],
  },
  {
    name: 'Guidelines',
    color: 'green',
    description:
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
    icon: (size, color) => <IconGuidelines size={size} color={color} />,
    seoDescription:
      'The heartbeat and mindset of the HPE Design System describing the ideology and standards informing every design decision.',
    pages: ['Philosophy', 'Human Centered', 'Principles'],
  },
  {
    name: 'Human Centered',
    description:
      'The starting point of the design system is human centered, generating experiences which are inclusive and vibrant.',
    icon: (size, color) => <IconHumanCentered size={size} color={color} />,
    seoDescription:
      'Unlocking human potential through human centered design. HPE Design System is inclusive, attentive, adaptable, and conversational.',
    sections: ['Inclusive', 'Attentive', 'Conversational'],
  },
  {
    name: 'Iconography',
    description:
      'Icons are the integral part of our visual storytelling style. This clean, dynamic style remains flexible while retaining the voice of our brand.',
    icon: (size, color) => <IconIcons size={size} color={color} />,
  },
  {
    name: 'Input',
    description:
      'Thoughtful and intentional use of input components can bring about engaging experiences.',
    icon: (size, color) => <IconInput size={size} color={color} />,
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
  {
    name: 'Layout',
    description:
      'Grid, box, header and footer. All the core components to build the foundation for your content.',
    icon: (size, color) => <IconLayoutComponents size={size} color={color} />,
    seoDescription:
      "Get started with HPE Design System's foundational layout components Header, Main, Footer, and more.",
    sections: ['Box', 'Footer', 'Grid', 'Header', 'Layer', 'Main', 'Stack'],
  },
  {
    name: 'List Views',
    description:
      'Go-to patterns for displaying many services, devices, users, and more.',
    icon: (size, color) => <IconBrand size={size} color={color} />,
    seoDescription:
      'HPE Design System template for providing a list of information.',
    sections: [],
  },
  {
    name: 'Philosophy',
    description:
      'The HPE Design System is focused on key values which engender and support human engagement and community.',
    icon: (size, color) => <IconPhilosophy size={size} color={color} />,
    seoDescription:
      'Learn about the underlying philosophy guiding the HPE Design System and how generosity and community enable HPE to craft experiences which advance the way people live and work',
    sections: ['Relational', 'Generous', 'Community'],
  },
  {
    name: 'Principles',
    description:
      'A clear criteria of creativity, innovation, and craftsmanship which accelerate the way people live and work.',
    icon: (size, color) => <IconPrinciples size={size} color={color} />,
    seoDescription:
      'HPE Design System principles provide clear criteria for creating experiences our clients and partners deserve.',
    sections: [
      'Innovative and Adventurous',
      'Purposeful and Useful',
      'Integrated but Composable',
    ],
  },
  {
    name: 'Resources',
    color: 'yellow',
    description:
      'Tutorials, case studies, videos, how-tos, articles, upcoming events and more about HPE Design and the Design System from the team.',
    icon: (size, color) => <IconResources size={size} color={color} />,
    seoDescription:
      'View tutorials, case studies, videos, how-tos, articles, and other helpful resources to succeed with the HPE Design System.',
    pages: [],
  },
  {
    name: 'Tokens',
    description:
      'Authentication and security to build confidence and safety for your users in the midst of their digital experience.',
    icon: (size, color) => <IconToken size={size} color={color} />,
  },
  {
    name: 'Typography',
    description:
      'The MetricHPE font is an integral part of our personality and design. When we’re making a statement, our visual language is clear, recognized and understood.',
    icon: (size, color) => <IconType size={size} color={color} />,
    seoDescription:
      'HPE Design System guidance for applying typefaces, font weights, styles, sizing, and more.',
    sections: [
      'MetricHPE Styles',
      'Heading',
      'Heading Sizes',
      'Paragraph',
      'Text',
    ],
  },
];
