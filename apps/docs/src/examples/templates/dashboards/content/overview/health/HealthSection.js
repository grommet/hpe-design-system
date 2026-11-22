// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { AlignedMetricTile, MetricGroup } from '../../../components';
import { surfaceBackground } from '../data';

// Section chrome shared by every health overview variant. An optional
// summary sits at the end of the heading row for a row-level verdict.
export const HealthSection = ({ children, summary, ...rest }) => {
  const heading = (
    <Heading level={2} margin="none">
      Health overview
    </Heading>
  );
  return (
    <Box as="section" gap="small" {...rest}>
      {summary ? (
        <Box direction="row" align="center" justify="between" gap="small" wrap>
          {heading}
          {summary}
        </Box>
      ) : (
        heading
      )}
      <MetricGroup>{children}</MetricGroup>
    </Box>
  );
};

HealthSection.propTypes = {
  children: PropTypes.node,
  summary: PropTypes.node,
};

// Tile with the section's surface applied, so variants only describe content.
export const HealthTile = props => (
  <AlignedMetricTile background={surfaceBackground} {...props} />
);
