import React, { useContext } from 'react';
import { Button, Footer, ResponsiveContext } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { WizardContext } from '.';
import { steps } from '../WizardDemo';

export const StepFooter = () => {
  const size = useContext(ResponsiveContext);
  const { activeIndex, setActiveIndex, setAttemptedAdvance } = useContext(
    WizardContext,
  );

  const buttonProps = {
    fill: size === 'small' ? 'horizontal' : undefined,
    icon: <FormNextLink />,
    primary: true,
    reverse: true,
  };

  return (
    <Footer
      border={{ side: 'top', color: 'border' }}
      justify="end"
      pad={
        size !== 'small'
          ? { vertical: 'medium' }
          : { vertical: 'small', horizontal: 'medium' }
      }
      width="large"
      alignSelf="center"
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
            nextIndex = nextIndex <= steps.length - 1 ? nextIndex : activeIndex;

            setActiveIndex(nextIndex);
          }}
        />
      )}
      {activeIndex === steps.length - 1 && (
        <Button
          {...buttonProps}
          label="Finish Wizard"
          form="validation-form-two-column"
          type="submit"
        />
      )}
    </Footer>
  );
};
