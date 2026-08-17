// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, DateInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const DateInputPreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref}>
      <DateInput aria-label="preview" format="mm/dd/yyyy" />
    </Box>
  );
};
