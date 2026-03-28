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
    </Box>
  );
