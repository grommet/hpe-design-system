/* eslint-disable max-len */
import { Figma, Code, Book } from 'grommet-icons';
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
    relatedContent: ['How to read tokens'],
    tags: [],
  },
  {
    name: 'How to read tokens',
    type: 'Getting started',
    description:
      'An explanation of HPE Design System token naming conventions.',
    preview: {
      component: () => (
        <Box align="center" direction="row" gap="small">
          <Box background="brand" pad="medium" round="small" flex={false} />
          <Text size="large">hpe.color.brand</Text>
        </Box>
      ),
    },
    seoDescription:
      'An explanation of HPE Design System token naming conventions.',
    sections: [],
    relatedContent: [],
    tags: [],
  },
  {
    name: 'Using tokens in code',
    type: 'Building with tokens',
    description: 'How to map tokens to code.',
    preview: {
      component: () => <Code size="xxlarge" color="text-strong" />,
    },
    seoDescription: 'How to map tokens to code.',
    sections: [],
    relatedContent: [],
    tags: [],
  },
  {
    name: 'Using tokens in Figma',
    type: 'Building with tokens',
    description: 'How to use tokens with Figma variables.',
    preview: {
      component: () => <Figma size="xxlarge" color="plain" />,
    },
    seoDescription: 'How to use tokens with Figma variables.',
    sections: [],
    relatedContent: [],
    tags: [],
  },
  {
    name: 'All design tokens',
    type: 'Building with tokens',
    description: 'An overview of all available design tokens.',
    preview: {
      component: () => <Figma size="xxlarge" color="plain" />,
    },
    seoDescription: 'An overview of all available design tokens.',
    sections: [],
    relatedContent: [],
    tags: [],
  },
];
