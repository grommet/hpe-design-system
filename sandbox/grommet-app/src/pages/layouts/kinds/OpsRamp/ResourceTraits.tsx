import React from 'react';
import { Box, Text, Tag } from 'grommet';

export const ResourceTraits = () => (
  <>
    <Box pad={{ vertical: 'small' }}>
      <Text>Traits</Text>
    </Box>
    <Box direction="row" gap="small">
      <Tag value="" name="Other" />
      <Tag value="" name="Gateway is connected to this device" />
    </Box>
  </>
);
