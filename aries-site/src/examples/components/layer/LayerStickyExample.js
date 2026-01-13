import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Layer, ResponsiveContext } from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import { MonitorFormExample } from './MonitorFormExample';
import {
  DoubleConfirmation,
  ConfirmationProvider,
  ConfirmationContext,
  useConfirmation,
} from './components';

export const LayerStickyExample = ({ sticky = true }) => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ setShowLayer, showLayer, showConfirmation }) => (
        <>
          <Box align="start">
            <Button
              label="Show me the layer"
              onClick={() => setShowLayer(true)}
              primary
            />
          </Box>
          {showLayer ? <AddMonitor sticky={sticky} /> : null}
          {showConfirmation ? <DoubleConfirmation title="monitor" /> : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

LayerStickyExample.propTypes = {
  sticky: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const AddMonitor = ({ sticky }) => {
  const { onClose } = useConfirmation();
  const size = useContext(ResponsiveContext);

  const containerProps =
    sticky === 'scrollup'
      ? {
          fill: 'vertical',
          overflow: 'auto',
        }
      : {};

  return (
    <Layer
      position="right"
      full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
      onEsc={onClose}
    >
      <Box {...containerProps}>
        <LayerHeader
          title="Add monitor"
          onClose={onClose}
          background="background"
          pad="medium"
          sticky="scrollup"
        />
        <MonitorFormExample sticky={sticky === true} />
      </Box>
    </Layer>
  );
};

AddMonitor.propTypes = {
  sticky: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
