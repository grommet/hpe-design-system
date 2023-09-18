import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Form, ResponsiveContext } from 'grommet';
import { StepHeader, WizardContext } from '.';

export const StepContent = ({ onSubmit }) => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    setActiveIndex,
    formValues,
    id,
    ref,
    setFormValues,
    setValid,
    steps,
    width,
  } = useContext(WizardContext);

  const handleSubmit = event => {
    setValid(true);
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (onSubmit) {
      onSubmit(event);
    }
  };

  // On long forms, we want to focus the first of any fields that
  // return an error or info message. This removes the need for the
  // user to scroll to find which field blocked form submission.
  const onValidate = validationResults => {
    const names = [
      ...Object.keys(validationResults.errors),
      ...Object.keys(validationResults.infos),
    ];
    if (names.length > 0) {
      const selector = names.map(name => `[name=${name}]`).join(',');
      const firstInvalid = document.querySelectorAll(selector)[0];
      if (firstInvalid) {
        setTimeout(() => firstInvalid.focus(), 0);
      }
    }
    setTimeout(() => setValid(names.length === 0), 0);
  };

  return (
    <Box
      align="center"
      pad={
        !['xsmall', 'small'].includes(size)
          ? { vertical: 'large' }
          : { vertical: 'medium' }
      }
      overflow="auto"
      ref={ref}
      flex={['xsmall', 'small'].includes(size) ? true : undefined}
      margin={
        !['xsmall', 'small'].includes(size)
          ? { horizontal: 'medium' }
          : undefined
      }
    >
      <Box
        width={width}
        gap="medium"
        pad={
          ['xsmall', 'small'].includes(size)
            ? { horizontal: 'medium' }
            : 'xxsmall'
        }
      >
        <StepHeader />
        <Box margin={{ top: 'small' }}>
          <Form
            // needed to associate form submit button with form
            // since submit button lives outside form tag
            id={`${id}-form`}
            value={formValues}
            onChange={nextValue => setFormValues(nextValue)}
            onSubmit={handleSubmit}
            onValidate={onValidate}
            method="post"
            messages={{
              required: 'This is a required field.',
            }}
          >
            {steps[activeIndex].inputs}
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

StepContent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
