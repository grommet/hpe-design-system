import React from 'react';
import { Box, CardBody, Card, Heading, Text } from 'grommet';
import { StatusWarning } from 'grommet-icons';

export const Monitoring = () => (
  <Card background="background-warning">
    <CardBody direction="row" gap="medium" justify="between" align="center">
      <Box gap="xsmall">
        <Heading level={2} margin="none">
          Monitoring
        </Heading>
        <Text size="xlarge" weight={500} color="text-strong">
          68 incidents
        </Text>
        <Text color="text-weak" size="xsmall">
          4% increase in cases over the week
        </Text>
      </Box>
      <StatusWarning color="icon-warning" size="xxlarge" />
    </CardBody>
  </Card>
);
