import React from 'react';
import { Box, Text } from 'grommet';

export const BoxExample = () => (
    <Box direction="row-responsive" gap="medium" align="center">
      <Box
        align="center"
        border={{ color: 'green', size: 'medium' }}
        pad="large"
        round="small"
        width="medium"
      >
        <Text>Boxes are containers that drive the layout of your content.</Text>
      </Box>
      <Box
        align="center"
        justify="center"
        border={{ color: 'green', size: 'medium' }}
        pad="large"
        round="small"
        width="medium"
        height="medium"
      >
        <Text>Boxes can be various sizes.</Text>
      </Box>
    </Box>
  );
