import React, { useState } from 'react';
import { Box, Button, FormField, Heading, Text, TextInput } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const steps = [
  { title: 'Project details', label: 'Step 1 of 3' },
  { title: 'Configuration', label: 'Step 2 of 3' },
  { title: 'Review', label: 'Step 3 of 3' },
];

export const ButtonNavigatingProcessStepsExample = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Box align="center" justify="center" pad="large" gap="medium">
        <Text>Project created successfully.</Text>
        <Button
          label="Start over"
          onClick={() => {
            setStep(0);
            setDone(false);
          }}
        />
      </Box>
    );
  }

  return (
    <Box pad="medium" width="medium" gap="medium">
      <Box>
        <Text size="small" color="text-weak">
          {steps[step].label}
        </Text>
        <Heading level={3} margin="none">
          {steps[step].title}
        </Heading>
      </Box>

      {step === 0 && (
        <FormField
          label="Project name"
          htmlFor="projectName"
          name="projectName"
        >
          <TextInput
            id="projectName"
            name="projectName"
            placeholder="my-project"
          />
        </FormField>
      )}

      {step === 1 && (
        <FormField label="Environment" htmlFor="env" name="env">
          <TextInput id="env" name="env" placeholder="production" />
        </FormField>
      )}

      {step === 2 && (
        <Box gap="xsmall">
          <Text>Review your settings before finishing.</Text>
          <Text size="small" color="text-weak">
            Project name: my-project
          </Text>
          <Text size="small" color="text-weak">
            Environment: production
          </Text>
        </Box>
      )}

      <ButtonGroup pad={{ top: 'medium' }}>
        {step < steps.length - 1 ? (
          <Button
            label="Next"
            primary
            onClick={() => setStep(s => s + 1)}
          />
        ) : (
          <Button label="Finish" primary onClick={() => setDone(true)} />
        )}
        {step > 0 && (
          <Button label="Back" onClick={() => setStep(s => s - 1)} />
        )}
      </ButtonGroup>
    </Box>
  );
};
