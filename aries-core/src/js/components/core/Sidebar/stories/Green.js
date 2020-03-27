import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button, Box, Grommet, Text, Nav } from 'grommet';

import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Projects,
  StatusInfoSmall,
} from 'grommet-icons';

import { aries } from '../../../../../../../aries-site/src/themes/aries';
import { Sidebar } from '../Sidebar';

/* Avatar */
const SidebarHeader = () => (
  <Box
    align="center"
    round="full"
    height="xxsmall"
    width="xxsmall"
    justify="center"
    background="blue!"
    responsive={false}
    flex={false}
  >
    <Text alignSelf="center" size="xlarge">
      SY
    </Text>
  </Box>
);

const Navigation = () => (
  <>
    <Nav gap="small">
      <Button icon={<StatusInfoSmall />} />
      <Button icon={<Projects />} />
      <Button icon={<Clock />} />
      <Box pad="small" border={{ color: 'white', side: 'bottom' }} />
      <Box gap="small" pad={{ vertical: 'medium' }}>
        <Button icon={<Analytics />} />
        <Button icon={<Configure />} />
      </Box>
    </Nav>
    <Nav gap="small">
      <Button icon={<Chat />} />
      <Button icon={<Help />} />
    </Nav>
  </>
);

export const Green = () => (
  <Grommet theme={aries} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar background="blue" header={<SidebarHeader />}>
        <Navigation />
      </Sidebar>
    </Box>
  </Grommet>
);

storiesOf('Sidebar', module).add('Green', () => <Green />);
