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
  NameValueListPreview,
  RadioButtonGroupPreview,
  RangeInputPreview,
  SearchPreview,
  TabsPreview,
  TextAreaPreview,
  TextInputPreview,
} from '../../examples/cardPreviews';
import { SelectPreview } from '../../examples/components/select';
import { StackExample } from '../../examples/components/layouts';
import { TagPreview } from '../../examples/cardPreviews/tag';

export const components = [
  {
    name: 'Anchor',
    category: 'Controls',
    description: 'Used with text based navigation, such as inline text.',
    seoDescription: 'Used with text based navigation, such as inline text.',
    sections: [
      'Usage of Anchor vs. Button',
      'Anchor Labeling',
      'Inline Anchor',
      'Anchor to external site',
      'Anchor in a form',
      'Disabled Anchor',
      'Anchor with weight',
    ],
    preview: {
      component: () => <AnchorPreview />,
      background: 'background-front',
    },
    relatedContent: ['Button', 'Typography', 'Forms'],
    tags: ['hyperlinks', 'links', 'linking', 'navigation'],
  },
  {
    name: 'Button',
    category: 'Controls',
    description: 'Buttons are used to indicate actions that can be performed.',
    seoDescription:
      'Buttons are used to indicate actions that can be performed.',
    relatedContent: ['Anchor', 'Menu', 'Tabs'],
    sections: [
      'About Button',
      'Button Labeling',
      'Button Alignment',
      'Buttons vs. Anchors',
      'Toggle Buttons',
      'Toggle Buttons with Icons',
      'Default Button',
      'Primary Button',
      'Secondary Button',
      'Toolbar Button',
      'Color Button',
      'Button with Icon',
      'Button States',
      'Button Sizes',
    ],
    preview: {
      component: () => <ButtonPreview />,
      background: 'background-front',
    },
    tags: ['buttons', 'actions', 'button style'],
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
    sections: [
      'What makes up a Card',
      'Dashboard Example',
      'Navigation Example',
      'Card as a Dashboard Element',
      'Card with an Image',
      'Card with a Footer',
      'Grid, List, or Table',
      'More Examples of a Card',
    ],
    tags: ['tiles', 'widgets', 'containers', 'cards'],
  },
  {
    name: 'Tabs',
    category: 'Controls',
    description:
      'Tabs allow a user to access content while maintaining the existing context.',
    seoDescription:
      'Tabs allow a user to access content while maintaining the existing context.',
    sections: ['Tabs with icons', 'Tab states'],
    preview: {
      component: () => <TabsPreview />,
      background: 'background-front',
    },
    relatedContent: ['Button', 'Menu'],
    tags: ['tabs', 'tab panels', 'navigation', 'containers'],
  },
  {
    name: 'DateInput',
    category: 'Inputs',
    description:
      'A widget which allows the user to select a date or range of dates from a calendar.',
    seoDescription:
      'A widget which allows the user to select a date or range of dates from a calendar.',
    relatedContent: ['Forms', 'TextInput', 'MaskedInput'],
    sections: [
      'When using Date Input, you should',
      'Single Date',
      'Date Range',
    ],
    preview: {
      component: () => <DateInputPreview />,
      background: 'background-front',
    },
    tags: [
      'date input',
      'date picker',
      'picker',
      'calendar',
      'calendar input',
      'select date',
      'select date range',
    ],
  },
  {
    name: 'FileInput',
    category: 'Inputs',
    description: 'An input used to upload one or more files.',
    seoDescription: 'An input used to upload one or more files.',
    relatedContent: ['Forms', 'Select', 'TextInput', 'MaskedInput'],
    sections: ['FileInput with multiple files', 'FileInput within a Form'],
    preview: {
      image: {
        src: {
          light: '/componentImages/components-preview-fileinput.svg',
          dark: '/componentImages/components-preview-fileinput-invert.svg',
        },
        alt: 'HPE Design System FileInput',
        fit: 'contain',
      },
    },
    tags: [
      'input fields',
      'input types',
      'file input',
      'upload files',
      'file upload',
      'files',
    ],
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
    tags: [
      'input fields',
      'input types',
      'large text',
      'text area',
      'text input',
    ],
  },
  {
    name: 'TextInput',
    category: 'Inputs',
    description:
      'The TextInput component allows the user to input shorter forms of data and content.',
    seoDescription:
      'The TextInput component allows the user to input shorter forms of data and content.',
    sections: [
      'About TextInput',
      'Password',
      'With suggestions',
      'Labeled by icon',
    ],
    preview: {
      component: () => <TextInputPreview />,
      background: 'background-front',
    },
    relatedContent: ['Forms', 'TextArea', 'MaskedInput'],
    tags: [
      'text input',
      'input type text',
      'text field',
      'password',
      'enter password',
    ],
  },
  {
    name: 'Tip',
    category: 'Controls',
    description:
      'A Tip is used to specify extra information when the user moves the mouse pointer over the element.',
    seoDescription:
      'A Tip is used to specify extra information when the user moves the mouse pointer over the element.',
    sections: [
      'Truncation with Tip',
      'Truncated Table Cell Content',
      'Tip with icons',
      'Tip with exit',
      'Tip Content Length',
    ],
    preview: {
      image: {
        src: {
          dark: '/components-preview-tooltip-invert.svg',
          light: '/components-preview-tooltip.svg',
        },
        alt: 'HPE Tip preview',
      },
    },
    relatedContent: [
      'Layer',
      'Button',
      'Header',
      'Side to Side Navigation',
      'DataTable',
    ],
    tags: [
      'tooltip',
      'tool tip',
      'hover',
      'hover text',
      'hint',
      'truncation',
      'truncate',
    ],
  },
  {
    name: 'Search',
    category: 'Controls',
    description: 'Find content corresponding to keyword queries.',
    seoDescription: 'HPE Design System Search input design and code examples.',
    sections: [
      'Auto-suggestions',
      'Returning search results',
      'Search with Auto Suggestions',
      'Simple Search',
      'Icon Position',
    ],
    preview: {
      component: () => <SearchPreview />,
      background: 'background-front',
    },
    relatedContent: ['TextInput', 'Header'],
    tags: ['search input'],
  },
  {
    name: 'Select',
    category: 'Inputs',
    description:
      'Flexible input allowing users to choose from a list of options.',
    seoDescription:
      'Select input component allows users to choose from a list of options.',
    sections: ['When to use Select', 'Multi-Select', 'Select with Search'],
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
    tags: [
      'select options',
      'dropdown',
      'drop-down',
      'drop down',
      'option list',
      'multi select',
      'multiple values',
    ],
  },
  {
    name: 'CheckBox',
    category: 'Inputs',
    description:
      'When the user needs to select one or more options, use a checkbox.',
    seoDescription:
      'Checkbox component for HPE Design System. UX usage examples and guidance on how to ensure a checkbox maintains accessiblity.',
    sections: ['Toggle', 'CheckBox with Description'],
    relatedContent: ['CheckBoxGroup', 'Forms', 'RadioButtonGroup', 'Select'],
    preview: {
      component: () => <CheckBoxPreview />,
      background: 'background-front',
    },
    tags: ['check box', 'toggle', 'input type', 'indeterminate'],
  },
  {
    name: 'CheckBoxGroup',
    category: 'Inputs',
    description:
      'When the user needs to select one or more options from a set of options, use a CheckBoxGroup.',
    seoDescription:
      'CheckBoxGroup component for HPE Design System. UX usage examples and guidance on how to ensure a checkbox maintains accessiblity.',
    sections: ['With options as array of objects', 'Scroll'],
    relatedContent: ['Forms', 'RadioButtonGroup', 'CheckBox', 'Select'],
    preview: {
      component: () => <CheckBoxGroupPreview />,
      background: 'background-front',
    },
    tags: ['checkbox', 'checkbox group', 'check box group', 'grouped'],
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
    sections: ['About Accordion'],
    tags: ['accordian', 'acordion', 'collapse', 'panel', 'expand'],
  },
  {
    name: 'Header',
    category: 'Layouts',
    description:
      'Header is a Box with a set of preset properties for introductory content.',
    seoDescription:
      'Header is a Box with a set of preset properties for introductory content.',
    sections: [
      'About Header',
      'Application Header',
      'Page Header',
      'Header with navigation buttons',
      'Header with main action',
      'Header with search',
      'Header with avatar',
      'Header with search and actions',
      'Header for a single page',
    ],
    preview: {
      component: () => <HeaderPreview />,
      justify: 'start',
    },
    relatedContent: ['Button', 'Menu', 'TextInput', 'Dashboards', 'Search'],
    tags: ['app headers', 'navigation', 'page sections', 'page layouts'],
  },
  {
    name: 'Footer',
    category: 'Layouts',
    description:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    seoDescription:
      'Footer is a Box with a set of preset properties. Box properties allow you to customize the footer.',
    sections: [
      'Application Footer',
      'Page Footer',
      'Footer for a single page',
      'App footer with page footer',
    ],
    preview: {
      component: () => <FooterPreview />,
      justify: 'end',
    },
    relatedContent: ['Header', 'Button', 'Dashboards'],
    tags: ['app footers', 'navigation', 'page sections', 'page layouts'],
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
    tags: ['dropdown', 'drop down', 'actions', 'navigation'],
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
    tags: ['sections', 'containers', 'content containers', 'layout', 'flexbox'],
  },
  {
    name: 'Grid',
    category: 'Layouts',
    description: `A layout's best friend. From scaffolding page layouts, to organizing elements within 
    a Card, Grid is a powerful tool for composing responsive, adaptive layouts.`,
    preview: {
      component: () => <GridPreview />,
      background: 'background-front',
    },
    seoDescription: `A layout's best friend. From scaffolding page layouts to organizing elements within 
    a Card, Grid is a powerful tool for composing responsive, adaptive layouts.`,
    sections: [],
    tags: [
      'layouts',
      'page layouts',
      'responsive layout',
      'CSS grid',
      'content layouts',
    ],
    relatedContent: ['Content Layouts', 'Page Layouts', 'Box'],
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
    sections: ['Using Headings in Layer', 'Side Drawer Modal', 'Center Modal'],
    preview: {
      component: () => <LayerPreview />,
    },
    relatedContent: ['Forms', 'Button', 'Icons'],
    tags: [
      'slideout',
      'panels',
      'drawers',
      'modals',
      'side panel',
      'side drawer',
      'drop',
      'z-index',
    ],
  },
  {
    name: 'Main',
    category: 'Layouts',
    description:
      'The Main component is where you define the location and layout of the primary context of your content.',
    seoDescription:
      'The Main component is where you define the location and layout of the primary context of your content.',
    sections: [],
    relatedContent: ['Header', 'Footer', 'Grid', 'Box'],
    tags: ['layouts', 'page sections', 'header', 'footer'],
  },
  {
    name: 'MaskedInput',
    category: 'Inputs',
    description:
      'MaskedInput allows you to specify formalized text within a form field.',
    seoDescription:
      'MaskedInput allows you to specify formalized text within a form field.',
    sections: [
      'IP Address',
      'IP Range',
      'Size with units',
      'Email',
      'Time',
      'Date',
    ],
    preview: {
      component: () => <MaskedInputPreview />,
      background: 'background-front',
    },
    relatedContent: ['TextInput', 'Forms', 'Select', 'DateInput'],
    tags: [
      'input mask',
      'edit mask',
      'formatted input',
      'entry format',
      'input format',
      'format',
      'data entry',
      'validation',
      'form validation',
      'form inputs',
    ],
  },
  {
    name: 'NameValueList',
    category: 'Visualizations',
    description: 'A NameValueList displays a group of NameValuePairs.',
    seoDescription: 'A NameValueList displays a group of NameValuePairs.',
    preview: {
      component: () => <NameValueListPreview />,
      background: 'background-front',
    },
    sections: [
      'Anatomy of a NameValuePair',
      'Hierarchy',
      'Order',
      'Heading',
      'Scale',
      'Font weight',
      'Name-Value Aligment',
      'Controlling Name-Value Width',
      'Name-Value Pair with Empty Value',
      'When To Display “Empty value” Name-Value Pairs',
      'When To Omit “Empty value” Name-Value Pairs',
      'Accessibility for Name-Value Pairs with Empty Value',
    ],
    relatedContent: ['Grid', 'DataTable', 'Lists'],
    tags: [
      'name',
      'value',
      'scale',
      'pairings',
      'key-value',
      'key-value pairs',
      'description list',
      'dl',
      'description term',
      'dt',
      'description detail',
      'dd',
      'read-only input',
      'readonly',
      'read only',
      'key',
      'property list',
    ],
  },
  {
    name: 'Notification',
    category: 'Visualizations',
    description:
      'Notifications deliver transparent clarity for task and system statuses.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-notifications.svg',
          dark: '/templateImages/template-preview-notifications-invert.svg',
        },
        alt: `Image featuring a bell icon and indicator representing how a timely notification 
        might be presented to a user within an application.`,
        fit: 'contain',
      },
    },
    seoDescription: `Notifications in the HPE Design System provides patterns,
    designs, and guidance for how HPE applications can deliver end users 
    confidence and assurance by keeping them informed with timely, relevant 
    status of their systems and tasks.`,
    sections: [
      'State v.s. Status',
      'Notification Systems',
      'Toast Notification',
      'Global Banner Notification',
    ],
    relatedContent: [
      'Status Indicator',
      'Toast Notifications',
      'Global Banner Notifications',
      'Stack',
    ],
    tags: [
      'banner',
      'toast',
      'alert',
      'badge',
      'system notification',
      'global notification',
      'inline notification',
      'success message',
      'status message',
      'notification center',
      'taxonomy',
    ],
  },
  {
    name: 'RadioButtonGroup',
    category: 'Inputs',
    description:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    seoDescription:
      'When one option of a set of options can be specified, use the RadioButtonGroup component.',
    sections: ['When to use RadioButtonGroup'],
    preview: {
      component: () => <RadioButtonGroupPreview />,
      background: 'background-front',
    },
    relatedContent: ['CheckBoxGroup', 'Select', 'Forms'],
    tags: ['grouped radio button', 'radio button group', 'radio button'],
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
    tags: ['slider', 'slider input', 'volume control', 'range input'],
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
    tags: ['containers', 'layers', 'z-index'],
  },
  {
    name: 'Spinner',
    category: 'Visualizations',
    description: 'A loading state for quick asynchronous tasks.',
    preview: {
      image: {
        src: {
          light: '/components-preview-spinner.svg',
          dark: '/components-preview-spinner-invert.svg',
        },
        alt: 'HPE Spinner preview',
      },
    },
    seoDescription: 'A loading state for quick asynchronous tasks.',
    relatedContent: ['Lists', 'DataTable', 'Forms'],
    sections: [
      'When to use Spinner',
      'Spinner within a list',
      'Spinner with announcement on screen reader',
      'Spinner loading content',
    ],
    tags: [
      'loading',
      'loading indicator',
      'transition',
      'pinwheel',
      'waiting',
      'throbber',
      'spinning wheel',
      'progress indicator',
      'progress bar',
      'splash screen',
    ],
  },
  {
    name: 'DataTable',
    category: 'Visualizations',
    description: 'DataTable presents data in a column and row format.',
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
    relatedContent: ['Filtering', 'Lists', 'Card', 'Pagination'],
    seoDescription: 'Data presentation in column and row format.',
    sections: [
      'What makes up a DataTable',
      'Finding a specific record',
      'Narrowing a result set',
      'Browsing a result set',
      'Assembling a data set',
      'Setting the width of a DataTable',
      'Wrapping and truncating',
      'Truncation',
      'Options for Positioning Truncation',
      'Wrapping',
      'DataTable behaviors and actions',
      'Sorting',
      'Resizeable columns',
      'Searching and filtering DataTables',
      'Navigation via DataTable',
      'Selecting multiple records & batch actions',
      'Paginated',
      'Fixing header row and/or columns',
      'Column summaries & aggregation',
      'Use pagination or infinite scroll with DataTables',
      'Handling Empty Cells',
    ],
    tags: [
      'data table',
      'sorting columns',
      'sort data',
      'filtering',
      'colums',
      'rows',
      'tables',
      'truncation',
    ],
  },
  {
    name: 'Pagination',
    available: true,
    category: 'Controls',
    description: `Pagination divides content into separate pages in order to 
    enhance navigation to specific items.`,
    preview: {
      image: {
        src: {
          light: '/componentImages/component-preview-pagination.svg',
          dark: '/componentImages/component-preview-pagination-invert.svg',
        },
        alt: 'HPE Design System Pagination',
        fit: 'contain',
      },
    },
    seoDescription: `Pagination divides content into separate pages in order to 
    enhance navigation to specific items.`,
    sections: [
      'When to use Pagination',
      'Number of results per page',
      'Placement of pagination component',
      'Showing summary of results',
      'Paginated Table',
      'Paginated List',
      'Paginated Cards',
    ],
    relatedContent: ['DataTable', 'Lists', 'Card'],
    tags: ['paginated results', 'paginated data'],
  },
  {
    name: 'Tag',
    available: true,
    category: 'Visualizations',
    description: `Tags are metadata attributes facilitating the identification, 
    organization, searching, and filtering of resources.`,
    preview: {
      component: () => <TagPreview />,
      background: 'background-front',
    },
    seoDescription: `Tags are metadata attributes to facilitate identification, 
    organization, searching and filtering resources.`,
    sections: [
      'Guidance',
      'Anatomy',
      'Remove Button',
      'Background Color',
      'Name-Value Pair Tags',
      'Creating Name-Value Pair Tags',
      'Assigning Tags',
      'Assigning Value-only Tags',
      'Assigning Name-Value Tags',
      'Filtering with Tags',
      'Filtering with Tags on a Detail Page',
      'Filtering with Tags on a Summary Page',
    ],
    relatedContent: ['NameValueList', 'Lists'],
    tags: ['tags', 'name value pair'],
  },
  {
    name: 'Page',
    available: true,
    category: 'Layouts',
    description: `A helpful container providing consistent page layouts
     across all HPE applications.`,
    preview: {
      image: {
        src: {
          light: '/componentImages/component-preview-page.svg',
          dark: '/componentImages/component-preview-page-invert.svg',
        },
        alt: 'HPE Page Preview',
        fit: 'contain',
      },
    },
    seoDescription: `A helpful container providing consistent page layouts
    across all HPE applications.`,
    sections: ['Guidance', 'Page Content'],
    relatedContent: ['Page Layouts', 'Content Layouts', 'Box', 'Main'],
    tags: ['page', 'page content'],
  },
  {
    name: 'All Components',
    available: true,
    category: 'All',
    description:
      'Grommet components are the building blocks of the HPE Design System.',
    preview: {
      image: {
        src: {
          light: '/components-light.svg',
          dark: '/components-dark.svg',
        },
        alt: 'Purple playing cards representing HPE Design System components',
        fit: 'contain',
      },
    },
    seoDescription: 'View all HPE Design System and Grommet components.',
    sections: [
      'Sidebar',
      'Markdown',
      'Drop',
      'RangeSelector',
      'Avatar',
      'Calendar',
      'Clock',
      'DataChart',
      'Diagram',
      'Meter',
      'WorldMap',
      'Media',
      'Carousel',
      'Image',
      'Video',
      'Utilities',
      'AnnounceContext',
      'Collapsible',
      'Grommet',
      'InfiniteScroll',
      'Keyboard',
      'ResponsiveContext',
      'SkipLinks',
      'ThemeContext',
    ],
    relatedContent: [],
  },
];
