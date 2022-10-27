import { Box } from 'grommet';

export const foundation = [
  {
    name: 'Accessibility',
    category: 'Philosophy',
    cardOrder: 3,
    description: `Accessibility is design that takes into consideration users' visual, hearing, motor, cognitive and other limitations. Accessibility is central to the HPE Design System and we ensure it is incorporated into all facets of our design and functionality, ensuring HPE apps 
    are usable by as many people as possible.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-accessibility.svg',
          dark: '/foundationImages/foundation-preview-accessibility-invert.svg',
        },
        alt: 'HPE Accessibility Preview',
      },
    },
    seoDescription: `Accessibility is central to the HPE Design System and 
    ensures that HPE apps are usable by as many people as possible.`,
    sections: [
      'Accessibility in Design',
      'Accessibility in Development',
      'Designer and Software Developer Guides',
      'Accessibile Product Design Videos',
      'Government Standards and Regulations',
    ],
    tags: [
      'accessibility',
      'disabilities',
      'AAA',
      'AA',
      'accessibility resources',
      'product accessibility',
      'accessible design',
      'accessible products',
      'WCAG',
      'WAVE',
      'Web Accessibility Evaluation Tool',
      'plugins',
      'color contrast',
      'accessibility tools',
      'ANDI',
      'colorblind',
      'testing tools',
    ],
  },
  {
    name: 'Accessibility Transcript File',
    description: 'Transcription for Accessibility at HPE with Bill Tipton',
    searchable: false,
  },
  {
    name: 'Our Brand',
    category: 'Assets',
    cardOrder: 4,
    description: `Logos are critical to any brand. The HPE logo, known as the "Element" is about focus. It creates momentum and 
    energy. It is a building block. It can move, change, expand, and 
    constrain. It works across many touch points.`,
    preview: {
      image: {
        src: '/foundationImages/foundation-preview-brand.svg',
        alt: 'HPE Our Brand Preview',
      },
    },
    seoDescription: `Logos are a powerful expression of the HPE brand and 
    who we are. Learn how to access and apply HPE and Aruba Networks 
    logos in the experiences you create.`,
    sections: ['HPE Logo', 'HPE Element', 'Aruba Logo', 'Aruba Icon'],
    tags: ['logos', 'brand icons'],
  },
  {
    name: 'Distinctive Brand Assets',
    category: 'Assets',
    cardOrder: 5,
    description: `Our distinctive brand assets are comprised of 
    the top elements that are always used, along with several optional 
    components that can be added.`,
    preview: {
      component: () => <Box fill background="datawave-multi-5" />,
    },
    seoDescription: `To be easy to mind and easy to buy as the market leader
    in edge to cloud, we must be consistent and fresh. Our distinctive 
    brand assets are comprised of the top elements that are always used, 
    along with several optional components that can be added. Use "always" 
    assets combined with the "flexible" brand assets to make recipes.`,
    sections: [
      'Always ingredients',
      'HPE GreenLake badge',
      'HPE green',
      'MetricHPE font',
      'Call to action button',
      'Flexible ingredients',
      'Color and texture styles',
      'Typography styles',
      'Photography, film, and more',
    ],
    tags: [
      'logos',
      'element',
      'HPE logo',
      'Aruba logo',
      'new branding',
      'new logo',
      'HPE branding',
      'brand assets',
      'distinctive brand assets',
      'brand',
      'brand ingredients',
      'textures',
      'gradients',
      'typography',
    ],
  },
  {
    name: 'Developer Guidance',
    category: 'Philosophy',
    cardOrder: 1,
    description: `Resources for setting up your application
     with the HPE Design System library and HPE theme.`,
    preview: {
      image: {
        src: '/extendImages/extend-preview-developer-guidance.svg',
        alt: 'HPE Developer Guidance Preview',
      },
    },
    seoDescription: `Resources for HPE developers to set up apps using the HPE Design System library and HPE theme.`,
    sections: [
      'Getting started',
      'Preferred environment',
      'ReactJS and Grommet starter resources',
      'Applying the HPE theme',
      "What if our team doesn't use ReactJS?",
    ],
    relatedContent: ['Components', 'Templates'],
    tags: ['react tutorial', 'grommet', 'getting started with grommet', 'hpe developer tools', 'reactjs', 'hpe developer slack channel', 'components', 'component library'],
  },
  {
    name: 'Designer Guidance',
    category: 'Philosophy',
    cardOrder: 2,
    description: `Starter files, patterns, interactions, and workflows on
       how to succeed using the design resources from HPE Design
        System and the HPE Brand.`,
    preview: {
      image: {
        src: {
          dark: '/extendImages/extend-preview-designer-guidance-invert.svg',
          light: '/extendImages/extend-preview-designer-guidance.svg',
        },
        alt: 'HPE Designer Guidance Preview',
      },
    },
    seoDescription: `HPE designers can gain access to tools, view standard patterns, interactions, and best practices for the best UX experience.`,
    sections: [
      'Getting started',
      'Setting up your Figma account',
      'Joining the HPE Design System Figma team',
      'Before you start designing',
      'HPE Design System Figma Library',
    ],
    relatedContent: ['Components', 'Templates'],
    tags: ['sticker sheet', 'Figma', 'designer tools', 'designer resources', 'ReacJS', 'Grommet', 'HPE designers'],
  },
  {
    name: 'Color',
    cardOrder: 5,
    category: 'Assets',
    description: `Bringing out the depth and dimension of our identity, 
    the HPE Design System use of color evokes energy and inspiration.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-colors.svg',
          dark: '/foundationImages/foundation-preview-colors-invert.svg',
        },
        alt: 'HPE Color Preview',
      },
    },
    seoDescription: `HPE Design System color palette brings out the 
    depth and dimension of our identity. Our saturated colors 
    evoke energy and inspiration. See how to use color in dark mode.`,
    sections: [
      'Color Palettes',
      'Brand Color',
      'Core Palette',
      'Light Palette',
      'Dark Palette',
      'Green Color Accessibility',
      'Background Colors',
      'Background Palette',
      'Border Colors',
      'Border Palette',
      'Contrast',
      'Text Colors',
      'Text Color Palette',
      'Input Colors',
      'Input Palette',
      'Call to Action Text',
      'Status Colors',
      'Focus Color',
      'Elevation',
      'Graph Colors',
      'Light Mode',
      'Dark Mode',
    ],
    relatedContent: ['Background Colors Guidance', 'Typography', 'Icons'],
    tags: [
      'theme mode',
      'color contrast',
      'accessible colors',
      'status colors',
      'chart colors',
      'dark mode',
      'hpe brand colors'
      'hpe color hashtags'
      'hpe hex colors'
      'hpe figma colors'
    ],
  },
  {
    name: 'Human Centered',
    cardOrder: 2,
    category: 'Philosophy',
    description: `"Human centered" is a term used to describe designers' goal of creating products and technology that are easy for people to use. 
    The HPE Design System is committed to human-centered design, generating experiences which are inclusive and vibrant.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-human.svg',
          dark: '/foundationImages/foundation-preview-human-invert.svg',
        },
        alt: 'HPE Human Centered',
      },
    },
    seoDescription: `Unlocking human potential through human-centered 
    design. HPE Design System is inclusive, attentive, adaptable, and 
    conversational.`,
    sections: ['Inclusive', 'Attentive', 'Conversational'],
    tags: ['WCAG', 'human centered design', 'hpe design philosophy', 'hpe design', 'hpe designers', 'design thinking'],
  },
  {
    name: 'Icons',
    cardOrder: 8,
    category: 'Assets',
    description: `Icons are a graphic symbol that represent a person or entity. Icons are an integral part of HPE's visual storytelling style 
    to represent objects, actions, programs, and other communicative symbols.
    This clean, dynamic style remains flexible while retaining the voice of our 
    brand.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-icons.svg',
          dark: '/foundationImages/foundation-preview-icons-invert.svg',
        },
        alt: 'Hpe Icon Preview',
      },
    },
    relatedContent: ['Button', 'Header', 'Menu', 'Search'],
    sections: [
      'Developing with Grommet Icons',
      'Icon within components',
      'Icon Sizes',
      'Button Icons',
      'Icon Plain Color',
      'Core Icons',
      'Resource Actions',
      'UI Actions',
      'UI Controls',
      'Info and Help',
    ],
    tags: ['icon usage', 'icon accessibility', 'icon examples' 'hpe icons', 'hpe grommet icon library', 'icon library', 'hpe logo icon', 'aruba logo icon', 'add icon', 'edit icon', 'trash icon', 'close icon', 'search icon', 'filter icon', 'notification icon', 'download icon', 'collapse icon'],
  },
  {
    name: 'Typography',
    cardOrder: 7,
    category: 'Assets',
    description: `Typography refers to art of designing letters, their spacing, and generally the "look" of text. The HPE font, MetricHPE, is an integral part of our personality 
    and design. When we’re making a statement, our visual language is clear, 
    recognized and understood.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-type.svg',
          dark: '/foundationImages/foundation-preview-type-invert.svg',
        },
        alt: 'HPE Typography Preview',
      },
    },
    seoDescription: `HPE Design System guidance for applying typefaces, 
    font weights, styles, sizing, and more.`,
    sections: [
      'MetricHPE Styles',
      'Semantic usage of Heading levels',
      'Best practices for Heading',
      'Heading Sizes',
      'Paragraph',
      'Text',
      'Fonts for offline usage',
    ],
    tags: [
      'fonts',
      'font files',
      'HPE font',
      'download fonts',
      'woff',
      'otf',
      'font sizes',
      'headings',
      'subheadings',
      'download metricHPE',
      'download hpe font'
    ],
  },
  {
    name: 'Philosophy and Principles',
    category: 'Philosophy',
    cardOrder: 0,
    description: 'What the HPE Design System is and why we’re creating it.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-philosophy.svg',
          dark: '/foundationImages/foundation-preview-philosophy-invert.svg',
        },
        alt: 'HPE Philosophy Preview',
      },
    },
    seoDescription: `Learn about the underlying philosophy guiding the HPE 
    Design System and how generosity and community enable HPE to craft 
    experiences which advance the way people live and work`,
    sections: [
      'Philosophy',
      'Human-centered Design',
      'Common Design Language',
      'Collaboration and Community',
      'Princples',
      'Focus on the experience',
      'Simplify',
      'Be Intuitive',
      'Lead people to success',
    ],
    tags: ['human centered design', 'design principles', 'design philosophy', 'about hpe design system', 'hpe designers', 'design thinking'],
  },
  {
    name: 'Background Colors Guidance',
    category: 'Assets',
    cardOrder: 6,
    description: `Leverage HPE background colors to seamlessly style 
    your layout.`,
    preview: {
      image: {
        src: {
          light: '/templateImages/template-preview-persistent.svg',
          dark: '/templateImages/template-preview-persistent-invert.svg',
        },
        alt: 'HPE Background Colors Preview',
      },
    },
    seoDescription: `Learn about how to leverage HPE background colors to 
    seamlessly style your layout.`,
    sections: [
      'Basic or Layered approach',
      'Basic layout with Cards',
      'Basic layout with supporting content',
      'Examples of Layered Layout',
      'With fixed header',
      'Header scrolls with content',
    ],
    relatedContent: ['Color', 'Typography', 'Icons'],
    tags: [
      'background colors',
      'background',
      'background front',
      'background contrast',
      'background back',
      'background-front',
      'background-contrast',
      'background-back',
      'help text style',
      'informational dialogs',
      'tips section',
      'color contrast'
      'hpe page color'
    ],
  },
  {
    name: 'Tshirt Sizing',
    render: 'T-shirt Sizing',
    category: 'Philosophy',
    cardOrder: 4,
    description:
      'The HPE Design System uses a set of standard sizes that Grommet calls "t-shirt sizing" to create consistent, composable interfaces.',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-tshirt-sizing.svg',
          dark: '/foundationImages/foundation-preview-tshirt-sizing-invert.svg',
        },
        alt: 'HPE T-shirt Sizing Preview',
      },
    },
    seoDescription:
      'Create consistent, scalable interfaces with standard sizes that the Grommet tool calls "t-shirt sizing."',
    sections: [
      'What is t-shirt sizing',
      'Why do we use t-shirt sizing',
      'The base unit',
      'T-shirt sizing for component dimensions',
      'T-shirt sizing for spacing and other styles',
      'Composability and scaling between t-shirt sizes',
    ],
    relatedContent: ['Box', 'Typography', 'Grid', 'DataTable'],
    tags: [
      'sizing',
      't-shirt sizes',
      'box sizes',
      'layout sizes',
      'box sizing',
      'layout sizing',
      'grid sizes',
      'grid sizing',
      'spacing',
      'base spacing',
      'base unit',
      'border size',
      'height',
      'width',
      'dimensions',
      'HPE layout sizes'
      'button sizes'
      'layer sizes'
      'hpe margin sizes'
      'border sizes'
      'default sizing'
      'responsive sizing'
    ],
  },
  {
    name: 'Voice and Tone',
    category: 'Philosophy',
    cardOrder: 6,
    description: `Voice and tone refers to the crafting of words to transmit particular impressions and evoke feelings. 
    Even short button labels influence the HPE voice and tone that we transmit to our users. Deliver clear, consistent experiences to HPE customers by 
    following these guidelines for text-based user interface 
    elements.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-voice-and-tone.svg',
          // eslint-disable-next-line max-len
          dark: '/foundationImages/foundation-preview-voice-and-tone-invert.svg',
        },
        alt: 'HPE Voice and Tone Preview with two speech bubbles',
      },
    },
    seoDescription: `Deliver clear, consistent experiences to HPE customers by 
    following guidelines for the voice and tone of text-based user interface 
    elements.`,
    sections: [
      'Messaging Voice, Tone, and Content',
      'Voice',
      'Tone',
      'Point of View',
      'Guidelines for Constructing Good Messaging',
      'Capitalization',
      'Acronyms & Initialisms',
      'Branding',
      'Maintainability',
      'Language Dos and Donts',
      'Case Study',
      'Quoting',
      'Referring to support',
      'Localization',
      'User Input',
      'Other Common Problems and How To Address Them',
      'Conversational American English',
      'British English',
      'Indian English',
    ],
    relatedContent: [
      'Accessibility',
      'Designer Guidance',
      'Developer Guidance',
    ],
    tags: [
      'message',
      'voice',
      'tone',
      'sentence case',
      'title case',
      'casing',
      'capitalization',
      'button labels'
      'short form ux copy'
      'ux copy'
      'hpe grammar rules'
      'hpe writing style guide'
      'best verbiage'
      'hpe phrases'
      'hpe app labels'
      'how to write'
    ],
  },
];
