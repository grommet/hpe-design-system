import React from 'react';
import { Box, Tag } from 'grommet';

export const TagSimple = () => (
  <Box gap="small">
    {['xsmall', 'small', 'medium', 'large', 'xlarge'].map(size => (
      <Tag
        alignSelf="start"
        name="Location"
        value="San Jose"
        size={size}
        onRemove={() => {}}
      />
    ))}
  </Box>
);
