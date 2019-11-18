import React from 'react';
import { Box, Button, Grommet, Menu } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { User } from 'grommet-icons';
import { NavSection } from 'aries-core';

export default {
  title: 'NavSection',
};

export const simple = () => (
  <Grommet theme={hpe} full>
    <Box background="white" fill>
      <Box direction="row-responsive">
        <NavSection>
          <Button icon={<User />} />
          <Menu
            dropAlign={{ top: 'bottom' }}
            label="lozzi@hpe.com"
            items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          />
        </NavSection>
      </Box>
    </Box>
  </Grommet>
);
