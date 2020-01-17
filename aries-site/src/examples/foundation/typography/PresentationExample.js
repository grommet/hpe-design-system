import React from 'react';
import { Box, Heading, Text } from 'grommet';

export const PresentationExample = () => {
  const textSize = 'small';

  return (
    <Box
      background="background-front"
      gap="medium"
      pad="large"
      margin={{ top: 'medium' }}
    >
      <Box>
        <Text size={textSize}>display-heading-x-large</Text>
        <Heading size="xlarge" margin="none">
          Heading XL
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-heading-large</Text>
        <Heading size="large" margin="none">
          Heading L
        </Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-heading</Text>
        <Heading margin="none">Heading</Heading>
      </Box>
      <Box>
        <Text size={textSize}>prez-subheading</Text>
        <Text size="xxlarge">Subheading</Text>
      </Box>
      <Box>
        <Text size={textSize}>prez-body</Text>
        <Text>Body</Text>
      </Box>
      <Box>
        <Text size={textSize}>prez-caption</Text>
        <Text size="small">Caption</Text>
      </Box>
    </Box>
  );
};
