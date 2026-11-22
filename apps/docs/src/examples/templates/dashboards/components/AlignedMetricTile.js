// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Card, CardBody, Heading, Text } from 'grommet';

// Variant of MetricTile that anchors the description to the bottom edge so
// the last line of every tile in a row lines up. The content Box grows to
// fill the Card and the description pushes itself down with an auto margin.
// Trade-off: when tiles differ in height, shorter tiles carry an empty band
// between their content and description; pass anchor={false} to let the
// description follow the content at the tile's normal gap instead. An
// optional statusIcon sits at the end of the title row so status is seen
// before the value, and an optional action sits under the description as the
// tile's single call to action.
export const AlignedMetricTile = ({
  action,
  anchor = true,
  children,
  description,
  level = 3,
  statusIcon,
  title,
  ...rest
}) => {
  const bottom = anchor ? { margin: { top: 'auto' } } : undefined;
  return (
    <Card {...rest}>
      <CardBody gap="small">
        <Box direction="row" align="center" justify="between" gap="small">
          <Heading level={level} margin="none">
            {title}
          </Heading>
          {statusIcon}
        </Box>
        <Box gap="xsmall" flex>
          {children}
          {action ? (
            <Box {...bottom} gap="small" align="start">
              {description && <Text>{description}</Text>}
              {action}
            </Box>
          ) : (
            description && <Text {...bottom}>{description}</Text>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

AlignedMetricTile.propTypes = {
  action: PropTypes.node,
  anchor: PropTypes.bool,
  children: PropTypes.node,
  description: PropTypes.node,
  level: PropTypes.number,
  statusIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
};
