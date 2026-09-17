// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';
import { ContentPane } from '../../../layouts';

export const TabContent = ({ ...rest }) => (
  <Box pad={{ vertical: 'medium' }}>
    <ContentPane {...rest} />
  </Box>
);
