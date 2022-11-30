import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { FormClose } from 'grommet-icons';

export const LayerHeader = ({
  closeId,
  informational,
  title = 'Layer title',
  onClose,
  subtitle,
  ...rest
}) => (
  <Box
    flex={false}
    align="start"
    direction="row"
    gap="small"
    justify="between"
    {...rest}
  >
    <Box>
      <Heading id="layer-title" level={2} margin="none" size="small">
        {title}
      </Heading>
      <Paragraph id="layer-subtitle" margin="none">
        {subtitle}
      </Paragraph>
    </Box>
    {onClose ? (
      <Button icon={<FormClose />} onClick={onClose} id={closeId} />
    ) : null}
  </Box>
);

LayerHeader.propTypes = {
  closeId: PropTypes.string,
  informational: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
