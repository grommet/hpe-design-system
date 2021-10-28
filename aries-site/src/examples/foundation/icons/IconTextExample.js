import React from 'react';
import { Box, Button } from 'grommet';
import { Chat } from 'grommet-icons';

export const IconTextExample = () => (
    <Box pad="xsmall">
      <Button gap="small" alignSelf="start" icon={<Chat />} label="Chat" />
    </Box>
  );
