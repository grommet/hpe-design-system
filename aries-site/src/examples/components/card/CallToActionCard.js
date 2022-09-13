import React from 'react';
import { Box, Button, Card, CardBody, Heading, Paragraph, Text } from 'grommet';

export const CallToActionCard = () => (
  <Box>
    <Card>
      <CardBody align="start" gap="medium">
        <Box>
          <Text size="small">Las Vegas, June 28-30, 2022</Text>
          <Heading level={3} margin="none">
            HPE Discover '22
          </Heading>
          <Paragraph margin="none">
            The edge-to-cloud confrence is the best place to stay ahead of the
            trends.
          </Paragraph>
        </Box>
        <Button primary label="Register for Discover '22" />
      </CardBody>
    </Card>
  </Box>
);
