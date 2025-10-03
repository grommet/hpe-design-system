import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Footer, ResponsiveContext } from 'grommet';
import { LinkNext } from 'grommet-icons';
import { WizardContext } from '.';

export const StepFooter = ({ nextId, ...rest }) => {
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
      {...rest}
    >
      <Footer
        border={{ side: 'top', color: 'border' }}
        justify="end"
        pad={
          !['xsmall', 'small'].includes(size)
            ? { vertical: 'medium' }
            : { vertical: 'xsmall', horizontal: 'medium' }
        }
        alignSelf="center"
        width={width}
      >
        <Button
          id={nextId}
          icon={<LinkNext />}
          primary
          reverse
          label={activeIndex === steps.length - 1 ? 'Finish wizard' : 'Next'}
          form={`${id}-form`}
          type="submit"
        />
      </Footer>
    </Box>
  );
};

StepFooter.propTypes = {
  nextId: PropTypes.string,
};
