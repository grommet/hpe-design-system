// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Chart, Text, ThemeContext } from 'grommet';

const swatchValues = [{ value: [0, 0.5] }, { value: [1, 0.5] }];
const swatchBounds = { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };

// Legend entry for a line chart. The swatch is a miniature Chart so its
// stroke, caps and dash match the plot exactly.
export const ChartLegendItem = ({
  color,
  dash,
  label,
  thickness = '5xsmall',
}) => {
  const theme = useContext(ThemeContext);
  return (
    <Box direction="row" align="center" gap="3xsmall">
      <Chart
        type="line"
        values={swatchValues}
        bounds={swatchBounds}
        size={{
          width: theme.global.edgeSize.small,
          height: theme.global.edgeSize[thickness] || thickness,
        }}
        color={color}
        thickness={thickness}
        dash={dash}
        round
        overflow
        aria-hidden="true"
      />
      <Text size="small">{label}</Text>
    </Box>
  );
};

ChartLegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  dash: PropTypes.bool,
  label: PropTypes.string.isRequired,
  thickness: PropTypes.string,
};

// Y axis for a Chart. Each label is centred on its guide line: the column
// is justified across the plot height and every label is a zero-height box
// whose text overflows equally above and below.
export const ChartYAxis = ({ labels, ...rest }) => (
  <Box justify="between" align="end" flex={false} {...rest}>
    {labels.map(label => (
      <Box key={label} height="0px" justify="center" overflow="visible">
        <Text size="xsmall">{label}</Text>
      </Box>
    ))}
  </Box>
);

ChartYAxis.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Evenly spaced horizontal guide lines, one per axis label, to sit behind a
// Chart in a Stack.
export const ChartGuides = ({ count }) => (
  <Box fill justify="between">
    {Array.from({ length: count }, (_, index) => (
      <Box key={index} border={{ side: 'top', color: 'border-weak' }} />
    ))}
  </Box>
);

ChartGuides.propTypes = {
  count: PropTypes.number.isRequired,
};
