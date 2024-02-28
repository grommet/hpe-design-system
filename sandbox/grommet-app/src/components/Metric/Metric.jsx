import { Text } from 'grommet';
import PropTypes from 'prop-types';

export const Metric = ({ value, unit, options }) => (
  <Text size="small" weight={500}>
    <Text size="xxlarge">
      {Intl.NumberFormat(undefined, options).format(value)}{' '}
    </Text>
    {unit}
  </Text>
);

Metric.propTypes = {
  value: PropTypes.number,
  unit: PropTypes.string,
  options: PropTypes.shape({}),
};
