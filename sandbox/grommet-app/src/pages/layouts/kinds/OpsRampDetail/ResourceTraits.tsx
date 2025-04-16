import React from 'react';
import { Box, Text, Tag } from 'grommet';

export const ResourceTraits: React.FC = () => (
  <Box gap="small">
    <Text size="small">Traits</Text>
    <Box direction="row" gap="xsmall">
      <Tag onClick={() => {}} value="" name="Other" />
      <Tag onClick={() => {}} value="" name="Gateway is connected" />
    </Box>
  </Box>
);
