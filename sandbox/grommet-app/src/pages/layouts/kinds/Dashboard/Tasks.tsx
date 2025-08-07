import React from 'react';
import { Box, CardBody, Card, Heading, Text } from 'grommet';
import { LinkNext, StatusWarning } from 'grommet-icons';

export const Tasks = () => (
  <Card background="transparent" border={{ side: 'all', color: 'border-weak' }}>
    <CardBody direction="row" gap="medium" justify="between" align="center">
      <Box gap="xsmall">
        <Heading level={2} margin="none">
          Tasks (1 of 3)
        </Heading>
        <Text size="xlarge" weight={500} color="text-strong">
          Onboard Device
        </Text>
        <Text color="text-weak" size="xsmall">
          HPE ProLiant DL384 to “Workspace X”
        </Text>
      </Box>
      <LinkNext color="icon-primary" />
    </CardBody>
  </Card>
);
