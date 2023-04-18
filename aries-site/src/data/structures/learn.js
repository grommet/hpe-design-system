/* eslint-disable max-len */
import {
  BoxPreview,
  DataHowTo,
  GridPreview,
} from '../../examples/cardPreviews';

export const learn = [
  {
    name: 'The Box Model Part One',
    render: 'The Box Model: Part One',
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
    name: 'Roadmap',
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
