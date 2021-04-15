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
    setValidationResults,
    steps,
    width,
  } = useContext(WizardContext);

  const handleSubmit = (evt) => {
    setValidationResults({ valid: true });
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    else if (onSubmit) {
      onSubmit(evt);
    }
  };

  // On long forms, we want to focus the first of any fields that
  // return an error or info message. This removes the need for the
  // user to scroll to find which field blocked form submission.
  const onValidate = validationResults => {
    const names  = [ ...Object.keys(validationResults.errors),
      ...Object.keys(validationResults.infos) ];
      if (names.length > 0) {
        const selector = names.map(name => `[name=${name}]`).join(',');
        const firstInvalid = document.querySelectorAll(selector)[0];
        if (firstInvalid) {
          firstInvalid.focus();
        }
    }
    setValidationResults(validationResults);
  };

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
        pad={size === 'small' ? { horizontal: 'medium' } : 'xxsmall'}
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
            validate="blur"
            method="post"
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
