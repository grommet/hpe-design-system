import React from 'react';
import { Box, Text, Tag } from 'grommet';

export const ResourceTraits: React.FC = () => (
  <Box gap="xsmall">
    <Text size="small">Traits</Text>
    <Box direction="row" gap="3xsmall">
      <Tag onClick={() => {}} value="" name="Other" />
      <Tag onClick={() => {}} value="" name="Gateway is connected" />
    </Box>
  </Box>
);
