import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardFooter, Text } from 'grommet';
import { Alert, Location } from 'grommet-icons';

export const CardWithFooter = () => (
  <Card width="medium">
    <Identifier
      icon={<Location size="large" color="text-strong" />}
      title="Title"
      subtitle="Subtitle"
    />
    <CardFooter
      pad={{ horizontal: 'medium', vertical: 'small' }}
      align="center"
      justify="start"
    >
      <Alert />
      <Text weight="bold">This is a footer</Text>
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
