import { IconHumanCentered, IconIcons } from '../../components';

const statuses = {
  complete: 'Complete',
  inProgress: 'In Progress',
};

export const foundation = [
  {
    name: 'Accessibility',
    category: 'Philosophy',
    cardOrder: 2,
    description: `Accessibility will be an important part of guidance 
    in using our components.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-accessibility.svg',
          dark: '/foundationImages/foundation-preview-accessibility-invert.svg',
        },
        alt: 'HPE Accessibility Preview',
      },
    },
    seoDescription: `Accessibility will be an important part of guidance 
    in using our components.`,
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
    ],
  },
  {
    name: 'Human Centered',
    cardOrder: 1,
    category: 'Philosophy',
    description: `The starting point of the design system is human 
    centered, generating experiences which are inclusive and vibrant.`,
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
    seoDescription: `Unlocking human potential through human centered 
    design. HPE Design System is inclusive, attentive, adaptable, and 
    conversational.`,
    sections: ['Inclusive', 'Attentive', 'Conversational'],
  },
  {
    name: 'Icons',
    cardOrder: 7,
    category: 'Assets',
    description: `Icons are an integral part of our visual storytelling style 
    to represent objects, actions, programs and other communicative symbols. 
    This clean, dynamic style remains flexible while retaining the voice of our 
    brand.`,
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
    relatedContent: ['Button', 'Header', 'Menu', 'Search', 'Global Sidebar'],
    status: {
      figma: statuses.inProgress,
      grommet: statuses.inProgress,
    },
  },
  {
    name: 'Typography',
    cardOrder: 6,
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
    name: 'Philosophy',
    category: 'Philosophy',
    cardOrder: 0,
    description: `The HPE Design System is focused on key values which 
    engender and support human engagement and community.`,
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
    sections: ['Relational', 'Generous', 'Community'],
  },
  {
    name: 'Principles',
    category: 'Philosophy',
    cardOrder: 3,
    description: `A clear criteria of creativity, innovation, and craftsmanship 
    which accelerate the way people live and work.`,
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-principles.svg',
          dark: '/foundationImages/foundation-preview-principles-invert.svg',
        },
        alt: 'HPE Principles Preview',
      },
    },
    seoDescription: `HPE Design System principles provide clear criteria for 
    creating experiences our clients and partners deserve.`,
    sections: [
      'Innovative and Adventurous',
      'Purposeful and Useful',
      'Integrated but Composable',
    ],
  },
];
