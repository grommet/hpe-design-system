import React from 'react';
import { Box, List } from 'grommet';
import { TextEmphasis } from 'library';

const data = ['Server 1', 'Server 2', 'Server 3', 'Server 4', 'Server 5'];

export const ListNameExample = () => (
  <Box width={{ max: 'xxlarge' }} margin="auto" fill>
    <List background="background-front" data={data}>
      {(datum, index) => <TextEmphasis key={index}>{datum}</TextEmphasis>}
    </List>
  </Box>
);
