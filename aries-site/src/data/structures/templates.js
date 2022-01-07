import {
  CodeBlocksPreview,
  StatusIndicatorPreview,
  ToastPreview,
} from '../../examples/cardPreviews';

export const templates = [
  {
    name: 'Forms',
    available: true,
    cardOrder: 1,
    description: `Common form use cases from application configuration 
    to payment acceptance.`,
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
      'Required vs. optional fields',
      'Using help text',
      'Capitalization in forms',
      'Button placement and labeling',
      'User-Entered Input',
      'Form submission',
      'Sign In',
      'Sign Up',
      'Change Password',
      'Pay',
      'Settings',
      'Filter',
      'Sort',
      'Shipping',
      'Customize',
      'Required and Optional Fields',
    ],
    relatedContent: [
      'TextInput',
      'Button',
      'MaskedInput',
      'CheckBox',
      'CheckBoxGroup',
      'RadioButtonGroup',
    ],
    tags: ['forms', 'validation', 'messaging', 'form examples'],
  },
  {
    name: 'Dashboards',
    available: true,
    cardOrder: 100,
    description: `At-a-glance preview for operation critical information 
    with easy access to areas requiring attention.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-dashboard.svg',
          dark: '/templateImages/template-preview-dashboard-invert.svg',
        },
        alt: 'HPE Dashboards Preview',
      },
    },
    seoDescription: `HPE Design System dashboard template for screens 
    featuring content within cards.`,
    sections: [],
    relatedContent: ['Card', 'Lists', 'Grid'],
    tags: [],
  },
  {
    name: 'Drill Down Navigation',
    available: true,
    cardOrder: 100,
    description: `Allows users to descend 'down' branches of a hierarchical
     tree into a child screen to drill down into details.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/DrillDown.svg',
          dark: '/templateImages/DrillDown-invert.svg',
        },
        alt: 'HPE Dashboards Preview',
        fit: 'contain',
      },
    },
    seoDescription: `Allows users to descend 'down' branches of a
     hierarchical tree into a child screen to drill down into details.`,
    sections: [],
    relatedContent: [
        'Navigation',
        'Side to Side Navigation',
        'Matrix Navigation',
],
    tags: [],
  },
  {
    name: 'Filtering',
    available: true,
    cardOrder: 3,
    description: `Allows users to create a focused data set by specifying 
    data attributes and values of interest.`,
    preview: {
      image: {
        alt: 'HPE Filtering Preview',
        fit: 'contain',
        src: {
          light: '/templateImages/template-preview-filtering.svg',
          dark: '/templateImages/template-preview-filtering-invert.svg',
        },
      },
    },
    seoDescription: `Allows users to create a focused data set by specifying 
    data attributes and values of interest.`,
    sections: [
      'What makes up filtering',
      'Filters',
      'Filters in a center Layer',
      'Filtering with selectable results',
      'More examples of filtering',
      'Filtering with RangeSelector',
      'Filtering with Select',
    ],
    relatedContent: ['DataTable', 'Lists', 'Card'],
    tags: [
      'filter controls',
      'table filter',
      'list filter',
      'card filter',
      'search table',
      'filters layer',
      'filter guidelines',
      'filtered results',
      'pagination',
      'results',
      'filters',
    ],
  },
  {
    name: 'Global Header',
    available: true,
    cardOrder: 7,
    description: `A standardized header for use when building applications and 
    services that live in the HPE ecosystem.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-persistent.svg',
          dark: '/templateImages/template-preview-persistent-invert.svg',
        },
        alt: 'HPE Design System Global Header',
        fit: 'contain',
      },
    },
    seoDescription: `A standardized header for use when building applications 
    and services that live in the HPE ecosystem.`,
    sections: [
      'What makes up the Global Header',
      'App Identity',
      'Header Main Navigation',
      'Shopping Cart',
      'Country Selector',
      'Cube Menu',
      'Color Scheme',
      'What makes up the Global footer',
      'Privacy Link',
      'Terms of Use Link',
      'Ad Choices and Cookies Link',
      'Do Not Sell My Personal Information Link',
    ],
    relatedContent: ['Page Layouts', 'Header', 'Navigation'],
    tags: [
      'common header',
      'CHFWS',
      'HPE Common Header and Footer Web Service',
      'HFWS test page',
      'global header',
      'global footer',
      'header service',
    ],
  },
  {
    name: 'Internationalization',
    available: true,
    description: `How to internationalize a site or application that uses the 
    HPE Design System.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-i18n.svg',
          dark: '/templateImages/template-preview-i18n-invert.svg',
        },
        alt: 'Internationalization',
        fit: 'contain',
      },
    },
    seoDescription: `How to internationalize a site or application that uses
    the HPE Design System`,
    sections: ['Localizing Grommet'],
    relatedContent: [],
    tags: [
      'localization',
      'internationalization',
      'localisation',
      'internationalisation',
      'localize',
      'localise',
      'I18N',
      'react-intl',
      'react-i18next',
      'messages',
      'global users',
    ],
  },
  {
    name: 'Lists',
    available: true,
    cardOrder: 100,
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
    relatedContent: ['Dashboards', 'Card', 'Page Layouts', 'Pagination'],
    seoDescription:
      'HPE Design System template for providing a list of information.',
    sections: [
      'About Lists',
      'Types of Lists',
      'Selection',
      'Action Menu in List Item',
      'Long Lists',
      'Wrapping vs Truncation:',
      'List vs Table',
      'Icon + Name + Option',
      'Name + Description + Option',
      'Name + Option + Action',
      'Image + Name + Description',
      'Paginated',
      'Item order',
    ],
    tags: [
      'ul',
      'ol',
      'li',
      'styled lists',
      'infinitescroll',
      'infinite scroll',
      'paginated lists',
    ],
  },
  {
    name: 'Matrix Navigation',
    description: `Allows user to move back through previous
    screens chronologically as you would on a browser
    hierarchically within an application or website.`,
    available: true,
    cardOrder: 100,
    preview: {
      pad: { horizontal: 'small' },
      image: {
        src: {
          light: '/templateImages/MatrixNavigation.svg',
          dark: '/templateImages/MatrixNavigation-invert.svg',
        },
        alt: 'HPE Lists Preview',
        fit: 'contain',
      },
    },
    relatedContent: [],
    seoDescription: `Allows user to move back through previous
    screens chronologically as you would on a browser
    hierarchically within an application or website.`,
  },
  {
    name: 'Navigation',
    available: true,
    cardOrder: 4,
    description: 'The entry point for the expansive topic of Navigation.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-navigation.svg',
          dark: '/templateImages/template-preview-navigation-invert.svg',
        },
        alt: 'HPE Navigation Preview',
        fit: 'contain',
      },
    },
    seoDescription: `Navigation pattern guidance and recommendations for a 
      variety of UI use cases.`,
    sections: ['Navigation Within an Application'],
    relatedContent: ['Header'],
    tags: ['navigation patterns'],
  },
  {
    name: 'Page Layouts',
    available: true,
    cardOrder: 2,
    description: `Page layout options, anatomies, and behaviors serving a wide 
    variety of enterprise application, workflow, and marketing contexts.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-pagelayout.svg',
          dark: '/templateImages/template-preview-pagelayout-invert.svg',
        },
        alt: 'HPE Page Layouts Preview',
        fit: 'contain',
      },
    },
    relatedContent: [
      'Navigation',
      'Dashboards',
      'Grid',
      'Lists',
      'Header',
      'Footer',
    ],
    seoDescription:
      'HPE Design System page layout options, anatomies, and behaviors.',
    sections: [
      'About Page Layouts',
      'Responsiveness',
      'Sidebar, header, and footer',
      'Sidebar and header',
      'Header and footer',
      'Sticky header',
      'Header only',
    ],
    tags: [
      'common layouts',
      'responsive',
      'responsive layouts',
      'shells',
      'application layouts',
      'app layouts',
    ],
  },
  {
    name: 'Side to Side Navigation',
    available: true,
    cardOrder: 100,
    description: `Allows users to access sibling screens sequentially from
     the same level of the hierarchy.`,
    preview: {
      pad: { horizontal: 'small' },
      image: {
        src: {
          light: '/templateImages/Side-to-Side.svg',
          dark: '/templateImages/SideToSide-invert.svg',
        },
        alt: 'Side-to-Side Navigation Preview',
        fit: 'contain',
      },
    },
    seoDescription: `Allows users to access sibling screens sequentially from
    the same level of the hierarchy.`,
    relatedContent: [
        'Navigation',
        'Drill Down Navigation',
        'Matrix Navigation',
],
    sections: [],
    tags: [],
  },
  {
    name: 'Status Indicator',
    available: true,
    description: `Quickly provide peace-of-mind or call attention to items 
      requiring a user's action.`,
    preview: {
      component: () => <StatusIndicatorPreview />,
      background: 'background-front',
    },
    seoDescription: `Highlight notification messages and alerts which 
      require a user's attention. Status indicators provide peace-of-mind 
      when all is well or call attention to items when a user needs to take 
      action`,
    relatedContent: ['Notification', 'Toast Notifications', 'Stack'],
    sections: ['What makes up a status indicator', 'Icons and Shapes'],
    tags: [
      'displaying status',
      'display status',
      'status colors',
      'status icons',
      'status WCAG',
    ],
  },
  {
    name: 'DataTable Customization',
    available: true,
    cardOrder: 100,
    description: `Allows users to customize which columns are visible in a data 
    table and in what order they appear.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-table-customize.svg',
          dark: '/templateImages/template-preview-table-customize-invert.svg',
        },
        alt: 'HPE Table Customization Preview',
        fit: 'contain',
      },
    },
    seoDescription: `Allows users to customize table column order and
    visibility to best suit their needs.`,
    sections: [
      'What makes up the customizable table',
      'An action to display column visibility and order controls.',
      'Column visibility',
      'Column order',
    ],
    relatedContent: ['DataTable', 'Lists', 'Filtering'],
    tags: [
      'ordering columns',
      'order columns',
      'reorder',
      're-order',
      'column order',
    ],
  },
  {
    name: 'Toast Notifications',
    available: true,
    description: `Toast notifications are used to communicate low severity 
      level information to users in an unobtrusive way.`,
    preview: {
      component: () => (
        <ToastPreview card title="Hooray" message="Your toast is done!" />
      ),
      background: 'background-back',
    },
    seoDescription: `Toast notifications are used to communicate low 
    severity level information to users in an unobtrusive way.`,
    sections: [
      'When should you use a Toast Notification',
      'Dealing with multiple Toast Notifications',
      'Status Indicator',
      'Content (Title + Message)',
      'Close Button',
      'Placement',
      'Persistence',
    ],
    relatedContent: ['Notification', 'Status Indicator', 'Stack'],
    tags: [
      'feedback',
      'messages',
      'messaging',
      'toast',
      'pop up',
      'popup',
      'status',
      'confirmation',
    ],
  },
  {
    name: 'Wizard',
    available: true,
    cardOrder: 5,
    description: 'Wizards are an effective way to handle multi-step forms.',
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-wizard.svg',
          dark: '/templateImages/template-preview-wizard-invert.svg',
        },
        alt: 'HPE Wizard Preview',
        fit: 'contain',
      },
    },
    seoDescription: 'Wizards are an effective way to handle multi-step forms.',
    sections: [
      'Header and Footer behavior',
      'Providing guidance for a form step',
      'Indicating progress',
      'Validation',
      'Summarizing what was accomplished or configured',
      'Cancellation',
      'Single Column vs Two Column Wizards',
      'Two-column Wizard',
    ],
    relatedContent: ['Forms'],
    tags: [
      'multi-step form',
      'mutliple steps',
      'multistep form',
      'stepped form',
    ],
  },
  {
    name: 'Code Blocks',
    available: true,
    cardOrder: 100,
    description: 'A standardized style for displaying code.',
    preview: {
      component: () => <CodeBlocksPreview />,
      background: 'background-back',
    },
    seoDescription: 'A standardized style for displaying code.',
    sections: ['Guidance', 'Theming', 'Scrolling', 'Line Wrapping'],
    tags: ['code', 'syntax highlighting'],
  },
  {
    name: 'Scrolling and Pagination',
    available: false,
    cardOrder: 100,
    description: `When and how to apply techniques such as scrollable regions 
    and pagination.`,
    seoDescription: `When and how to apply techniques such as scrollable 
    regions or pagination.`,
    sections: [],
    tags: ['scrolling', 'scroll regions', 'pagination', 'scroll vs. paginate'],
  },
];
