import React from 'react';
import { Box, Card, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const SimpleCard = () => (
  <Card pad="medium" width="medium">
    <Box direction="row" gap="small">
      <Hpe size="large" color="plain" />
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          HPE
        </Text>
        <Text color="text-strong">Application Name</Text>
      </Box>
    </Box>
  </Card>
);
