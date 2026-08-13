import React from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { resolveOptionPad } from '../utils';

const SelectGroupLabel = ({ label }) => {
  const theme = React.useContext(ThemeContext);
  const pad = resolveOptionPad(theme);

  return (
    <Box
      role="presentation"
      pad={{
        top: 'xxsmall',
        bottom: '5xsmall',
        left: pad?.left || pad?.horizontal,
      }}
    >
      <Text
        size="xsmall"
        weight="bold"
        color="text-strong"
        role="heading"
        aria-level={3}
      >
        {label}
      </Text>
    </Box>
  );
};

export { SelectGroupLabel };
