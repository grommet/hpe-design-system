// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Card, CardBody, Heading, Text } from 'grommet';

// A titled metric with its value, an optional visualization, and a short
// description. Intended to sit alongside peers in a MetricGroup. Not
// interactive, so the Card gets no onClick and therefore no hover feedback.
export const MetricTile = ({
  children,
  description,
  level = 3,
  title,
  ...rest
}) => (
  <Card {...rest}>
    <CardBody gap="small">
      <Heading level={level} margin="none">
        {title}
      </Heading>
      <Box gap="xxsmall">
        {children}
        {description && <Text>{description}</Text>}
      </Box>
    </CardBody>
  </Card>
);

MetricTile.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  level: PropTypes.number,
  title: PropTypes.string.isRequired,
};
