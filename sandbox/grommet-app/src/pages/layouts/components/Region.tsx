// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';

export const Region = ({ ...rest }) => {
  return (
    <Box border={{ side: 'all', style: "dotted" }} {...rest} />
  );
}
