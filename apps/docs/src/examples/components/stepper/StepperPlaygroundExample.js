// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Stepper } from 'grommet';

const stepDefinitions = [
  {
    id: 'details',
    title: 'Details',
    description: 'Name the device and owner.',
  },
  {
    id: 'configuration',
    title: 'Configuration',
    description: 'Choose the device policy.',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Confirm the setup details.',
  },
];

export const StepperPlaygroundExample = () => {
  const [currentStep, setCurrentStep] = useState('configuration');
  const currentIndex = stepDefinitions.findIndex(
    step => step.id === currentStep,
  );
  const steps = stepDefinitions.map((step, index) => ({
    ...step,
    status: index < currentIndex ? 'completed' : undefined,
  }));

  return (
    <Box width="xlarge">
      <Stepper
        aria-label="Device setup steps"
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        steps={steps}
      />
    </Box>
  );
};