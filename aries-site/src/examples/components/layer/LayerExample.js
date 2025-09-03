import React, { useContext } from 'react';
import { Button, Box, Layer, AnnounceContext } from 'grommet';
import { LayerHeader } from 'aries-core';
import { LayerForm } from './ConfigurationForm';
import {
  ConfirmationProvider,
  ConfirmationContext,
  DoubleConfirmation,
  useConfirmation,
} from './components';

export const LayerExample = () => {
  const announce = useContext(AnnounceContext);
  return (
    <ConfirmationProvider>
      <ConfirmationContext.Consumer>
        {({ showLayer, showConfirmation, setShowLayer }) => (
          <>
            <Box align="center">
              <Button
                label="Show me the layer"
                primary
                onClick={() => {
                  announce('Add application modal opened.', 'assertive', 2000);
                  setShowLayer(true);
                }}
              />
            </Box>
            {showLayer ? <AddApplication /> : null}
            {showConfirmation ? (
              <DoubleConfirmation title="application" />
            ) : null}
          </>
        )}
      </ConfirmationContext.Consumer>
    </ConfirmationProvider>
  );
};

const AddApplication = ({ ...rest }) => {
  const { onClose } = useConfirmation();
  const announce = useContext(AnnounceContext);

  const handleClose = () => {
    announce('Add application modal closed.', 'assertive', 2000);
    onClose();
  };

  return (
    <Layer position="right" full="vertical" onEsc={handleClose} {...rest}>
      <Box pad="medium" gap="medium" overflow="auto">
        <LayerHeader title="Add application" onClose={handleClose} />
        <Box flex={false}>
          <LayerForm />
        </Box>
        <Box direction="row" gap="small" flex={false}>
          <Button
            label="Add application"
            primary
            type="submit"
            form="application-form"
          />
          <Button
            label="Cancel ad"
            a11yTitle="Add application modal cancelled and closed."
            onClick={() => {
              announce(
                'Add application modal cancelled and closed.',
                'assertive',
                2000,
              );
              onClose();
            }}
          />
        </Box>
      </Box>
    </Layer>
  );
};
