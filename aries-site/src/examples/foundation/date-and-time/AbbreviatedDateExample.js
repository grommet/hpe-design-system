import React from 'react';
import { Box, Text } from 'grommet';

const date = new Date(Date.UTC(2021, 10, 30, 10, 0, 0, 0));

export const AbbreviatedDateExample = () => {
  return (
    <Box gap="medium">
      <Text>
        {Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }).format(date)}
      </Text>
      <Text>
        {Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        }).format(date)}
      </Text>
    </Box>
  );
};
