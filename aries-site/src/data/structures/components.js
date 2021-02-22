/* eslint-disable max-len */
import {
  AnchorPreview,
  BoxPreview,
  ButtonPreview,
  CheckBoxPreview,
  CheckBoxGroupPreview,
  DateInputPreview,
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
} from '../../examples/cardPreviews';
import { SelectPreview } from '../../examples/components/select';
import { StackExample } from '../../examples/components/layouts';

const statuses = {
  complete: 'Complete',
  inProgress: 'In Progress',
};

export const components = [
  {
    name: 'Anchor',
    category: 'Controls',
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
    name: 'Button',
    category: 'Controls',
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
    name: 'Card',
    category: 'Layouts',
    description:
      'A container providing at-a-glance information and easy access to more details.',
    seoDescription:
      'A container providing at-a-glance information and easy access to more details.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-cards.svg',
          dark: '/templateImages/template-preview-cards-invert.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    relatedContent: ['Lists', 'Dashboards', 'Navigation'],
    sections: [],
  },
  {
    name: 'Tabs',
    category: 'Controls',
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
    name: 'DateInput',
    category: 'Inputs',
    description:
      'A widget which allows the user to select a date or range of dates from a calendar.',
    seoDescription:
      'A widget which allows the user to select a date or range of dates from a calendar.',
    relatedContent: ['Forms', 'TextInput', 'MaskedInput'],
    sections: [],
    preview: {
      component: () => <DateInputPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'TextArea',
    category: 'Inputs',
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
    category: 'Inputs',
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
    name: 'Tooltip',
    category: 'Controls',
    description:
      'A tooltip gives a brief, informative message when the user hovers over an element.',
    seoDescription:
      'A tooltip gives a brief, informative message when the user hovers over an element.',
    sections: [],
    preview: {
      image: {
        src: {
          dark: '/components-preview-tooltip-invert.svg',
          light: '/components-preview-tooltip.svg',
        },
        alt: 'HPE tooltip preview',
      },
    },
    relatedContent: ['Layer', 'Button', 'Header'],
  },
  {
    name: 'Search',
    category: 'Controls',
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
    category: 'Inputs',
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
    name: 'CheckBox',
    category: 'Inputs',
    description:
      'When the user needs to select one or more options, use a checkbox.',
    seoDescription:
      'Checkbox component for HPE Design System. UX usage examples and guidance on how to ensure a checkbox maintains accessiblity.',
    sections: [],
    relatedContent: ['CheckBoxGroup', 'Forms', 'RadioButtonGroup', 'Select'],
    preview: {
      component: () => <CheckBoxPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'CheckBoxGroup',
    category: 'Inputs',
    description:
      'When the user needs to select one or more options from a set of options, use a CheckBoxGroup.',
    seoDescription:
      'CheckBoxGroup component for HPE Design System. UX usage examples and guidance on how to ensure a checkbox maintains accessiblity.',
    sections: [],
    relatedContent: ['Forms', 'RadioButtonGroup', 'CheckBox', 'Select'],
    preview: {
      component: () => <CheckBoxGroupPreview />,
      background: 'background-front',
    },
  },
  {
    name: 'Accordion',
    category: 'Controls',
    description: 'The accordion affords content to be delivered progressively.',
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
    relatedContent: ['Layer', 'Lists', 'Tabs'],
    seoDescription:
      'The accordion affords content to be delivered progressively.',
    sections: [],
  },
  {
    name: 'Header',
    category: 'Layouts',
    description:
      'Header is a Box with a set of preset properties for introductory content.',
    seoDescription:
      'Header is a Box with a set of preset properties for introductory content.',
    sections: [],
    preview: {
      component: () => <HeaderPreview />,
      justify: 'start',
    },
    relatedContent: [
      'Button',
      'Menu',
      'TextInput',
      'Dashboards',
      'Global Sidebar',
      'Search',
    ],
  },
  {
    name: 'Footer',
    category: 'Layouts',
    description:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    seoDescription:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    sections: [],
    preview: {
      component: () => <FooterPreview />,
      justify: 'end',
    },
    relatedContent: ['Header', 'Button', 'Dashboards'],
  },
  {
    name: 'Menu',
    category: 'Controls',
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
    status: {
      figma: statuses.inProgress,
      grommet: statuses.inProgress,
    },
  },
  {
    name: 'Box',
    category: 'Layouts',
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
    name: 'Grid',
    category: 'Layouts',
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
    name: 'Layer',
    category: 'Layouts',
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
    relatedContent: ['Forms', 'Button', 'Icons'],
  },
  {
    name: 'Main',
    category: 'Layouts',
    description:
      'The Main component is where you define the location and layout of the primary context of your content.',
    seoDescription:
      'The Main component is where you define the location and layout of the primary context of your content.',
    sections: [],
  },
  {
    name: 'MaskedInput',
    category: 'Inputs',
    description:
      'MaskedInput allows you to specify formalized text within a form field.',
    seoDescription:
      'MaskedInput allows you to specify formalized text within a form field.',
    sections: [],
    preview: {
      component: () => <MaskedInputPreview />,
      background: 'background-front',
    },
    relatedContent: ['TextInput', 'Forms', 'Select'],
  },

  {
    name: 'RadioButtonGroup',
    category: 'Inputs',
    description:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    seoDescription:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    sections: [],
    preview: {
      component: () => <RadioButtonGroupPreview />,
      background: 'background-front',
    },
    relatedContent: ['CheckBoxGroup', 'Select', 'Forms'],
    status: {
      figma: statuses.complete,
      grommet: statuses.inProgress,
    },
  },
  {
    name: 'RangeInput',
    category: 'Inputs',
    description:
      'The RangeInput component is a slider control that provides a handle the user can move to make changes to values.',
    seoDescription:
      'The RangeInput component is a slider control that provides a handle the user can move to make changes to values.',
    sections: [],
    preview: {
      component: () => <RangeInputPreview />,
      background: 'background-front',
    },
    status: {
      figma: statuses.complete,
      grommet: statuses.inProgress,
    },
  },
  {
    name: 'Stack',
    category: 'Layouts',
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
    name: 'Table',
    category: 'Visualizations',
    description: 'Table presents data in a column and row format.',
    preview: {
      image: {
        src: {
          light: '/componentImages/component-preview-table.svg',
          dark: '/componentImages/component-preview-table-invert.svg',
        },
        alt: 'HPE Tables Preview',
        fit: 'contain',
      },
    },
    relatedContent: ['Filtering', 'Lists', 'Card'],
    seoDescription: 'Data presentation in column and row format.',
    sections: [],
    status: {
      figma: statuses.inProgress,
      grommet: statuses.inProgress,
    },
  },
];
