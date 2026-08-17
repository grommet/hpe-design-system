// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Grid } from 'grommet';

export const Tiles = ({ ...rest }) => (
  <Grid columns={{ count: 'fit', size: 'xsmall' }} {...rest} />
);
