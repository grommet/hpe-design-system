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
      full={['xsmall', 'small'].includes(size)}
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
          You have unsaved changes. Leaving this page will cause you to lose all
          of your progress.
        </Text>
        <Box
          as="footer"
          gap="small"
          direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
          align="center"
          justify="end"
        >
          <Button
            label="No, Stay"
            onClick={() => onSetOpen(false)}
            secondary
            fill={!['xsmall', 'small'].includes(size) ? false : 'horizontal'}
          />
          <Button
            label="Yes, Exit"
            fill={!['xsmall', 'small'].includes(size) ? false : 'horizontal'}
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
