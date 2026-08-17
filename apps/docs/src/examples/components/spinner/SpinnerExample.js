// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Spinner } from 'grommet';

export const SpinnerExample = () => (
  <Spinner
    message={{
      start: 'Loading data.',
      end: 'Data has been loaded.',
    }}
  />
);
