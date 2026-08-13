import React from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { hpe as hpeTheme } from 'grommet-theme-hpe';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const SelectGroupLabel = ({ label, optionPad }) => {
  const theme = React.useContext(ThemeContext);
  const pad = optionPad ||
    theme?.button?.size?.medium?.option?.pad ||
    HPE_OPTION_PAD || { horizontal: 'small', vertical: 'xsmall' };

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
