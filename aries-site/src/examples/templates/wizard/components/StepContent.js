import React, { useContext } from 'react';
import { Box, Form, ResponsiveContext } from 'grommet';
import { StepHeader, WizardContext } from '.';
import { steps } from '../WizardDemo';

export const StepContent = () => {
  const size = useContext(ResponsiveContext);
  const { activeIndex, formValues, setFormValues, ref } = useContext(
    WizardContext,
  );
  return (
    <Box
      align="center"
      pad={size !== 'small' ? { vertical: 'large' } : 'medium'}
      overflow="auto"
      ref={ref}
      flex={size === 'small' ? true : undefined}
      margin={{ horizontal: 'medium' }}
    >
      <Box width="large" gap="medium">
        <StepHeader />
        <Box margin={{ top: 'small' }}>
          <Form
            // needed to associate form submit button with form
            // since submit button lives outside form tag
            id="validation-form"
            value={formValues}
            onChange={nextValue => setFormValues(nextValue)}
            onSubmit={({ value }) => console.log(value)}
          >
            {steps[activeIndex].inputs}
          </Form>
        </Box>
      </Box>
    </Box>
  );
};
