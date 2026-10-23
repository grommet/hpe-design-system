// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

// Legend entry whose swatch mirrors the stroke it describes: a solid or
// dashed line in the series color.
export const LegendItem = ({ color, dash, label }) => (
  <Box direction="row" align="center" gap="3xsmall">
    <Box
      pad={{ horizontal: 'xxsmall' }}
      border={{
        side: 'top',
        size: 'small',
        color,
        style: dash ? 'dashed' : 'solid',
      }}
      flex={false}
      aria-hidden
    />
    <Text size="small">{label}</Text>
  </Box>
);

LegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  dash: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
