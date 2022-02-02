import { Sort } from 'grommet-icons';

export const foundation = [
  {
    name: 'Accessibility',
    category: 'Philosophy',
    cardOrder: 3,
    description: `Central to the HPE Design System, accessibility is 
    incorporated into all Design System facets, ensuring HPE applications 
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
    ensures that HPE applications are usable by as many people as possible.`,
    sections: [
      'Accessibility in Design', 
      'Accessibility in Development',
      'Designer and Software Developer Guides',
      'Accessibile Product Design Videos',
      'Government Standards and Regulations',
    ],
    tags: [
      'accessibility',
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
    relatedContent: ['WCAG Checklist'],
  },
  {
    name: 'WCAG Checklist',
    category: 'Philosophy',
    cardOrder: 3,
    description: `A checklist for ensuring a product's accessibility is up
    to WCAG 2.1 standards.`,
    preview: {
      component: () => <Sort size='xlarge' color='text-strong' />,
    },
    seoDescription: `A checklist for ensuring a product's accessibility is up
    to WCAG 2.1 standards.`,
    tags: [
      'accessibility',
      'accessibility resources',
      'WCAG',
    ],
    relatedContent: ['Accessibility'],
  },
  {
    name: 'Our Brand',
    category: 'Assets',
    cardOrder: 4,
    description: `The Element is about focus. It creates momentum and 
    energy. It is a building block. It can move, change, expand, and 
    constrain. It works across many touch points.`,
    preview: {
      image: {
        src: '/foundationImages/foundation-preview-brand.svg',
        alt: 'HPE Our Brand Preview',
      },
    },
    seoDescription: `Logos are a powerful expression of our brand and 
    who we are. Learn how to access and apply HPE and Aruba Networks 
    logos in the experiences you create.`,
    sections: ['HPE Logo', 'HPE Element', 'Aruba Logo', 'Aruba Icon'],
    tags: ['logos', 'brand icons'],
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
    seoDescription: `Resources for setting up your application with
     the HPE Design System library and HPE theme.`,
    sections: [
      'Getting started',
      'Preferred environment',
      'ReactJS and Grommet starter resources',
      'Applying the HPE theme',
      "What if our team doesn't use ReactJS?",
    ],
    relatedContent: ['Components', 'Templates'],
    tags: ['react tutorial', 'grommet', 'getting started with grommet'],
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
    seoDescription: `View patterns, interactions, and other best practices for
       how to succeed using resources included with the HPE
       Design System.`,
    sections: [
      'Getting started',
      'Setting up your Figma account',
      'Joining the HPE Design System Figma team',
      'Before you start desiging',
      'HPE Design System Figma Library',
    ],
    relatedContent: ['Components', 'Templates'],
    tags: ['sticker sheet', 'Figma'],
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
    depth and dimension of our identity. From sophisticated, neutral 
    hues reflective of technology to vibrant, saturated colors that 
    evoke energy and inspiration.`,
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
    ],
  },
  {
    name: 'Human Centered',
    cardOrder: 2,
    category: 'Philosophy',
    description: `The starting point of the design system is human 
    centered, generating experiences which are inclusive and vibrant.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-human.svg',
          dark: '/foundationImages/foundation-preview-human-invert.svg',
        },
        alt: 'HPE Human Centered',
      },
    },
    seoDescription: `Unlocking human potential through human centered 
    design. HPE Design System is inclusive, attentive, adaptable, and 
    conversational.`,
    sections: ['Inclusive', 'Attentive', 'Conversational'],
    tags: ['WCAG', 'human centered design'],
  },
  {
    name: 'Icons',
    cardOrder: 8,
    category: 'Assets',
    description: `Icons are an integral part of our visual storytelling style 
    to represent objects, actions, programs and other communicative symbols. 
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
    ],
    tags: ['icon usage', 'icon accessibility', 'icon examples'],
  },
  {
    name: 'Typography',
    cardOrder: 7,
    category: 'Assets',
    description: `The MetricHPE font is an integral part of our personality 
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
    tags: ['human centered design', 'design principles', 'design philosophy'],
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
    ],
  },
  {
    name: 'Tshirt Sizing',
    render: 'T-shirt Sizing',
    category: 'Philosophy',
    cardOrder: 4,
    description:
      'Create consistent, composable interfaces with t-shirt sizing.',
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
      'Create consistent, scalable interfaces with t-shirt sizing.',
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
    ],
  },
  {
    name: 'Voice and Tone',
    category: 'Philosophy',
    cardOrder: 6,
    description: `Deliver clear, consistent experiences to HPE customers by 
    following guidelines for the voice and tone of text-based user interface 
    elements.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-voice-and-tone.svg',
          dark:
            '/foundationImages/foundation-preview-voice-and-tone-invert.svg',
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
      'casing',
      'capitilization',
    ],
  },
];
