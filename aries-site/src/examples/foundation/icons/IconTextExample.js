import React from 'react';
import { Box, Button } from 'grommet';
import { Chat } from 'grommet-icons';

export function IconTextExample() {
  return <Box pad="xsmall">
      <Button gap="small" alignSelf="start" icon={<Chat />} label="Chat" />
    </Box>;
}
