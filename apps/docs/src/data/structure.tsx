/* eslint-disable max-len */
import { Cube, Grow } from '@hpe-design/icons-grommet';
import { IconCircle, IconDiamond, IconSquare } from '../components/icons';
import {
  components as componentsArr,
  foundation as foundationArr,
  learn as learnArr,
  tokens as tokensArr,
  templates as templatesArr,
  Structure,
} from './structures';
import { buildCategoryMapping, getCategoryWeights } from './buildCategoryMapping';
import { buildStructureIndexes, type StructurePage } from './structureIndexes';
import { validateStructureData } from './structureValidation';

const components = Structure.from(componentsArr);
const foundation = Structure.from(foundationArr);
const learn = Structure.from(learnArr);
const tokens = Structure.from(tokensArr);
const templates = Structure.from(templatesArr);

// Build the structure in two phases to avoid circular dependency
// Phase 1: Create initial structure (without applying category-based sorts)
const initialStructure = [
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
    color: 'decorative-green',
    description:
      'These are the core elements of HPE that encompass the voice, language, and visuals that personify our brand and help establish and identify it from the rest of the community.',
    icon: (size: string, color: string) => (
      <IconCircle size={size} color={color} aria-hidden="true" />
    ),
    seoDescription:
      'Foundational elements of HPE which encompass the voice, language, and visuals that personify our brand.',
    pages: foundation
      .sortByCardOrder()
      .map(page => page.name),
  },
  {
    name: 'Learn',
    color: 'decorative-blue',
    description:
      'Learn foundational knowledge and best practices for how to build HPE applications with Grommet using these tutorials, how-to guides, and explanations.',
    icon: (_: string, color: string) => <Grow color={color} aria-hidden="true" />,
    preview: {
      image: {
        src: '/creativetoolkitimages/components.svg',
        alt: 'HPE Cards Preview',
        fit: 'contain',
      },
    },
    seoDescription:
      'Learn foundational knowledge and best practices for how to build HPE applications with Grommet using these tutorials, how-to guides, and explanations.',
    pages: learn.map(page => page.name),
  },
  {
    name: 'Templates',
    color: 'decorative-cyan',
    description:
      'Jumpstart application design and development with use-case specific templates. Interactive templates demonstrate desired user experiences and the building block components used to create them.',
    icon: (size: string, color: string) => (
      <IconDiamond size={size} color={color} aria-hidden="true" />
    ),
    preview: {
      image: {
        src: '/creativetoolkitimages/templates.svg',
        alt: 'HPE Cards Preview',
        fit: 'contain',
      },
    },
    seoDescription:
      'HPE Design System starter templates for jumpstarting application screen design and development.',
    pages: templates
      .filter(page => !page.parentPage)
      .sortByName()
      .sortByCardOrder()
      .map(page => page.name),
  },
  {
    name: 'Components',
    color: 'decorative-purple',
    description:
      'The component library provides a vetted set of interface elements for use in your applications and websites. All components are published in Figma for use in your designs. Web versions are built atop Grommet and styled by the HPE Theme providing the "building blocks" your application needs to be performant and compliant.',
    icon: (size: string, color: string) => (
      <IconSquare size={size} color={color} aria-hidden="true" />
    ),
    preview: {
      image: {
        src: '/creativetoolkitimages/components.svg',
        alt: 'HPE Cards Preview',
        fit: 'contain',
      },
    },
    seoDescription:
      'Browse our component library of user interface elements for use in your applications and websites.',
    pages: components
      .filter(page => !page.parentPage)
      .sortByName()
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
  {
    name: 'Design tokens',
    color: 'decorative-purple',
    description:
      'Design tokens represent design decisions such as color, typography, spacing, and motion in a consistent, reusable, and tech-agnostic format.',
    icon: (_: string, color: string) => <Cube color={color} aria-hidden="true" />,
    preview: {
      image: {
        src: '/creativetoolkitimages/components.svg',
        alt: 'HPE Cards Preview',
        fit: 'contain',
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
].flat() as StructurePage[];

export const structure = initialStructure;

export const categoryMapping = buildCategoryMapping(structure);

const foundationPage = structure.find(page => page.name === 'Foundation');
if (foundationPage) {
  foundationPage.pages = foundation
    .sortByCardOrder()
    .sortByCategory(getCategoryWeights(categoryMapping, 'Foundation'))
    .map(page => page.name);
}

export const structureIndexes = buildStructureIndexes(structure, categoryMapping);

const validation = validateStructureData(structure, categoryMapping);
if (validation.errors.length) {
  const summary = validation.errors.join('\n- ');
  const warnOnlyMode =
    process.env.STRICT_STRUCTURE_VALIDATION === 'false' ||
    process.env.STRUCTURE_VALIDATION_WARN_ONLY === 'true';

  if (warnOnlyMode) {
    console.warn(`Structure validation warnings:\n- ${summary}`);
  } else {
    throw new Error(`Structure validation failed:\n- ${summary}`);
  }
}
