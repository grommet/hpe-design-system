// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Avatar, Box, Grid, Text } from 'grommet';

const avatars = [
  {
    initials: 'JS',
    background: 'background-accent-blue-strong',
    color: 'text-onStrong',
  },
  {
    initials: 'BA',
    background: 'background-accent-cyan-strong',
    color: 'text-onStrong',
  },
  {
    initials: 'MG',
    background: 'background-accent-purple-strong',
    color: 'text-onStrong',
  },
  {
    initials: 'CP',
    background: 'background-accent-blue-weak',
    color: 'text-strong',
  },
  {
    initials: 'SO',
    background: 'background-accent-cyan-weak',
    color: 'text-strong',
  },
  {
    initials: 'MK',
    background: 'background-accent-purple-weak',
    color: 'text-strong',
  },
];

export const AvatarColorExample = () => (
  <Grid columns={['auto', 'auto', 'auto']} gap="medium" justify="center">
    {avatars.map(({ initials, background, color }) => (
      <Box key={initials} align="center">
        <Avatar
          size="medium"
          background={background}
          a11yTitle={`Avatar containing initial letters ${initials}`}
        >
          <Text color={color}>{initials}</Text>
        </Avatar>
      </Box>
    ))}
  </Grid>
);
