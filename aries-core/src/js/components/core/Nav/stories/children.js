import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Menu } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Help, Chat, User } from 'grommet-icons';
import { AnchorGroup, NavSection, Nav } from 'aries-core';

const Children = () => (
  <Grommet theme={hpe} full>
    <Box background="dark-1" fill gap="medium">
      <Nav title="Service Name">
        <NavSection>
          <Button icon={<User />} />
          <Menu
            dropAlign={{ top: 'bottom' }}
            label="lozzi@hpe.com"
            items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          />
        </NavSection>
        <NavSection>
          <Button icon={<Help />} />
          <Button icon={<Chat />} />
        </NavSection>
      </Nav>

      <Nav title="Service Name">
        <NavSection>
          <AnchorGroup
            items={[
              { label: 'Dashboard' },
              { label: 'Feature' },
              { label: 'Automation' },
              { label: 'Activity' },
            ]}
          />
        </NavSection>
        <NavSection>
          <Button icon={<Help />} />
          <Button icon={<Chat />} />
        </NavSection>
      </Nav>
    </Box>
  </Grommet>
);

storiesOf('Nav', module).add('Children', () => <Children />);
