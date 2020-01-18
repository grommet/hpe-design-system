import React from 'react';
import { Box, Heading, Text } from 'grommet';

export const DisplayExample = () => {
  const textSize = 'small';

  return (
    <Box
      background="background-front"
      gap="medium"
      margin={{ top: 'medium' }}
      pad="large"
    >
      <Box>
        <Text size={textSize}>display-heading-x-large</Text>
        <Heading size="large" margin="none">
          Heading XL
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading-large</Text>
        <Heading margin="none">Heading L</Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-heading</Text>
        <Heading size="small" margin="none">
          Heading
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>display-subheading</Text>
        <Text>Subheading</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-body</Text>
        <Text size="small">Body</Text>
      </Box>
      <Box>
        <Text size={textSize}>display-caption</Text>
        <Text size="xsmall" margin="none">
          Caption
        </Text>
      </Box>
    </Box>
  );
};
