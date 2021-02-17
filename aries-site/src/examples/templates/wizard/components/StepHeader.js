import React, { useContext } from 'react';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { WizardContext } from '.';

export const StepHeader = () => {
  const { activeIndex, activeStep, id, steps } = useContext(WizardContext);
  return (
    <Box id={id} gap="xsmall" flex={false}>
      <Text>
        Step {activeStep} of {steps.length}
      </Text>
      <Heading color="text-strong" margin="none" size="small">
        {steps[activeIndex].title || `Step ${activeStep} Title`}
      </Heading>
      {typeof steps[activeIndex].description === 'string' ? (
        <Paragraph size="large" margin="none">
          {steps[activeIndex].description}
        </Paragraph>
      ) : (
        steps[activeIndex].description
      )}
    </Box>
  );
};
