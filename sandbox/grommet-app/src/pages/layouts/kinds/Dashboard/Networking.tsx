import React from 'react';
import { Box, Card, CardBody, Heading, Paragraph } from 'grommet';
import { AIGenFill } from '@hpe-design/icons-grommet';

export const Networking = () => (
  <Card onClick={() => {}}>
    <CardBody direction="row" gap="small">
      <Box
        alignSelf="start"
        round="small"
        pad="small"
        background="background-contrast"
        flex={false}
      >
        <AIGenFill />
      </Box>
      <Box gap="xsmall">
        <Heading level={2} size="small" margin="none">
          Networking
        </Heading>
        <Paragraph size="small" margin="none">
          4 access points need updating, site QoS for Denver office is degraded,
          latency on Artemis gateway...
        </Paragraph>
      </Box>
    </CardBody>
  </Card>
);
