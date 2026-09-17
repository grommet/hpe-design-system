// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';

export const ContentPane = ({ ...rest }) => (
  <Box background="background-front" pad="medium" round="xlarge" {...rest} />
);
