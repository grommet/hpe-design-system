// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Box, Button, Stepper, Text } from 'grommet';

const steps = [
  { id: 'details', title: 'Details', status: 'completed' },
  {
    id: 'configuration',
    title: 'Configuration',
    status: 'error',
    errorMessage: 'Enter a valid IP address.',
  },
  { id: 'values', title: 'Values', status: 'completed' },
  { id: 'review', title: 'Review', status: 'completed' },
];

export const StepperRecoveringFromValidationErrorsAtSpecificStepExample =
  () => {
    const [currentStep, setCurrentStep] = useState('configuration');
    const [hasError, setHasError] = useState(true);
    const displayedSteps = steps.map(step =>
      step.id === 'configuration'
        ? {
            ...step,
            status: hasError ? 'error' : 'completed',
            errorMessage: hasError ? step.errorMessage : undefined,
          }
        : step,
    );
    const statusMessage = hasError
      ? 'Setup completed automatically. Update the IP address to resolve the '
        + 'Configuration issue.'
      : 'The Configuration issue is resolved and the completed setup is ready '
        + 'for use.';

    return (
      <Box gap="medium">
        <Stepper
          aria-label="Device setup validation"
          clickableSteps
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          steps={displayedSteps}
        />
        <Box gap="xsmall">
          <Text weight="bold">
            {hasError ? 'Follow-up fix required' : 'Follow-up fix resolved'}
          </Text>
          <Text>{statusMessage}</Text>
        </Box>
        <Button
          label={hasError ? 'Fix configuration' : 'Configuration fixed'}
          onClick={() => setHasError(false)}
          primary
          disabled={!hasError}
        />
      </Box>
    );
  };
