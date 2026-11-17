// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { Box, Text, ThemeContext } from 'grommet';
import { useSurfaceVariant } from '../surfaces';

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };

// The surfaces worth naming in each arrangement of the shell.
const ROLES = {
  framed: [
    ['chrome', 'Chrome'],
    ['sheet', 'Sheet'],
    ['panel', 'Panel'],
    ['card', 'Card'],
    ['inner', 'Inner'],
  ],
  beside: [
    ['sheet', 'Page'],
    ['chrome', 'Rail'],
    ['panel', 'Panel'],
    ['card', 'Card'],
    ['inner', 'Inner'],
  ],
};

// The shell's surfaces and the token the selected architecture gives each,
// so a change of architecture is visible even where a region (the chrome,
// when no local nav is open) has no room for its own chip.
export const RoleLegend = () => {
  const theme = useContext(ThemeContext);
  const { tokens, mode, shell } = useSurfaceVariant();
  return (
    <Box
      as="dl"
      direction="row"
      align="center"
      gap={{ row: 'xxsmall', column: 'small' }}
      wrap
      margin="none"
    >
      {ROLES[shell].map(([role, label]) => (
        <Box key={role} direction="row" gap="xsmall" align="center">
          <Box
            width="16px"
            height="16px"
            round="full"
            border={{ color: 'border-strong' }}
            background={theme.global.colors[tokens[role]]?.[mode]}
            flex={false}
          />
          <Text as="dt" size="small">
            {label}
          </Text>
          <Text as="dd" size="small" margin="none" style={MONO}>
            {tokens[role].replace('background-surface-', '')}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
