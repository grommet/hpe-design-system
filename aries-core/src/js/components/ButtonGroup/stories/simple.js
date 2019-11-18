import React from 'react';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Help, Chat, User } from 'grommet-icons';
import { ButtonGroup } from 'aries-core';

export default {
  title: 'ButtonGroup',
};

export const simple = () => (
  <Grommet theme={hpe} full>
    <Box background="white" fill>
      <Box direction="row-responsive">
        <ButtonGroup
          items={[{ icon: <Help /> }, { icon: <Chat /> }, { icon: <User /> }]}
        />
      </Box>
    </Box>
  </Grommet>
);
