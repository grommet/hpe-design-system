// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, TimeInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const TimeInputPreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref}>
      <TimeInput aria-label="preview" />
    </Box>
  );
};