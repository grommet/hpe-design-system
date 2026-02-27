import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer } from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import { useConfirmation } from '@shared/hooks';

export const DoubleConfirmation = ({ title, ...rest }) => {
  const { acceptConfirmation, cancelConfirmation } = useConfirmation();

  return (
    <Layer {...rest}>
      <Box pad="medium" gap="medium">
        <LayerHeader
          title={`Discard ${title}?`}
          subtitle="Your changes will not be applied."
        />
        <Box direction="row" gap="xsmall" justify="end">
          <Button label="Cancel" onClick={cancelConfirmation} />
          <Button label="Discard" primary onClick={acceptConfirmation} />
        </Box>
      </Box>
    </Layer>
  );
};

DoubleConfirmation.propTypes = {
  title: PropTypes.string,
};
