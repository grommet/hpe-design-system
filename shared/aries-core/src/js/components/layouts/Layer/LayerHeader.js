import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Header, Heading, Paragraph } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';

export const LayerHeader = ({
  closeId,
  headerId,
  informational,
  title = 'Layer title',
  onClose,
  subtitle,
  titleSize,
  ...rest
}) => (
  <Header
    id={headerId}
    flex={false}
    align="start"
    gap="xsmall"
    justify="between"
    {...rest}
  >
    <Box>
      <Heading id="layer-title" level={2} margin="none" size={titleSize}>
        {title}
      </Heading>
      <Paragraph id="layer-subtitle" margin="none">
        {subtitle}
      </Paragraph>
    </Box>
    {onClose ? (
      <Button
        icon={<Close id={closeId} />}
        onClick={onClose}
        a11yTitle="Close modal"
      />
    ) : null}
  </Header>
);

LayerHeader.propTypes = {
  closeId: PropTypes.string,
  headerId: PropTypes.string,
  headerGap: PropTypes.string,
  informational: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleSize: PropTypes.string,
};
