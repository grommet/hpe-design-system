// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Button, Stepper, Text } from 'grommet';

const stepDefinitions = [
  { id: 'details', title: 'Details' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'values', title: 'Values' },
  { id: 'review', title: 'Review' },
];

export const StepperCompletingGuidedSetupWorkflowExample = () => {
  const [currentStep, setCurrentStep] = useState('values');
  const currentIndex = stepDefinitions.findIndex(
    step => step.id === currentStep,
  );
  const steps = stepDefinitions.map((step, index) => ({
    ...step,
    status: index < currentIndex ? 'completed' : undefined,
  }));

  const moveStep = offset => {
    const nextIndex = Math.max(
      0,
      Math.min(stepDefinitions.length - 1, currentIndex + offset),
    );
    setCurrentStep(stepDefinitions[nextIndex].id);
  };

  return (
    <Box gap="medium">
      <Stepper
        aria-label="Device setup progress"
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        steps={steps}
      />
      <Box gap="xsmall">
        <Text weight="bold">Configure values</Text>
        <Text>
          Set the device thresholds before reviewing the setup details.
        </Text>
      </Box>
      <Box direction="row" gap="small">
        <Button label="Back" onClick={() => moveStep(-1)} />
        <Button label="Next" onClick={() => moveStep(1)} primary />
      </Box>
    </Box>
  );
};
