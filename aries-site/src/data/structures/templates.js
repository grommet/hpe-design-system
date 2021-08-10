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
    relatedContent: [
      'TextInput',
      'Button',
      'MaskedInput',
      'CheckBox',
      'CheckBoxGroup',
      'RadioButtonGroup',
    ],
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
  },
  {
    name: 'Filtering',
    available: true,
    cardOrder: 3,
    description: `Allows users to create a focused data set by specifying 
    data attributes and values of interest.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-filtering.svg',
          dark: '/templateImages/template-preview-filtering-invert.svg',
        },
        alt: 'HPE Filtering Preview',
        fit: 'contain',
      },
    },
    seoDescription: `Allows users to create a focused data set by specifying 
    data attributes and values of interest.`,
    sections: [],
    relatedContent: ['Table', 'Lists', 'Card'],
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
    sections: [],
    relatedContent: ['Page Layouts', 'Header', 'Navigation'],
  },
  {
    name: 'Hub and Spoke Navigation',
    available: true,
    cardOrder: 100,
    description: `A navigation pattern promoting focused execution through 
    a central "hub" from which all activities begin and "spokes" on which 
    more focused tasks are accomplished.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-hubnspoke.svg',
          dark: '/templateImages/template-preview-hubnspoke-invert.svg',
        },
        alt: 'HPE Hub and Spoke Navigation Preview',
      },
    },
    seoDescription: `Hub and spoke navigation pattern. What, why, and when 
    to use the Hub & Spoke pattern for navigation.`,
    relatedContent: [
      'Navigation',
      'Persistent Navigation',
      'Header',
      'Grid',
      'Lists',
    ],
    sections: [],
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
    sections: [],
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
    sections: [],
    relatedContent: [
      'Header',
      'Hub and Spoke Navigation',
      'Persistent Navigation',
    ],
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
    sections: [],
  },
  {
    name: 'Persistent Navigation',
    available: true,
    cardOrder: 100,
    description: `Navigation choices which persist throughout the application
    structure, presenting consistent, easy to click-through choices.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-persistent.svg',
          dark: '/templateImages/template-preview-persistent-invert.svg',
        },
        alt: 'HPE Peristent Navigation Preview',
      },
    },
    seoDescription: `Persistent navigation pattern. What, why, and when to use 
    persistent navigation.`,
    relatedContent: ['Navigation', 'Hub and Spoke Navigation', 'Header'],
    sections: [],
  },
  {
    name: 'Table Customization',
    available: true,
    cardOrder: 100,
    description: `Allows users to customize which columns are visible in a table
    and in what order they appear.`,
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
    sections: [],
    relatedContent: ['Table', 'Lists', 'Filtering'],
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
    sections: [],
    relatedContent: [],
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
    sections: [],
    relatedContent: ['Forms'],
  },
];
