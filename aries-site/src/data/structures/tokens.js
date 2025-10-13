/* eslint-disable max-len */
import { Code, Book, Table } from '@hpe-design/icons-grommet';
import { Figma } from 'grommet-icons';
import { Box, Text } from 'grommet';
import { ButtonStates, ContentLayoutPreview } from '../../examples';

export const tokens = [
  {
    name: 'Overview',
    type: 'Getting started',
    description: 'The what and why of design tokens.',
    preview: {
      component: () => <Book size="xxlarge" color="text-strong" />,
    },
    seoDescription: 'The what and why of design tokens.',
    sections: [],
    relatedContent: ['How to read design tokens'],
    tags: [],
  },
  {
    name: 'How to read design tokens',
    type: 'Getting started',
    description:
      'An explanation of HPE Design System design token naming conventions.',
    preview: {
      component: () => (
        <Box align="center" direction="row" gap="xsmall">
          <Box background="brand" pad="medium" round="medium" flex={false} />
          <Text size="large">hpe.color.brand</Text>
        </Box>
      ),
    },
    seoDescription:
      'An explanation of HPE Design System design token naming conventions.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Color usage',
    type: 'Getting started',
    description:
      'Intentional color usage establishes hierarchy and supports consistency thus improving product experience. Learn how to use HPE colors to design balanced interfaces.',
    preview: {
      component: () => (
        <Box direction="row" gap="3xsmall">
          <Box background="icon-primary" pad="medium" round="medium" />
          <Box background="icon-info" pad="medium" round="medium" />
          <Box
            background="dataVis-categorical-40"
            pad="medium"
            round="medium"
          />
        </Box>
      ),
    },
    seoDescription:
      'Intentional color usage establishes hierarchy and supports consistency thus improving product experience. Learn how to use HPE colors to design balanced interfaces.',
    sections: [],
    relatedContent: [
      'Color pairing',
      'Layout and spacing',
      'Global',
      'Element',
      'All design tokens',
    ],
    tags: [],
  },
  {
    name: 'Color pairing',
    type: 'Getting started',
    description:
      'To support color accessibility, there are foreground and background color pairings that ensure accessible color combinations.',
    preview: {
      component: () => (
        <Box
          background="background-neutral-xstrong"
          pad="medium"
          round="medium"
        >
          color.text.onStrong
        </Box>
      ),
    },
    seoDescription:
      'To support color accessibility, there are foreground and background color pairings that ensure accessible color contrast combinations.',
    sections: [],
    relatedContent: [
      'Color usage',
      'Layout and spacing',
      'Global',
      'Element',
      'All design tokens',
    ],
    tags: [],
  },
  {
    name: 'Layout and spacing',
    type: 'Getting started',
    description:
      'Layouts determine the positioning, dimension, and relationship between components on a page.',
    preview: {
      component: () => <ContentLayoutPreview />,
    },
    seoDescription:
      'Layouts determine the positioning of components on a page.',
    sections: [],
    relatedContent: [
      'Typography system',
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Typography system',
    type: 'Getting started',
    description:
      'Typography is an essential part of establishing hierarchy and structure to a page, working in tandem with color and spacing.',
    preview: {
      component: () => <Text size="3xl">Aa</Text>,
    },
    seoDescription:
      'Typography is an essential part of establishing hierarchy and structure to a page, working in tandem with color and spacing.',
    sections: [],
    relatedContent: [
      'Layout and spacing',
      'Global',
      'Element',
      'All design tokens',
    ],
    tags: [],
  },
  {
    name: 'Global',
    type: 'Getting started',
    description: `Global tokens are a set of design tokens that are used across the entire design 
    system and don't change as a result of screen size or color mode.`,
    preview: {
      component: () => <Text size="large">hpe.fontStack.primary</Text>,
    },
    seoDescription: `Global tokens are a set of design tokens that are used across the entire design 
    system and don't change as a result of screen size or color mode.`,
    sections: [],
    relatedContent: [
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Component states',
    type: 'Getting started',
    description:
      'The state of a component communicates feedback based on user interaction, system status, or both.',
    preview: {
      component: () => <ButtonStates size="small" tabIndex={-1} />,
    },
    seoDescription:
      'The state of a component communicates feedback based on user interaction, system status, or both.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Element',
    type: 'Getting started',
    description:
      'Element tokens provide standardized sizing for core UI building blocks to ensure alignment in layouts.',
    preview: {
      component: () => <Text size="large">hpe.element.medium.paddingY</Text>,
    },
    seoDescription:
      'Element tokens provide standardized sizing for core UI building blocks to ensure alignment in layouts.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Using design tokens in code',
    type: 'Building with tokens',
    description: 'How to map design tokens to code.',
    preview: {
      component: () => <Code size="xxlarge" color="text-strong" />,
    },
    seoDescription: 'How to map design tokens to code.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'How to read design tokens',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'Using design tokens in Figma',
    type: 'Building with tokens',
    description: 'How to use design tokens with Figma variables.',
    preview: {
      component: () => <Figma size="xxlarge" color="plain" />,
    },
    seoDescription: 'How to use design tokens with Figma variables.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'How to read design tokens',
      'Using design tokens in code',
    ],
    tags: [],
  },
  {
    name: 'Versioning',
    type: 'Building with tokens',
    description:
      'Learn about how HPE Design Tokens is versioned and what version is right for your team.',
    preview: {
      component: () => <Text size="3xl">^1.0.0</Text>,
    },
    seoDescription:
      'Learn about how HPE Design Tokens is versioned and what version is right for your team.',
    sections: [],
    relatedContent: [
      'All design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
  {
    name: 'All design tokens',
    type: 'Building with tokens',
    description: 'An overview of all available design tokens.',
    preview: {
      component: () => <Table size="xxlarge" />,
    },
    seoDescription: 'An overview of all available design tokens.',
    sections: [],
    relatedContent: [
      'How to read design tokens',
      'Using design tokens in code',
      'Using design tokens in Figma',
    ],
    tags: [],
  },
];
