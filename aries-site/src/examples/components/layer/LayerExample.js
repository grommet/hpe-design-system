import React from 'react';
import { Button, Box, Layer } from 'grommet';
import { LayerHeader } from 'aries-core';
import { LayerForm } from './ConfigurationForm';
import {
  ConfirmationProvider,
  ConfirmationContext,
  DoubleConfirmation,
  useConfirmation,
} from './components';

export const LayerExample = () => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ showLayer, showConfirmation, setShowLayer }) => (
        <>
          <Box align="center">
            <Button
              label="Show me the layer"
              onClick={() => setShowLayer(true)}
              primary
            />
          </Box>
          {showLayer ? <AddApplication /> : null}
          {showConfirmation ? <DoubleConfirmation title="application" /> : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

const AddApplication = ({ ...rest }) => {
  const { onClose } = useConfirmation();

  return (
    <Layer position="right" full="vertical" onEsc={onClose} {...rest}>
      <Box pad="medium" gap="medium" overflow="auto">
        <LayerHeader title="Add application" onClose={onClose} />
        <Box flex={false}>
          <LayerForm />
        </Box>
        <Box direction="row" gap='xsmall' flex={false}>
          <Button
            label="Add application"
            primary
            type="submit"
            form="application-form"
          />
          <Button label="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </Layer>
  );
};
