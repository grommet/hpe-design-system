/* eslint-disable max-len */
import { IconCircle, IconDiamond, IconExtend, IconSquare } from '../components';
import {
  components as componentsArr,
  extend as extendArr,
  foundation as foundationArr,
  templates as templatesArr,
  Structure,
} from './structures';

const components = Structure.from(componentsArr);
const extend = Structure.from(extendArr);
const foundation = Structure.from(foundationArr);
const templates = Structure.from(templatesArr);

export const structure = [
  {
    name: 'Home',
    seoDescription:
      "The HPE Design System is the way Hewlett Packard Enterprise's brand, technology, and it's partners share a single language for application, web, and digital experiences.",
    pages: ['Foundation', 'Components', 'Templates', 'Extend'],
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
    pages: ['Foundation', 'Components', 'Templates', 'Extend'],
  },
  {
    name: 'Foundation',
    color: 'green!',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: (size, color) => <IconCircle size={size} color={color} />,
    seoDescription:
      'Foundational elements of HPE which encompass the voice, language, and visuals that personify our brand.',
    pages: foundation
      .sortByCardOrder()
      .sortByCategory({ Assets: 1, Philosophy: 0 })
      .map(page => page.name),
  },
  {
    name: 'Templates',
    color: 'orange!',
    description:
      'Jumpstart application design and development with use-case specific templates. Interactive templates demonstrate desired user experiences and the building block components used to create them.',
    icon: (size, color) => <IconDiamond size={size} color={color} />,
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
      .sortByAvailability()
      .map(page => page.name),
  },
  {
    name: 'Components',
    color: 'purple!',
    description:
      'The component library provides a vetted set of interface elements for use in your applications and websites. All components are published in Figma for use in your designs. Web versions are built atop [Grommet](https://v2.grommet.io/) and styled by the [HPE Theme](https://github.com/grommet/grommet-theme-hpe) providing the "building blocks" your application needs to be performant and compliant.',
    icon: (size, color) => <IconSquare size={size} color={color} />,
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
    name: 'Extend',
    color: 'text-strong',
    description:
      'Why does HPE have a design system? All the aesthetics, best practices, and information about the platform and how to wield it.',
    icon: (size, color) => <IconExtend size={size} color={color} />,
    seoDescription:
      'All the aesthetics, best practices, and information about the platform and how to wield it.',
    pages: extend
      .sortByName()
      .sortByAvailability()
      .map(page => page.name),
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
  components,
  foundation,
  templates,
  extend,
].flat();
