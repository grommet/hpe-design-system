import React, { useContext } from 'react';
import { AnnounceContext, Button, Box, Layer } from 'grommet';
import { LayerHeader } from 'aries-core';
import { LayerForm } from './ConfigurationForm';
import {
  ConfirmationProvider,
  ConfirmationContext,
  DoubleConfirmation,
  useConfirmation,
} from './components';

const modalTitle = 'Add application modal';

export const LayerExample = () => {
  const announce = useContext(AnnounceContext);

  return (
    <ConfirmationProvider>
      <ConfirmationContext.Consumer>
        {({ showLayer, showConfirmation, setShowLayer }) => {
          return (
            <>
              <Box align="center">
                <Button
                  label="Show me the layer"
                  onClick={() => {
                    announce(`${modalTitle} opened.`, 'polite');
                    setShowLayer(true);
                  }}
                  primary
                />
              </Box>
              {showLayer ? <AddApplication /> : null}
              {showConfirmation ? (
                <DoubleConfirmation title="application" />
              ) : null}
            </>
          );
        }}
      </ConfirmationContext.Consumer>
    </ConfirmationProvider>
  );
};

const AddApplication = ({ ...rest }) => {
  const announce = useContext(AnnounceContext);
  const { onClose } = useConfirmation();

  const closeLayer = () => {
    announce(`${modalTitle} closed.`, 'polite');
    onClose();
  };

  return (
    <Layer position="right" full="vertical" onEsc={closeLayer} {...rest}>
      <Box pad="medium" gap="medium" overflow="auto">
        <LayerHeader title="Add application" onClose={closeLayer} />
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
          <Button label="Cancel" onClick={closeLayer} />
        </Box>
      </Box>
    </Layer>
  );
};
