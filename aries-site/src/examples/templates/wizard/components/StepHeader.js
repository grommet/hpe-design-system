import React, { useContext } from 'react';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { WizardContext } from '.';
import { steps } from '../WizardDemo';

export const StepHeader = () => {
  const { activeIndex, activeStep } = useContext(WizardContext);
  return (
    <Box id="ccs-demo" gap="xsmall" flex={false}>
      <Text color="border" weight="bold">
        Step {activeStep} of {steps.length}
      </Text>
      <Heading color="text-strong" margin="none" size="small">
        {steps[activeIndex].title || `Step ${activeStep} Title`}
      </Heading>
      <Paragraph size="large" margin="none">
        {steps[activeIndex].description}
      </Paragraph>
    </Box>
  );
};
