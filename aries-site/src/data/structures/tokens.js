/* eslint-disable max-len */
import { Figma, Code, Book, Table } from 'grommet-icons';
import { Box, Text } from 'grommet';

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
        <Box align="center" direction="row" gap="small">
          <Box background="brand" pad="medium" round="small" flex={false} />
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
