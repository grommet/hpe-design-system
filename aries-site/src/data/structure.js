/* eslint-disable max-len */
import { Cube, Grow } from '@hpe-design/icons-grommet';
import { IconCircle, IconDiamond, IconSquare } from '../components';
import {
  components as componentsArr,
  foundation as foundationArr,
  learn as learnArr,
  tokens as tokensArr,
  templates as templatesArr,
  Structure,
} from './structures';

const components = Structure.from(componentsArr);
const foundation = Structure.from(foundationArr);
const learn = Structure.from(learnArr);
const tokens = Structure.from(tokensArr);
const templates = Structure.from(templatesArr);

export const structure = [
  {
    name: 'Home',
    seoDescription:
      "The HPE Design System is the way Hewlett Packard Enterprise's brand, technology, and it's partners share a single language for application, web, and digital experiences.",
    pages: ['Foundation', 'Design tokens', 'Components', 'Templates', 'Learn'],
  },
  {
    name: 'Feedback',
    seoDescription:
      'Something missing or looking for more information? Get in touch to help make the HPE Design System better.',
    pages: [],
  },
  {
    name: 'Show More',
    seoDescription:
      "The HPE Design System is the way Hewlett Packard Enterprise's brand, technology, and its partners share a single language for application, web, and digital experiences.",
    pages: ['Foundation', 'Components', 'Templates', 'Learn'],
  },
  {
    name: 'Foundation',
    color: 'green!',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: (size, color) => (
      <IconCircle size={size} color={color} aria-hidden="true" />
    ),
    seoDescription:
      'Foundational elements of HPE which encompass the voice, language, and visuals that personify our brand.',
    pages: foundation
      .sortByCardOrder()
      .sortByCategory({ Assets: 1, Philosophy: 0 })
      .map(page => page.name),
  },
  {
    name: 'Learn',
    color: 'blue!',
    description:
      'Learn foundational knowledge and best practices for how to build HPE applications with Grommet using these tutorials, how-to guides, and explanations.',
    icon: (_, color) => <Grow color={color} aria-hidden="true" />,
    preview: {
      image: {
        src: {
          light: '/components-light.svg',
          dark: '/components-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'Learn foundational knowledge and best practices for how to build HPE applications with Grommet using these tutorials, how-to guides, and explanations.',
    pages: learn.map(page => page.name),
  },
  {
    name: 'Templates',
    color: 'orange!',
    description:
      'Jumpstart application design and development with use-case specific templates. Interactive templates demonstrate desired user experiences and the building block components used to create them.',
    icon: (size, color) => (
      <IconDiamond size={size} color={color} aria-hidden="true" />
    ),
    preview: {
      image: {
        src: {
          light: '/templates-light.svg',
          dark: '/templates-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'HPE Design System starter templates for jumpstarting application screen design and development.',
    pages: templates
      .sortByName()
      .sortByCardOrder()
      .map(page => page.name),
  },
  {
    name: 'Components',
    color: 'purple!',
    description:
      'The component library provides a vetted set of interface elements for use in your applications and websites. All components are published in Figma for use in your designs. Web versions are built atop Grommet and styled by the HPE Theme providing the "building blocks" your application needs to be performant and compliant.',
    icon: (size, color) => (
      <IconSquare size={size} color={color} aria-hidden="true" />
    ),
    preview: {
      image: {
        src: {
          light: '/components-light.svg',
          dark: '/components-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: components.sortByName().map(page => page.name),
  },
  {
    name: 'Whats New',
    description:
      'Track Design System announcements, new template patterns, guidance, and released components.',
    seoDescription:
      'Track HPE Design System announcements, new template patterns, guidance, and released components.',
    pages: [],
    pageLayout: 'plain',
  },
  {
    name: 'Design tokens',
    color: 'purple',
    description:
      'Design tokens represent design decisions such as color, typography, spacing, and motion in a consistent, reusable, and tech-agnostic format.',
    icon: (_, color) => <Cube color={color} aria-hidden="true" />,
    preview: {
      image: {
        src: {
          light: '/components-light.svg',
          dark: '/components-dark.svg',
        },
        alt: 'HPE Cards Preview',
      },
    },
    seoDescription:
      'Design tokens represent design decisions such as color, typography, spacing, and motion in a consistent, reusable, and tech-agnostic format.',
    pages: tokens.map(page => page.name),
  },
  components,
  foundation,
  learn,
  templates,
  tokens,
].flat();
