import React, { useContext } from 'react';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';

import { formatName } from '../../../utils';
import { ContentPreviewCard } from '../../../components/cards';
import {
  CardDefaults,
  Identifier,
  IdentifierFooter,
  IdentifierImageRow,
  IdentifierIconColumn,
  IdentifierIconRow,
  ImageCard,
  MapCard,
  HelpHeader,
  ColorCard,
} from './cardVariants';

const examples = [
  { name: 'Simple Identifier', preview: <Identifier /> },
  { name: 'Image Identifier', preview: <IdentifierImageRow /> },
  { name: 'Icon Identifier', preview: <IdentifierIconRow /> },
  { name: 'Vertical Identifier', preview: <IdentifierIconColumn /> },
  { name: 'With Footer', preview: <IdentifierFooter /> },
  { name: 'With Color', preview: <ColorCard /> },
  { name: 'Image Card', preview: <ImageCard /> },
  { name: 'Map Card', preview: <MapCard /> },
  { name: 'Key Performance Indicators', preview: <CardDefaults /> },
  { name: 'Helper', preview: <HelpHeader /> },
];

export const CardsPreviewGrid = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      // rows={[['auto', 'full']]}
      gap="medium"
      justify="center"
      // fill
    >
      {examples &&
        examples.map(example => (
          <ContentPreviewCard
            forwardedAs="a"
            style={{ textDecoration: 'none' }}
            href={`#${formatName(example.name)}`}
          >
            <Box height="small" width="100%" round="xsmall">
              {example.preview}
            </Box>
            <Text weight="bold" size="large" margin={{ top: 'small' }}>
              {example.name}
            </Text>
          </ContentPreviewCard>
        ))}
    </Grid>
  );
};
