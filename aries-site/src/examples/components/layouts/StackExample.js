import React from 'react';
import { Box, Stack, Text } from 'grommet';
import { Cart } from 'grommet-icons';

export const StackExample = () => {
  return (
    <Box align="start">
      <Stack anchor="top-right">
        <Cart size="large" />
        <Box background="orange" pad={{ horizontal: 'xsmall' }} round>
          <Text size="small">4</Text>
        </Box>
      </Stack>
    </Box>
  );
};
