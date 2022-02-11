import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, NameValuePair, Text } from 'grommet';

export const Measure = ({ name, value: valueProp, onClick, ...rest }) => {
  const { icon: iconProp, label } = name;
  const icon = iconProp ? cloneElement(iconProp, { size: 'small' }) : null;

  const value = valueProp?.value || valueProp;
  const valueSize = valueProp?.size || 'xxlarge';

  let contents = (
    <NameValuePair
      name={
        <Box direction="row" align="center" gap="small">
          {icon}
          <Text size={name.label?.size || 'small'}>{label.label || label}</Text>
        </Box>
      }
    >
      <Text weight="bold" size={valueSize}>
        {value}
      </Text>
    </NameValuePair>
  );

  if (onClick) {
    contents = <Button onClick={onClick}>{contents}</Button>;
  }

  return <Box {...rest}>{contents}</Box>;
};

Measure.propTypes = {
  name: PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        label: PropTypes.string,
        size: PropTypes.string,
      }),
    ]).isRequired,
    icon: PropTypes.node,
  }),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.string,
    }),
  ]),
  onClick: PropTypes.func,
};
