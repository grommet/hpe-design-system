// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Button, PageHeader } from 'grommet';

export const ButtonPrimaryCtaExample = () => (
  <Box fill pad="medium">
    <PageHeader
      title="GreenLake Monitoring"
      subtitle="Monitor health and performance of your GreenLake resources."
      actions={<Button label="Activate service" primary />}
    />
  </Box>
);
