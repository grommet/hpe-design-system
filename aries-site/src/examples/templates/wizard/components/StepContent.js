import React, { useContext } from 'react';
import { Box, Form, ResponsiveContext } from 'grommet';
import { StepHeader, WizardContext } from '.';

export const StepContent = () => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    formValues,
    id,
    ref,
    setFormValues,
    steps,
    width,
  } = useContext(WizardContext);

  return (
    <Box
      align="center"
      pad={size !== 'small' ? { vertical: 'large' } : { vertical: 'medium' }}
      overflow="auto"
      ref={ref}
      flex={size === 'small' ? true : undefined}
      margin={size !== 'small' ? { horizontal: 'medium' } : undefined}
    >
      <Box
        width={width}
        gap="medium"
        pad={size === 'small' ? { horizontal: 'small' } : 'xxsmall'}
      >
        <StepHeader />
        <Box margin={{ top: 'small' }}>
          <Form
            // needed to associate form submit button with form
            // since submit button lives outside form tag
            id={`${id}-form`}
            value={formValues}
            onChange={nextValue => setFormValues(nextValue)}
            onSubmit={({ value }) => console.log(value)}
            method="post"
          >
            {steps[activeIndex].inputs}
          </Form>
        </Box>
      </Box>
    </Box>
  );
};
