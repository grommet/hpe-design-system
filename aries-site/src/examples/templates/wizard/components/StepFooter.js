import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { WizardContext } from '.';

export const StepFooter = () => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    id,
    formValues,
    setActiveIndex,
    setAttemptedAdvance,
    setError,
    steps,
    validation,
    width,
  } = useContext(WizardContext);

  const buttonProps = {
    fill: size === 'small' ? 'horizontal' : undefined,
    icon: <FormNextLink />,
    primary: true,
    reverse: true,
  };

  return (
    <Box margin={{ horizontal: 'medium' }} flex={false}>
      <Footer
        border={{ side: 'top', color: 'border' }}
        justify="end"
        pad={size !== 'small' ? { vertical: 'medium' } : { vertical: 'small' }}
        alignSelf="center"
        width={width}
      >
        {activeIndex < steps.length - 1 && (
          <Button
            {...buttonProps}
            label="Next"
            onClick={() => {
              // mark that the user is trying to advance, so that onChange
              // validation will run on any errors in the future
              setAttemptedAdvance(true);

              let nextIndex = activeIndex + 1;
              nextIndex =
                nextIndex <= steps.length - 1 ? nextIndex : activeIndex;

              if (validation && validation[activeIndex]) {
                // check for errors
                const validationRes =
                  validation[activeIndex].validator &&
                  validation[activeIndex].validator(formValues);
                // advance to next step if successful
                if (validationRes && validationRes.isValid)
                  setActiveIndex(nextIndex);
                // otherwise, display error and wizard will not advance to
                // next step
                else {
                  setError(validationRes);
                }
              } else {
                setActiveIndex(nextIndex);
              }
            }}
          />
        )}
        {activeIndex === steps.length - 1 && (
          <Button
            {...buttonProps}
            label="Finish Wizard"
            form={`${id}-form`}
            type="submit"
          />
        )}
      </Footer>
    </Box>
  );
};
