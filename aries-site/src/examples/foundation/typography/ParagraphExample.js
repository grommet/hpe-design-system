import React from 'react';
import { Box, Paragraph } from 'grommet';

export const ParagraphExample = () => (
  <Box direction="column" gap="medium">
    <Paragraph size="xxlarge" margin="none">
      Paragraph xxlarge
    </Paragraph>
    <Paragraph size="xlarge" margin="none">
      Paragraph xlarge
    </Paragraph>
    <Paragraph size="large" margin="none">
      Paragraph large
    </Paragraph>
    <Paragraph margin="none">Paragraph default</Paragraph>
    <Paragraph size="small" margin="none">
      Paragraph small
    </Paragraph>
    <Paragraph margin="none" color="text-strong">
      Paragraph color
    </Paragraph>
    <Paragraph margin="none" color="black">
      Paragraph color, non-design token
    </Paragraph>
    <Paragraph margin="none" size="small">
      Paragraph size
    </Paragraph>
    <Paragraph margin="none" weight="bolder">
      Paragraph weight
    </Paragraph>
    <Paragraph margin="none" style={{ fontFamily: 'serif' }}>
      Paragraph style prop
    </Paragraph>
  </Box>
);
