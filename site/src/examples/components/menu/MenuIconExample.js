import React from 'react';
import { Box, List, Menu } from 'grommet';
import { More } from 'grommet-icons';

export const MenuIconExample = () => {
  const data = ['User 1', 'User 2', 'User 3'];

  return (
    <Box width={{ max: 'large' }} fill>
      <List
        data={data}
        pad="small"
        action={() => (
          <Box direction="row" align="center" gap="medium">
            <Menu
              icon={<More />}
              hoverIndicator
              items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
            />
          </Box>
        )}
      >
        {(datum, index) => (
          <Box key={index} direction="row" align="center" justify="between">
            {datum}
          </Box>
        )}
      </List>
    </Box>
  );
};
