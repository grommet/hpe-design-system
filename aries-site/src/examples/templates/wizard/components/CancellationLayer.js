import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { WizardContext } from '.';
import { defaultFormValues } from '../WizardDemo';

export const CancellationLayer = ({ onSetOpen }) => {
  const { setFormValues } = useContext(WizardContext);
  return (
    <Layer
      position="center"
      onClickOutside={() => onSetOpen(false)}
      onEsc={() => onSetOpen(false)}
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
          direction="row"
          align="center"
          justify="end"
        >
          <Button
            label="No, Continue Wizarding"
            onClick={() => onSetOpen(false)}
            secondary
          />
          <Button
            label="Yes, Cancel Wizarding"
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
};
