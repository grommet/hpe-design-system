import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, CheckBox, RadioButton, Text } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';

const SelectorIndicator = ({ selected }) => {
  const { multiple } = useContext(SelectorGroupContext);

  return multiple ? (
    <CheckBox tabIndex={-1} checked={selected} readOnly />
  ) : (
    <RadioButton tabIndex={-1} checked={selected} readOnly />
  );
};

const SelectorHeader = ({ icon, description, title, selected }) => (
  <Box align="start" direction="row" pad="small" gap="small">
    <Box direction="row" gap="small" flex wrap>
      {icon}
      <Box>
        {title && <Text weight={500}>{title}</Text>}
        {typeof description === 'string' ? (
          <Text>{description}</Text>
        ) : (
          description
        )}
      </Box>
    </Box>
    <SelectorIndicator selected={selected} />
  </Box>
);

SelectorIndicator.propTypes = {
  selected: PropTypes.bool,
};

SelectorHeader.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  selected: PropTypes.bool,
};

export { SelectorHeader };
