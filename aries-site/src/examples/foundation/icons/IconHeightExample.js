import React from 'react';
import { Box, Paragraph } from 'grommet';
import { Add } from 'grommet-icons';

export const IconHeightExample = () => (
  <Box gap="medium">
    <Box direction="row" gap="xsmall" align="start">
      <Add height="medium" />
      <Paragraph margin="none">
        Here is a paragraph alongside an icon. The parent Box has
        direction="row" and align="start" applied. Adding height="medium" to the
        icon is necessary to ensure it aligns with the first line of text.
      </Paragraph>
    </Box>
    <Box direction="row" gap="xsmall" align="start">
      <Add />
      <Paragraph margin="none">
        Here is another paragraph. In this case, the icon does not have
        height="medium" applied. Notice how the icon does not vertically align
        with the first line of text.
      </Paragraph>
    </Box>
  </Box>
);
