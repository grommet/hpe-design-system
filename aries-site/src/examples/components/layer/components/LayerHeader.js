import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { FormClose } from 'grommet-icons';

export const LayerHeader = ({ informational, ...rest }) => (
  <Box flex={false} align="start" direction="row" gap="small" {...rest}>
    <Box>
      <Heading id="layer-title" level={2} margin="none" size="small">
        Layer title
      </Heading>
      <Paragraph id="layer-subtitle" margin="none">
        An optional, concise subtitle for added context.
      </Paragraph>
    </Box>
    {informational ? (
      <Button id="layer-close-button" icon={<FormClose />} />
    ) : null}
  </Box>
);

LayerHeader.propTypes = {
  informational: PropTypes.bool,
};
