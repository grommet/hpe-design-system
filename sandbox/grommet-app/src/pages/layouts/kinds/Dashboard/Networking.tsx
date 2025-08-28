import React from 'react';
import { Box, Card, CardBody, Heading, Paragraph } from 'grommet';
import { GenAIFill } from 'grommet-icons';

export const Networking = () => (
  <Card onClick={() => {}}>
    <CardBody direction="row" gap="xsmall">
      <Box
        alignSelf="start"
        round="medium"
        pad="xsmall"
        background="background-contrast"
        flex={false}
      >
        <GenAIFill />
      </Box>
      <Box gap="3xsmall">
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
