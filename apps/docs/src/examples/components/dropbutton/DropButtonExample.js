import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DropButton, Heading, Paragraph } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';

export const DropButtonExample = () => {
  const [open, setOpen] = React.useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <DropButton
      label="Open Drop"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      dropContent={<DropContent onClose={onClose} />}
      dropProps={{ align: { top: 'bottom', right: 'right' } }}
      primary
    />
  );
};

const DropContent = ({ onClose }) => (
  <Box pad="medium" gap="medium" width="medium">
    <Box direction="row" justify="between" align="center">
      <Heading level={3} margin="none">
        Heading
      </Heading>
      <Button a11yTitle="Close" icon={<Close />} onClick={onClose} />
    </Box>
    <Paragraph margin="none">Here is some additional content.</Paragraph>
  </Box>
);

DropContent.propTypes = {
  onClose: PropTypes.func,
};
