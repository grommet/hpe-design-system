import React from 'react';
import { Box, CardBody, Card, Heading, Text } from 'grommet';
import { StatusGood } from 'grommet-icons';

export const GreenLakeStatus = () => (
  <Card background="background-ok" onClick={() => {}}>
    <CardBody direction="row" gap="medium" justify="between" align="center">
      <Box gap="xsmall">
        <Heading level={2} margin="none" size="small">
          HPE GreenLake status
        </Heading>
        <Box direction="row" gap="xsmall" align="center">
          <StatusGood color="icon-ok" size="large" />
          <Text size="xlarge" weight={500} color="text-strong">
            Operational
          </Text>
        </Box>
        <Text size="xsmall">All services are operational</Text>
      </Box>
    </CardBody>
  </Card>
);
