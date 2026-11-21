// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Stepper } from 'grommet';

export const StepperGoodLabelClarityPreview = () => (
  <Box pad="small" width="xlarge">
    <Stepper
      currentStep="configuration"
      steps={[
        { id: 'details', title: 'Details', status: 'completed' },
        { id: 'configuration', title: 'Configuration' },
        { id: 'review', title: 'Review' },
      ]}
    />
  </Box>
);
