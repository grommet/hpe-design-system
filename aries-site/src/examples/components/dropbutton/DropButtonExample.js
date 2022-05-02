import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DropButton, Heading, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

export function DropButtonExample() {
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
}

function DropContent({ onClose }) {
  return <Box pad="medium" gap="medium" width="medium">
    <Box direction="row" justify="between" align="center">
      <Heading level={3} margin="none">
        Heading
      </Heading>
      <Button icon={<FormClose />} onClick={onClose} />
    </Box>
    <Text>Here is some additional content.</Text>
  </Box>;
}

DropContent.propTypes = {
  onClose: PropTypes.func,
};
