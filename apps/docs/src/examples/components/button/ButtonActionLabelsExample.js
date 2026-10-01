// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Button } from 'grommet';

export const ButtonActionLabelsExample = () => (
  <Box direction="row" gap="xsmall" wrap>
    <Button label="Apply filters" onClick={() => {}} primary />
    <Button label="Reset" onClick={() => {}} secondary />
    <Button label="Cancel" onClick={() => {}} />
  </Box>
);
