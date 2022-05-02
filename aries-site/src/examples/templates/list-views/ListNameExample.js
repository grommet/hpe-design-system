import React from 'react';
import { Box, List, Text } from 'grommet';

const data = ['Server 1', 'Server 2', 'Server 3', 'Server 4', 'Server 5'];

export function ListNameExample() {
  return <Box width={{ max: 'xxlarge' }} margin="auto" fill>
      <List background="background-front" data={data}>
        {(datum, index) => (
          <Text weight="bold" key={index}>
            {datum}
          </Text>
        )}
      </List>
    </Box>;
}
