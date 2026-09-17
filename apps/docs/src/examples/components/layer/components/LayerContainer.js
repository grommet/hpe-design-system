// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';

export const LayerContainer = ({ ...rest }) => (
  <Box
    background="background-front"
    elevation="large"
    gap="medium"
    pad="medium"
    round="medium"
    {...rest}
  />
);
