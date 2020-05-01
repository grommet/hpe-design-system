import React from 'react';
import { Box, Button } from 'grommet';
import { Chat } from 'grommet-icons';

export const IconTextExample = () => {
  return (
    <Box pad="xsmall">
      <Button
        gap="small"
        alignSelf="start"
        plain
        icon={<Chat />}
        label="Chat"
      />
    </Box>
  );
};
