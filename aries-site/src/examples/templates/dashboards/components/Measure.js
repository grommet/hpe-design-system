import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, NameValuePair, Text } from 'grommet';
import { TextEmphasis } from 'aries-core';

const NameType = PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        label: PropTypes.string,
        size: PropTypes.string,
      }),
    ]).isRequired,
    icon: PropTypes.node,
  });
const ValueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.string,
    }),
  ]);

const Name = ({ name }) => {
  const { icon: iconProp, label } = name;
  const icon = iconProp ? cloneElement(iconProp, { size: 'small' }) : null;

  return (
    <Box
      direction="row"
      align="center"
      gap='xsmall'
      // margin is needed to keep consistent with the spacing
      // delivered by the theme when name is typeof 'string'
      // https://github.com/grommet/grommet/blob/db5be926eb7c2f791534f02dd55b0f9997e959db/src/js/themes/base.js#L1072
      margin={{ bottom: '5xsmall' }}
    >
      {icon}
      <Text size={label?.size || 'small'}>
        {label?.label || label}
      </Text>
    </Box>
  );
};

Name.propTypes = {
  name: NameType,
};

const Value = ({ value: valueProp }) => {
  const value = valueProp?.value || valueProp;
  const valueSize = valueProp?.size || 'xxlarge';
  
  return <TextEmphasis size={valueSize}>{value}</TextEmphasis>;
};

Value.propTypes = {
  value: ValueType,
};

export const Measure = ({ name, value, onClick }) => {
  // If this measure is clickable, render a Button with the Name and Value
  // rather a NameValuePair since <button> or even another <div> to attach
  // the onClick which contains a <dt><dd> isn't correct markup.
  return onClick ? (
      <Button onClick={onClick}>
        <>
          <Name name={name} />
          <Value value={value} />
        </>
      </Button>
    ) : (
      <NameValuePair
        name={<Name name={name} />}
      >
        <Value value={value}/>
      </NameValuePair>
    );
};

Measure.propTypes = {
  name: NameType,
  value: ValueType,
  onClick: PropTypes.func,
};
