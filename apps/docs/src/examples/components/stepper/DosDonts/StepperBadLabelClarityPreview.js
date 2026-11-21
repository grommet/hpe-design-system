// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Stepper } from 'grommet';

export const StepperBadLabelClarityPreview = () => (
  <Box pad="small">
    <Stepper
      currentStep="step-2"
      steps={[
        { id: 'step-1', title: 'Step 1', status: 'completed' },
        { id: 'step-2', title: 'Next' },
        { id: 'step-3', title: 'More' },
      ]}
    />
  </Box>
);
