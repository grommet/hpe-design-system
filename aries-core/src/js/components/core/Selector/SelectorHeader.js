import React, { useContext } from 'react';
import { Box, CheckBox, RadioButton, Text } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';

export const SelectorHeader = ({ icon, description, title, selected }) => {
  const { multiple } = useContext(SelectorGroupContext);
  return (
    <Box align="start" direction="row" pad="small">
      <Box direction="row" gap="small" flex wrap>
        {icon}
        <Box>
          <Text weight={500}>{title}</Text>
          <Text>{description}</Text>
        </Box>
      </Box>
      {multiple ? (
        <CheckBox tabIndex={-1} checked={selected} />
      ) : (
        <RadioButton tabIndex={-1} checked={selected} />
      )}
    </Box>
  );
};
