// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Avatar, Box, Button, Spinner, Tag } from 'grommet';

const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

export const ElementSizes = () => (
  <Box align="start" gap="large">
    {sizes.map(size => (
      <Box key={size} direction="row" align="center" gap="medium">
        {/* flex={false} keeps element sizes fixed; they must not shrink. */}
        <Avatar
          size={size}
          background="background-accent-purple-weak"
          flex={false}
        >
          SL
        </Avatar>
        <Button size={size} label="Label" primary flex={false} />
        <Tag size={size} name="name" value="value" />
        {/* Decorative here: shows sizing, not a loading state. */}
        {/* eslint-disable-next-line grommet/spinner-message */}
        <Spinner size={size} aria-hidden="true" />
      </Box>
    ))}
  </Box>
);
