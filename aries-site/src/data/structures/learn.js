/* eslint-disable max-len */
import { Grommet } from 'grommet-icons';
import {
  BoxPreview,
  DataHowTo,
  GridPreview,
} from '../../examples/cardPreviews';

export const learn = [
  {
    name: 'The Box Model Part One',
    render: 'The Box Model: Part One',
    type: 'Getting started',
    description:
      'Build a hero section to learn about fundamental Box properties.',
    preview: {
      component: () => <BoxPreview />,
      background: 'background-front',
    },
    seoDescription:
      'Build a hero section to learn about fundamental Box properties.',
    sections: [],
    relatedContent: ['Box', 'Button', 'Typography'],
    tags: ['Box', 'layout', 'fundamentals'],
  },
  {
    name: 'Grid Fundamentals Part One',
    render: 'Grid Fundamentals: Part One',
    type: 'Getting started',
    description:
      'Use Grid to display a collection of products, similar to that of an e-commerce website.',
    preview: {
      component: () => <GridPreview />,
      background: 'background-front',
    },
    seoDescription:
      'Use Grid to display a collection of products, similar to that of an e-commerce website.',
    sections: [],
    relatedContent: ['Grid', 'Box'],
    tags: ['grid', 'layout', 'fundamentals'],
  },
  {
    name: 'How to add search and filter to DataTable with Data',
    description:
      'This how-to guide shows you how to use the Data component to easily add searching and filtering to a DataTable.',
    type: 'How-to guides',
    preview: {
      component: () => <DataHowTo />,
      background: 'background-front',
    },
    seoDescription:
      'This how-to guide shows you how to use the Data component to easily add searching and filtering to a DataTable.',
    sections: [],
    relatedContent: [],
    tags: [],
  },
  {
    name: 'Tshirt sizing',
    render: 'T-shirt sizing',
    type: 'Explanations',
    preview: {
      image: {
        src: {
          light: '/foundationImages/foundation-preview-tshirt-sizing.svg',
          dark: '/foundationImages/foundation-preview-tshirt-sizing-invert.svg',
        },
        alt: 'HPE T-shirt Sizing Preview',
      },
    },
    description:
      'Understand the motivations behind behind t-shirt sizing and how it drives consistent experiences.',
    seoDescription:
      'Understand the motivations behind behind t-shirt sizing and how it drives consistent experiences.',
    href: '/foundation/tshirt-sizing',
  },
  {
    name: 'Grommet API Docs',
    type: 'References',
    available: true,
    description:
      'Documentation on availability properties and property types for Grommet components.',
    preview: {
      component: () => <Grommet size="xxlarge" color="plain" />,
    },
    seoDescription:
      'Documentation on availability properties and property types for Grommet components.',
    url: 'https://grommet.io',
  },
  {
    name: 'Roadmap',
    type: 'References',
    available: true,
    description:
      'An interactive roadmap of the HPE Design System that provides insight into current and future milestones.',
    preview: {
      image: {
        src: {
          light: '/extendImages/extend-preview-roadmap.svg',
          dark: '/extendImages/extend-preview-roadmap-invert.svg',
        },
        alt: 'HPE Design System Roadmap',
        fit: 'contain',
      },
    },
    seoDescription:
      'An interactive roadmap of the HPE Design System that provides insight into current and future milestones.',
    sections: [],
    url: 'https://github.com/orgs/grommet/projects/11?fullscreen=true',
  },
];
