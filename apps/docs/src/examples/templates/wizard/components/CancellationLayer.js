// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Text, ResponsiveContext } from 'grommet';
import { WizardContext } from '.';

export const CancellationLayer = ({ onExit, onSetOpen, title, ...rest }) => {
  // title and onExit fall back to the template WizardContext so examples
  // built on that context keep working without passing props.
  const { defaultFormValues, setFormValues, wizardTitle } =
    useContext(WizardContext);
  const size = useContext(ResponsiveContext);
  const exit = onExit || (() => setFormValues(defaultFormValues));
  return (
    <Layer
      position="center"
      full={['xsmall', 'small'].includes(size)}
      onClickOutside={() => onSetOpen(false)}
      onEsc={() => onSetOpen(false)}
      {...rest}
    >
      <Box pad="xlarge" gap="medium" width="xlarge">
        <>
          <Heading level={2} margin="none">
            Cancel
          </Heading>
          <Text color="text-strong">
            {title || wizardTitle || 'Wizard Title'}
          </Text>
        </>
        <Text>
          You have unsaved changes. Leaving this page will cause you to lose all
          of your progress.
        </Text>
        <Box
          as="footer"
          gap="xsmall"
          direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
          align="center"
          justify="end"
        >
          <Button
            label="No, stay"
            onClick={() => onSetOpen(false)}
            secondary
            fill={!['xsmall', 'small'].includes(size) ? false : 'horizontal'}
          />
          <Button
            label="Yes, exit"
            fill={!['xsmall', 'small'].includes(size) ? false : 'horizontal'}
            onClick={() => {
              onSetOpen(false);
              exit();
            }}
            primary
          />
        </Box>
      </Box>
    </Layer>
  );
};

CancellationLayer.propTypes = {
  onExit: PropTypes.func,
  onSetOpen: PropTypes.func.isRequired,
  target: PropTypes.object,
  title: PropTypes.string,
};
