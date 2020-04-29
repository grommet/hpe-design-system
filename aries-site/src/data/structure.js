/* eslint-disable max-len */
import {
  IconCircle,
  IconDiamond,
  IconExtend,
  IconHumanCentered,
  IconIcons,
  IconSquare,
} from '../components';
import {
  AnchorPreview,
  BoxPreview,
  ButtonPreview,
  CheckBoxPreview,
  FooterPreview,
  GridPreview,
  HeaderPreview,
  LayerPreview,
  MaskedInputPreview,
  MenuPreview,
  RadioButtonGroupPreview,
  RangeInputPreview,
  SearchPreview,
  TabsPreview,
  TextAreaPreview,
  TextInputPreview,
} from '../examples/cardPreviews';
import { SelectPreview } from '../examples/components/select';
import { StackExample } from '../examples/components/layouts';

export const structure = [
  {
    name: 'Home',
    seoDescription:
      "The HPE Design System is the way Hewlett Packard Enterprise's brand, technology, and it's partners share a single language for application, web, and digital experiences.",
    pages: ['Foundation', 'Components', 'Templates', 'Extend'],
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
      'Content',
      'Color',
      'Human Centered',
      'Icons',
      'Our Brand',
      'Philosophy',
      'Principles',
      'Typography',
    ],
  },
  {
    name: 'Templates',
    color: 'orange!',
    description:
      'Jumpstart application design and development with use-case specific templates. Interactive templates demonstrate desired user experiences and the building block components used to create them.',
    icon: (size, color) => <IconDiamond size={size} color={color} />,
    preview: {
      image: {
        src: {
          light: '/carte-templates-light.svg',
          dark: '/carte-templates-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'HPE Design System starter templates for jumpstarting application screen design and development.',
    pages: ['Cards', 'Dashboards', 'Forms', 'Lists'],
  },
  {
    name: 'Components',
    color: 'purple!',
    description:
      'Our component library provides a vetted set interface elements for use in your applications and websites. Using the latest web technology to keep you compliant and performant.',
    icon: (size, color) => <IconSquare size={size} color={color} />,
    preview: {
      image: {
        src: {
          light: '/carte-components-light.svg',
          dark: '/carte-components-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: [
      'Accordion',
      'Anchor',
      'Box',
      'Button',
      'CheckBox',
      'Footer',
      'Grid',
      'Header',
      'Layer',
      'Main',
      'MaskedInput',
      'Menu',
      'RadioButtonGroup',
      'RangeInput',
      'Search',
      'Select',
      'Stack',
      'Tabs',
      'TextArea',
      'TextInput',
    ],
  },
  {
    name: 'Extend',
    color: 'black',
    description:
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
    icon: (size, color) => <IconExtend size={size} color={color} />,
    seoDescription:
      'All the aesthetics, best practices, and information about the platform and how to wield it.',
    pages: [
      'Designer Guidance',
      'Global Sidebar',
      'Designer',
      'API Chomp',
      'Table Topper',
      'HPE Docs',
      'Developer Guidance',
      'HPE Audience',
      'HPE Images',
    ],
  },
  {
    name: 'Our Brand',
    description:
      'The Element is about focus. It creates momentum and energy. It is a building block. It can move, change, expand, and constrain. It works across many touch points.',
    preview: {
      image: {
        src: '/foundationImages/foundation-preview-brand.svg',
        alt: 'HPE Our Brand Preview',
      },
    },
    seoDescription:
      'Logos are a powerful expression of our brand and who we are. Learn how to access and apply HPE and Aruba Networks logos in the experiences you create.',
    sections: ['HPE Logo', 'HPE Element', 'Aruba Logo', 'Aruba Icon'],
  },
  {
    name: 'Color',
    description:
      'Bringing out the depth and dimension of our identity, the HPE Design System use of color evokes energy and inspiration.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-colors.svg',
          dark: '/foundationImages/foundation-preview-colors-invert.svg',
        },
        alt: 'HPE Color Preview',
      },
    },
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
    name: 'Dashboards',
    description:
      'At-a-glance preview for operation critical information with easy access to areas requiring attention.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-dashboard.svg',
          dark: '/templateImages/template-preview-dashboard-invert.svg',
        },
        alt: 'HPE Dashboards Preview',
      },
    },
    seoDescription:
      'HPE Design System dashboard template for screens featuring content within tiles.',
    sections: [],
    relatedContent: ['Cards', 'Lists', 'Grid'],
  },
  {
    name: 'Forms',
    description:
      'Common form use cases from application configuration to payment acceptance.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-form.svg',
          dark: '/templateImages/template-preview-form-invert.svg',
        },
        alt: 'HPE Forms Preview',
        fit: 'contain',
      },
    },
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
    name: 'Human Centered',
    description:
      'The starting point of the design system is human centered, generating experiences which are inclusive and vibrant.',
    icon: (size, color) => <IconHumanCentered size={size} color={color} />,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-human.svg',
          dark: '/foundationImages/foundation-preview-human-invert.svg',
        },
        alt: 'HPE Human Centered',
      },
    },
    seoDescription:
      'Unlocking human potential through human centered design. HPE Design System is inclusive, attentive, adaptable, and conversational.',
    sections: ['Inclusive', 'Attentive', 'Conversational'],
  },
  {
    name: 'Icons',
    description:
      'Icons are the integral part of our visual storytelling style. This clean, dynamic style remains flexible while retaining the voice of our brand.',
    icon: (size, color) => <IconIcons size={size} color={color} />,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-icons.svg',
          dark: '/foundationImages/foundation-preview-icons-invert.svg',
        },
        alt: 'Hpe Icon Preview',
      },
    },
  },
  {
    name: 'Lists',
    description:
      'Go-to patterns for displaying many services, devices, users, and more.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-list.svg',
          dark: '/templateImages/template-preview-list-invert.svg',
        },
        alt: 'HPE Lists Preview',
        fit: 'contain',
      },
    },
    seoDescription:
      'HPE Design System template for providing a list of information.',
    sections: [],
  },
  {
    name: 'Philosophy',
    description:
      'The HPE Design System is focused on key values which engender and support human engagement and community.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-philosophy.svg',
          dark: '/foundationImages/foundation-preview-philosophy-invert.svg',
        },
        alt: 'HPE Philosophy Preview',
      },
    },
    seoDescription:
      'Learn about the underlying philosophy guiding the HPE Design System and how generosity and community enable HPE to craft experiences which advance the way people live and work',
    sections: ['Relational', 'Generous', 'Community'],
  },
  {
    name: 'Principles',
    description:
      'A clear criteria of creativity, innovation, and craftsmanship which accelerate the way people live and work.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-principles.svg',
          dark: '/foundationImages/foundation-preview-principles-invert.svg',
        },
        alt: 'HPE Principles Preview',
      },
    },
    seoDescription:
      'HPE Design System principles provide clear criteria for creating experiences our clients and partners deserve.',
    sections: [
      'Innovative and Adventurous',
      'Purposeful and Useful',
      'Integrated but Composable',
    ],
  },
  {
    name: 'Typography',
    description:
      'The MetricHPE font is an integral part of our personality and design. When we’re making a statement, our visual language is clear, recognized and understood.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-type.svg',
          dark: '/foundationImages/foundation-preview-type-invert.svg',
        },
        alt: 'HPE Typography Preview',
      },
    },
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
  {
    name: 'Designer',
    description:
      'Build HPE compliant designs in code that are ready to be consumed on the web.',
    preview: {
      image: {
        src: '/extendImages/extend-preview-designer.svg',
        alt: 'HPE Designer Preview',
      },
    },
    seoDescription:
      'Build HPE compliant designs in code that are ready to be consumed on the web.',
    sections: [],
  },
  {
    name: 'API Chomp',
    description:
      'Got API, but need to easily pull data out of it for use in your app or designs. Chomp! Chomp!',
    preview: {
      image: {
        src: '/extendImages/extend-preview-chomp.svg',
        alt: 'HPE API Chomp Preview',
      },
    },
    seoDescription:
      'Got API, but need to easily pull data out of it for use in your app or designs. Chomp! Chomp!',
    sections: [],
  },
  {
    name: 'Table Topper',
    description:
      'Build tables for you app quickly with all the filtering, sorting, and controls you could need!',
    preview: {
      image: {
        src: {
          light: '/extendImages/extend-preview-table.svg',
          dark: '/extendImages/extend-preview-table-invert.svg',
        },
        alt: 'HPE Table Topper Preview',
      },
    },
    seoDescription:
      'Build tables for you app quickly with all the filtering, sorting, and controls you could need!',
    sections: [],
  },
  {
    name: 'HPE Docs',
    description:
      'The only CMS you will ever need! Publish content quickly and easily.',
    preview: {
      image: {
        src: {
          light: '/extendImages/extend-preview-hpe-docs.svg',
          dark: '/extendImages/extend-preview-hpe-docs-invert.svg',
        },
        alt: 'HPE docs Preview',
      },
    },
    seoDescription:
      'The only CMS you will ever need! Publish content quickly and easily.',
    sections: [],
  },
  {
    name: 'HPE Audience',
    description:
      'Keep it simple! Present and share slides with this lightweight service.',
    preview: {
      image: {
        src: {
          light: '/extendImages/extend-preview-slides-audience.svg',
          dark: '/extendImages/extend-preview-slides-audience-invert.svg',
        },
        alt: 'HPE Audience Preview',
      },
    },
    seoDescription:
      'Keep it simple! Present and share slides with this lightweight service.',
    sections: [],
  },
  {
    name: 'HPE Images',
    description:
      'Need a place to host images in the cloud for use by your HPE services and apps?',
    preview: {
      image: {
        src: '/extendImages/extend-preview-hpe-images.png',
        alt: 'HPE Images Preview',
      },
    },
    seoDescription:
      'Need a place to host images in the cloud for use by your HPE services and apps?',
    sections: [],
  },
  {
    name: 'Global Sidebar',
    description:
      'For use when building applications and services that live in the HPE eccosystem.',
    preview: {
      image: {
        src: {
          light: '/extendImages/extend-preview-sidebar.svg',
          dark: '/extendImages/extend-preview-sidebar-invert.svg',
        },
        alt: 'HPE Global Sidebar Preview',
      },
    },
    seoDescription:
      'For use when building applications and services that live in the HPE eccosystem.',
    sections: [],
  },
  {
    name: 'Accordion',
    description: 'Buttons are used to indicate actions that can be performed.',
    preview: {
      image: {
        src: {
          light: '/component-preview-accordion.svg',
          dark: '/component-preview-accordion-invert.svg',
        },
        alt: 'HPE Accordion Preview',
        fit: 'contain',
      },
    },
    relatedContent: ['Tabs'],
    seoDescription:
      'Buttons are used to indicate actions that can be performed.',
    sections: [],
  },
  {
    name: 'Anchor',
    description: 'Used with text based navigation, such as inline text.',
    seoDescription: 'Used with text based navigation, such as inline text.',
    sections: [],
    preview: {
      component: () => <AnchorPreview />,
      background: 'background-front',
    },
    relatedContent: ['Button', 'Typography', 'Forms'],
  },
  {
    name: 'Box',
    description:
      'Box is where it all starts. Flexible props allow the behavior of content to be defined to optimize the user experience.',
    seoDescription:
      'Box is where it all starts. Flexible props allow the behavior of content to be defined to optimize the user experience.',
    sections: [],
    preview: {
      component: () => <BoxPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'Button',
    description: 'Buttons are used to indicate actions that can be performed.',
    seoDescription:
      'Buttons are used to indicate actions that can be performed.',
    relatedContent: ['Anchor', 'Menu', 'Tabs'],
    sections: [],
    preview: {
      component: () => <ButtonPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'CheckBox',
    description:
      'When the user needs to select one or more options, use a checkbox.',
    seoDescription:
      'When the user needs to select one or more options, use a checkbox.',
    sections: [],
    preview: {
      component: () => <CheckBoxPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'Footer',
    description:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    seoDescription:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    sections: [],
    preview: {
      component: () => <FooterPreview />,
      justify: 'end',
    },
  },
  {
    name: 'Grid',
    description:
      'The Grid component is used to layout content. Responsive grid is important to consider in every use case.',
    preview: {
      component: () => <GridPreview />,
      background: 'background-front',
    },
    seoDescription:
      'The Grid component is used to layout content. Responsive grid is important to consider in every use case.',
    sections: [],
  },
  {
    name: 'Header',
    description:
      'Header is a Box with a set of preset properties for introductory content.',
    seoDescription:
      'Header is a Box with a set of preset properties for introductory content.',
    sections: [],
    preview: {
      component: () => <HeaderPreview />,
      justify: 'start',
    },
    relatedContent: ['Button', 'Menu', 'TextInput', 'Dashboards'],
  },
  {
    name: 'Layer',
    description:
      'The Layer component is flexible and can be used in multiple use cases such as modal, dialogs, or notifications.',
    previewComponent: {
      component: () => <LayerPreview />,
    },
    seoDescription:
      'The Layer component is flexible and can be used in multiple use cases such as modal, dialogs, or notifications.',
    sections: [],
    preview: {
      component: () => <LayerPreview />,
    },
  },
  {
    name: 'Main',
    description:
      'The Main component is where you define the location and layout of the primary context of your content.',
    seoDescription:
      'The Main component is where you define the location and layout of the primary context of your content.',
    sections: [],
  },
  {
    name: 'MaskedInput',
    description:
      'MaskedInput allows you to specify formailzed text within a form field.',
    seoDescription:
      'MaskedInput allows you to specify formailzed text within a form field.',
    sections: [],
    preview: {
      component: () => <MaskedInputPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'Menu',
    description:
      'Menu contains a list of actions. When a menu item is clicked, the menu closes and the action is executed.',
    seoDescription:
      'Menu contains a list of actions. When a menu item is clicked, the menu closes and the action is executed.',
    sections: [],
    preview: {
      component: () => <MenuPreview />,
      background: 'background-front',
    },
    relatedContent: ['Header', 'Dashboards', 'Select'],
  },
  {
    name: 'RadioButtonGroup',
    description:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    seoDescription:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    sections: [],
    preview: {
      component: () => <RadioButtonGroupPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'RangeInput',
    description:
      'The RangeInput component is a slider control that provides a handle the user can move to make changes to values.',
    seoDescription:
      'The RangeInput component is a slider control that provides a handle the user can move to make changes to values.',
    sections: [],
    preview: {
      component: () => <RangeInputPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'Search',
    description: 'Find content corresponding to keyword queries.',
    seoDescription: 'HPE Design System Search input design and code examples.',
    sections: [],
    preview: {
      component: () => <SearchPreview />,
      background: 'background-front',
    },
    relatedContent: ['TextInput', 'Header'],
  },
  {
    name: 'Select',
    description:
      'Flexible input allowing users to choose from a list of options.',
    seoDescription:
      'Select input component allows users to choose from a list of options.',
    sections: [],
    preview: {
      component: () => <SelectPreview />,
      background: 'background-front',
    },
    relatedContent: [
      'Forms',
      'Menu',
      'RadioButtonGroup',
      'CheckBox',
      'TextInput',
      'MaskedInput',
    ],
  },
  {
    name: 'Stack',
    description:
      'A Stack component is a container that stacks content on top of each other.',
    preview: {
      component: () => <StackExample />,
      background: 'background-front',
    },
    seoDescription:
      'A Stack component is a container that stacks content on top of each other.',
    sections: [],
  },
  {
    name: 'Tabs',
    description:
      'Tabs allow a user to access content while maintaining the existing context.',
    seoDescription:
      'Tabs allow a user to access content while maintaining the existing context.',
    sections: [],
    preview: {
      component: () => <TabsPreview />,
      background: 'background-front',
    },
    relatedContent: ['Button', 'Menu', 'Global Sidebar'],
  },
  {
    name: 'TextArea',
    description:
      'When you need to allow the user to provide longer forms of content, use a TextArea component.',
    seoDescription:
      'When you need to allow the user to provide longer forms of content, use a TextArea component.',
    sections: [],
    preview: {
      component: () => <TextAreaPreview />,
      background: 'background-front',
    },
    relatedContent: ['Forms', 'TextInput', 'MaskedInput'],
  },
  {
    name: 'TextInput',
    description:
      'The TextInput component allows the user to input shorter forms of data and content.',
    seoDescription:
      'The TextInput component allows the user to input shorter forms of data and content.',
    sections: [],
    preview: {
      component: () => <TextInputPreview />,
      background: 'background-front',
    },
    relatedContent: ['Forms', 'TextArea', 'MaskedInput'],
  },
  {
    name: 'Cards',
    description:
      'Flexible props allow the behavior of content to be defined to optimize the user experience.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-cards.svg',
          dark: '/templateImages/template-preview-cards-invert.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'Flexible props allow the behavior of content to be defined to optimize the user experience.',
    sections: [],
  },
  {
    name: 'Content',
    description:
      'What and how we layout content is crucial to clear communication and ease-of-use.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-content.svg',
          dark: '/foundationImages/foundation-preview-content-invert.svg',
        },
        alt: 'HPE Content Preview',
      },
    },
    seoDescription:
      'What and how we layout content is crucial to clear communication and ease-of-use.',
    sections: [],
  },
  {
    name: 'Designer Guidance',
    description:
      'Starter files, patterns, interactions, and workflows on how to succeed using the design resources from HPE Design System and the HPE Brand.',
    seoDescription:
      'View patterns, interactions, and other best practices for how to succeed using resources included with the HPE Design System.',
    sections: [
      'Getting started',
      'Setting up your Figma account',
      'Joining the HPE Design System Figma team',
      'HPE Design System Library',
    ],
    relatedContent: ['Components', 'Templates', 'Designer'],
  },
  {
    name: 'Developer Guidance',
    description:
      'Resources for setting up your application with the HPE Design System library and HPE theme.',
    seoDescription:
      'Resources for setting up your application with the HPE Design System library and HPE theme.',
    sections: [
      'Getting started',
      'Preferred environment',
      'ReactJS and Grommet starter resources',
      'Applying the HPE theme',
      "What if our team doesn't use ReactJS?",
    ],
    relatedContent: ['Components', 'Templates', 'Designer'],
  },
];
