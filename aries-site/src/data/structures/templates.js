export const templates = [
  {
    name: 'Lists',
    available: true,
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
    name: 'Navigation',
    available: true,
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
      'Global Sidebar',
      'Hub and Spoke Navigation',
      'Persistent Navigation',
      'React Router',
    ],
  },
  {
    name: 'Hub and Spoke Navigation',
    available: true,
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
    name: 'Persistent Navigation',
    available: true,
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
    relatedContent: [
      'Navigation',
      'Hub and Spoke Navigation',
      'Header',
      'Global Sidebar',
    ],
    sections: [],
  },
  {
    name: 'Page Layouts',
    available: true,
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
      'Global Sidebar',
      'Header',
      'Footer',
    ],
    seoDescription:
      'HPE Design System page layout options, anatomies, and behaviors.',
    sections: [],
  },
  {
    name: 'Cards',
    available: false,
    description: `Flexible props allow the behavior of content to be defined 
    to optimize the user experience.`,
    seoDescription: `Flexible props allow the behavior of content to be defined 
    to optimize the user experience.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-cards.svg',
          dark: '/templateImages/template-preview-cards-invert.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    sections: [],
  },
  {
    name: 'Dashboards',
    available: true,
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
    featuring content within tiles.`,
    sections: [],
    relatedContent: ['Cards', 'Lists', 'Grid'],
  },
  {
    name: 'Forms',
    available: true,
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
    name: 'Tables',
    available: false,
    description: 'Common table use cases.',
    seoDescription: 'HPE Design System table examples and templates.',
    sections: [],
    relatedContent: [],
  },
  {
    name: 'Notifications',
    available: false,
    description: `Notifications are a helpful way to notify a user of changes 
    to application state or to prompt action from a user.`,
    seoDescription: 'HPE Design System notification examples and templates.',
    sections: [],
    relatedContent: [],
  },
  {
    name: 'Data Visualization',
    available: false,
    description: `Data visualizations are an effective way to present 
    quantitative data to a user.`,
    seoDescription:
      'HPE Design System data visualization examples and templates.',
    sections: [],
    relatedContent: [],
  },
];
