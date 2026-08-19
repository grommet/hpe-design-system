// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Pagination, Box } from 'grommet';

export const PaginationExample = () => (
  <Box border="top" pad={{ vertical: '3xsmall' }} justify="between">
    <Pagination fill stepOptions summary numberItems={200} />
  </Box>
);
