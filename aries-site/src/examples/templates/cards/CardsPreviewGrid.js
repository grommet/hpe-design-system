import React, { useContext } from 'react';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';

import { formatName } from '../../../utils';
import { ContentPreviewCard } from '../../../components/cards';
import {
  CardDefaults,
  Identifier,
  IdentifierFooter,
  IdentifierImageRow,
  ImageCard,
  HelpHeader,
  ColorCard,
} from './cardVariants';

const examples = [
  {
    label: 'Simple Identifier',
    contentSection: 'Simple Identifier',
    preview: <Identifier />,
  },
  {
    label: 'Identifier with Images and Icons',
    contentSection: 'Image Identifier',
    preview: <IdentifierImageRow />,
  },
  {
    label: 'With Footer',
    contentSection: 'With Footer',
    preview: <IdentifierFooter />,
  },
  { label: 'With Color', contentSection: 'With Color', preview: <ColorCard /> },
  {
    label: 'Rich Visual Content',
    contentSection: 'Image Card',
    preview: <ImageCard />,
  },
  {
    label: 'Key Performance Indicators',
    contentSection: 'Key Performance Indicators',
    preview: <CardDefaults />,
  },
  { label: 'Helper', contentSection: 'Helper', preview: <HelpHeader /> },
];

export const CardsPreviewGrid = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      gap="medium"
      justify="center"
    >
      {examples &&
        examples.map(example => (
          <ContentPreviewCard
            forwardedAs="a"
            style={{ textDecoration: 'none' }}
            href={`#${formatName(example.contentSection)}`}
          >
            <Box height="small" width="100%" round="xsmall">
              {example.preview}
            </Box>
            <Text weight="bold" size="large" margin={{ top: 'small' }}>
              {example.label}
            </Text>
          </ContentPreviewCard>
        ))}
    </Grid>
  );
};
