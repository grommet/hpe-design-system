import React from 'react';
import { Box, Paragraph } from 'grommet';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const ParagraphExample = () => (
  <Box gap="medium">
    <Paragraph size="xxlarge" margin="none">
      XXlarge - {content}
    </Paragraph>
    <Paragraph size="xlarge" margin="none">
      Xlarge - {content}
    </Paragraph>
    <Paragraph size="large" margin="none">
      Large - {content}
    </Paragraph>
    <Paragraph margin="none">Default - {content}</Paragraph>
    <Paragraph size="small" margin="none">
      Small - {content}
    </Paragraph>
    <Paragraph size="xsmall" margin="none">
      Xsmall - {content}
    </Paragraph>
  </Box>
);
