import React from 'react';
import { Box, Card, CardBody, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export function SimpleCard() {
  return <Card width="medium">
    <CardBody>
      <Box direction="row" gap="small">
        <Hpe size="large" color="plain" />
        <Box>
          <Text color="text-strong" size="xxlarge" weight="bold">
            HPE
          </Text>
          <Text color="text-strong">Design System</Text>
        </Box>
      </Box>
    </CardBody>
  </Card>;
}
