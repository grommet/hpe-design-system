import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardFooter, Text } from 'grommet';
import { Alert, Server } from 'grommet-icons';

export const CardWithFooter = () => (
  <Card width="medium">
    <Identifier
      icon={<Server size="large" color="text-strong" />}
      title="OmniStackVC-10"
      subtitle="LA_cluster_1"
    />
    <CardFooter align="center" justify="start">
      <Alert />
      <Text weight="bold">Expired</Text>
    </CardFooter>
  </Card>
);

const Identifier = ({ title, subtitle, icon }) => (
  <Box
    direction="row"
    gap="small"
    align="center"
    pad={{ horizontal: 'small', vertical: 'medium' }}
  >
    <Box pad={{ vertical: 'xsmall' }}>{icon}</Box>
    <Box>
      <Text color="text-strong" size="xxlarge" weight="bold">
        {title}
      </Text>
      <Text>{subtitle}</Text>
    </Box>
  </Box>
);

Identifier.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  icon: PropTypes.node,
};
