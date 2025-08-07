import React from 'react';
import { Box, CardBody, Card, Heading, Text } from 'grommet';
import { StatusWarning } from 'grommet-icons';

export const Costs = () => (
  <Card>
    <CardBody direction="row" gap="medium" justify="between" align="center">
      <Box gap="xsmall">
        <Heading level={2} margin="none">
          Costs
        </Heading>
        <Text size="xlarge" weight={500} color="text-strong">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(2960.88)}
        </Text>
        <Text color="text-weak" size="xsmall">
          Month-to-date costs
        </Text>
      </Box>
      <StatusWarning color="icon-warning" size="xxlarge" />
    </CardBody>
  </Card>
);
