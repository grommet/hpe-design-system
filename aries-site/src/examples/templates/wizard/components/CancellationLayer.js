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
            Are you sure you want to exit the wizard?
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
          direction={size !== 'small' ? 'row' : 'column'}
          align="center"
          justify="end"
        >
          <Button
            label="No, Stay"
            onClick={() => onSetOpen(false)}
            secondary
            fill={size !== 'small' ? false : 'horizontal'}
          />
          <Button
            label="Yes, Leave"
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
