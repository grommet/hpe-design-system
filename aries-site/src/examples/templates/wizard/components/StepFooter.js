import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { WizardContext } from '.';

export const StepFooter = () => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    id,
    steps,
    width,
  } = useContext(WizardContext);

  return (
    <Box
      margin={size !== 'small' ? { horizontal: 'medium' } : undefined}
      flex={false}
    >
      <Footer
        border={{ side: 'top', color: 'border' }}
        justify="end"
        pad={
          size !== 'small'
            ? { vertical: 'medium' }
            : { vertical: 'small', horizontal: 'medium' }
        }
        alignSelf="center"
        width={width}
      >
        <Button
          fill={size === 'small' ? 'horizontal' : undefined}
          icon={<FormNextLink />}
          primary
          reverse
          label={activeIndex === steps.length - 1 ? 'Finish Wizard' : 'Next'}
          form={`${id}-form`}
          type="submit"
        />
      </Footer>
    </Box>
  );
};
