
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
    sections: [],
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
  },
  {
    name: 'Designer Guidance',
    category: 'Philosophy',
    cardOrder: 2,
    description:
      `Starter files, patterns, interactions, and workflows on
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
    seoDescription:
      `View patterns, interactions, and other best practices for
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
    ],
    relatedContent: ['Background Colors Guidance', 'Typography', 'Icons'],
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
      'Heading',
      'Heading Sizes',
      'Paragraph',
      'Text',
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
    sections: [],
    relatedContent: ['Color', 'Typography', 'Icons'],
  },
];
