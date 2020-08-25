import React from 'react';
import { Box, Card, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const SimpleCard = () => (
  <Card background="background-front" pad="medium" width="medium">
    <Box direction="row" gap="small">
      <Hpe size="large" color="plain" />
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          HPE
        </Text>
        <Text color="text-strong">Design System</Text>
      </Box>
    </Box>
  </Card>
);
