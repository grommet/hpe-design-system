import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Box, NameValuePair, Text } from 'grommet';

export const Measure = ({ name, value, onClick }) => {
  const { icon, label } = name;
  const adjIcon = cloneElement(icon, { size: 'small' });

  return (
    <Box onClick={onClick}>
      <NameValuePair
        name={
          <Box direction="row" align="center" gap="small">
            {adjIcon}
            {label}
          </Box>
        }
      >
        <Text weight="bold" size="xxlarge">
          {value}
        </Text>
      </NameValuePair>
    </Box>
  );
};

Measure.propTypes = {
  name: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};
