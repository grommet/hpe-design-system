// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { resolveOptionPad } from '../utils';

const SelectGroupLabel = ({ label, ...rest }) => {
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
      {...rest}
    >
      {/* Known limitation: nested inside Select's role="option" row, so AT
          still announces this as a disabled option, not a heading/group. */}
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
