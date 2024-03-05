import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';

const sizes = {
  small: {
    label: 'small',
    value: 'xlarge',
    unit: 'xsmall',
  },
  medium: {
    label: 'medium',
    value: 'xxlarge',
    unit: 'small',
  },
  large: {
    label: 'large',
    value: '3xl',
    unit: 'medium',
  },
};
export const Metric = ({ label, value, unit, options, size = 'medium' }) => (
  <Box>
    <Text size={sizes[size].label}>{label}</Text>
    <Text size={sizes[size].unit}>
      <Text size={sizes[size].value} weight={500} color="text-strong">
        {Intl.NumberFormat(undefined, options).format(value)}
      </Text>{' '}
      {unit}
    </Text>
  </Box>
);

Metric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  options: PropTypes.shape({}),
};
