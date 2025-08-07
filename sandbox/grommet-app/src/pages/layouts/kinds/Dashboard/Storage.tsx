import React from 'react';
import { Box, Card, CardBody, Heading, Paragraph } from 'grommet';
import { GenAIFill } from 'grommet-icons';

export const Storage = () => (
  <Card>
    <CardBody direction="row" gap="small">
      <Box
        alignSelf="start"
        round="small"
        pad="small"
        background="background-contrast"
        flex={false}
      >
        <GenAIFill />
      </Box>
      <Box gap="xsmall">
        <Heading level={2} margin="none">
          Storage
        </Heading>
        <Paragraph size="small" margin="none">
          4 access points need updating, site QoS for Denver office is degraded,
          latency on Artemis gateway...
        </Paragraph>
      </Box>
    </CardBody>
  </Card>
);
