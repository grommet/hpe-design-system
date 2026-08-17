// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Grid, Box } from 'grommet';

export const GridPreview = () => (
    <Grid
      fill
      border={{ color: 'background-back', size: 'xlarge' }}
      columns={{
        count: 4,
        size: 'auto',
      }}
      gap="small"
    >
      <Box fill background="background-front" />
      <Box background="background-front" />
      <Box background="background-front" />
      <Box background="background-front" />
    </Grid>
  );
