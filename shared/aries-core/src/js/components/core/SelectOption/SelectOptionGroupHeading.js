import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, ThemeContext } from 'grommet';
import { getSelectOptionPad } from './SelectOptionRow';

const SelectOptionGroupHeading = ({ label, isFirstGroup = false }) => {
  const theme = useContext(ThemeContext);
  const optionPad = getSelectOptionPad(theme);

  return (
    <Box>
      {!isFirstGroup && (
        <Box
          border={{ side: 'top', color: 'border-weak' }}
          margin={{ top: 'xsmall', bottom: 'xxsmall' }}
        />
      )}
      <Box
        pad={{
          horizontal: optionPad?.horizontal,
          top: 'xxsmall',
          bottom: '5xsmall',
        }}
      >
        <Text size="xsmall" weight="bold" color="text-strong">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

SelectOptionGroupHeading.propTypes = {
  isFirstGroup: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export { SelectOptionGroupHeading };
