import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { WizardContext } from '.';

export function StepFooter() {
  const size = useContext(ResponsiveContext);
  const { activeIndex, id, steps, width } = useContext(WizardContext);

  return (
    <Box
      margin={
        !['xsmall', 'small'].includes(size)
          ? { horizontal: 'medium' }
          : undefined
      }
      flex={false}
    >
      <Footer
        border={{ side: 'top', color: 'border' }}
        justify="end"
        pad={
          !['xsmall', 'small'].includes(size)
            ? { vertical: 'medium' }
            : { vertical: 'small', horizontal: 'medium' }
        }
        alignSelf="center"
        width={width}
      >
        <Button
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
}
