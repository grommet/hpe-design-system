import React from 'react';
import { Box, Text } from 'grommet';

export const SimpleToken = () => (
  <Box direction="row-responsive" gap="small">
    <Box gap="xsmall">
      <Text>1. Token name</Text>
      <Box border round="small" pad="medium" width="small">
        <Text size="xlarge">color.brand</Text>
      </Box>
    </Box>
    <Box gap="xsmall">
      <Text>2. Value</Text>
      <Box background="brand" round="small" pad="medium" width="small">
        <Text size="xlarge">#01A982</Text>
      </Box>
    </Box>
  </Box>
);
