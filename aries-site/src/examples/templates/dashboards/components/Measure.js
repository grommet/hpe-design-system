import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, NameValuePair, Text } from 'grommet';

export const Measure = ({ name, value, onClick }) => {
  const { icon: iconProp, label } = name;
  const icon = cloneElement(iconProp, { size: 'small' });

  return (
    <Button alignSelf="start" onClick={onClick}>
      <NameValuePair
        name={
          <Box direction="row" align="center" gap="small">
            {icon}
            <Text size="small">{label}</Text>
          </Box>
        }
      >
        <Text weight="bold" size="xxlarge">
          {value}
        </Text>
      </NameValuePair>
    </Button>
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
