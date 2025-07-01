import React from 'react';
import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import { metricSizes } from './sizes';

export const Metric = ({
  label: labelProp,
  value: valueProp,
  unit,
  options,
  reverse = false,
  size = 'medium',
  ...rest
}) => {
  let value = valueProp;

  if (typeof valueProp === 'number') {
    value = Intl.NumberFormat(undefined, options).format(valueProp);
  }

  const label = <Text size={metricSizes[size].label}>{labelProp}</Text>;
  const valueNode = React.isValidElement(valueProp) ? (
    value
  ) : (
    <Text size={metricSizes[size].unit}>
      <Text size={metricSizes[size].value} weight={500} color="text-strong">
        {value}
      </Text>{' '}
      {unit}
    </Text>
  );

  return (
    <Box direction={reverse ? 'column-reverse' : 'column'} {...rest}>
      {label}
      {valueNode}
    </Box>
  );
};

Metric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]),
  unit: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  options: PropTypes.shape({}),
  reverse: PropTypes.bool,
};
