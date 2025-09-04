import React from 'react';
import { Box, Button } from 'grommet';
import { Chat } from 'grommet-icons';

export const IconTextExample = () => (
    <Box pad='3xsmall'>
      <Button gap='xsmall' alignSelf="start" icon={<Chat />} label="Chat" />
    </Box>
  );
