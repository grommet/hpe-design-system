import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Layer } from 'grommet';
import { LayerForm } from './ConfigurationForm';
import {
  ConfirmationProvider,
  ConfirmationContext,
  DoubleConfirmation,
  LayerHeader,
  useConfirmation,
} from './components';

export const LayerExample = ({ containerRef }) => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ showLayer, showConfirmation, setShowLayer }) => (
        <>
          <Box align="center" justify="center" fill>
            <Button
              label="Show me the layer"
              onClick={() => setShowLayer(true)}
              primary
            />
          </Box>
          {showLayer ? <AddApplication target={containerRef?.current} /> : null}
          {showConfirmation ? (
            <DoubleConfirmation
              title="application"
              target={containerRef?.current}
            />
          ) : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

LayerExample.propTypes = {
  containerRef: PropTypes.node,
};

const AddApplication = ({ ...rest }) => {
  const { onClose } = useConfirmation();

  return (
    <Layer position="right" full="vertical" onEsc={onClose} {...rest}>
      <Box pad="medium" gap="medium" overflow="auto">
        <LayerHeader title="Add application" onClose={onClose} />
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
          <Button label="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </Layer>
  );
};
