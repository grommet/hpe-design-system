import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Text, ResponsiveContext } from 'grommet';
import { WizardContext } from '.';

export const CancellationLayer = ({ onSetOpen, ...rest }) => {
  const { defaultFormValues, setFormValues } = useContext(WizardContext);
  const size = useContext(ResponsiveContext);
  return (
    <Layer
      position="center"
      full={size === 'small'}
      onClickOutside={() => onSetOpen(false)}
      onEsc={() => onSetOpen(false)}
      {...rest}
    >
      <Box pad="large" gap="medium" width="large">
        <>
          <Heading color="text-strong" margin="none">
            Cancel
          </Heading>
          <Text color="text-strong">Wizard Title</Text>
        </>
        <Text>
          Cancelling setup will lose all of your progress. Are you sure you want
          to exit the setup?
        </Text>
        <Box
          as="footer"
          gap="small"
          direction={size !== 'small' ? 'row' : 'column'}
          align="center"
          justify="end"
        >
          <Button
            label="No, Continue Wizarding"
            onClick={() => onSetOpen(false)}
            secondary
            fill={size !== 'small' ? false : 'horizontal'}
          />
          <Button
            label="Yes, Cancel Wizarding"
            fill={size !== 'small' ? false : 'horizontal'}
            onClick={() => {
              onSetOpen(false);
              setFormValues(defaultFormValues);
            }}
            primary
          />
        </Box>
      </Box>
    </Layer>
  );
};

CancellationLayer.propTypes = {
  onSetOpen: PropTypes.func.isRequired,
  target: PropTypes.object,
};
