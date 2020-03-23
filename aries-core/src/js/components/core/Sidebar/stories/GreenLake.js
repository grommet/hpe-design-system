import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button, Box, Grommet, Stack, Nav } from 'grommet';

import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Projects,
  Split,
  StatusInfoSmall,
} from 'grommet-icons';

import { aries } from '../../../../../../../aries-site/src/themes/aries';
import { Sidebar } from '../Sidebar';

const Avatar = ({ ...rest }) => (
  <Box
    height="xxsmall"
    width="xxsmall"
    round="full"
    // eslint-disable-next-line max-len
    background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
    {...rest}
  />
);

const SidebarHeader = () => (
  <Stack anchor="top-right">
    <Avatar />
    <Box pad="xsmall" background="orange" round responsive={false} />
  </Stack>
);

const Navigation = () => (
  <Box align="center" fill justify="between">
    <Nav gap="small">
      <Button normalized icon={<StatusInfoSmall />} />
      <Button normalized icon={<Clock />} />
      <Button icon={<Projects />} />
      <Button icon={<Split />} />
      <Button icon={<Analytics />} />
      <Button icon={<Configure />} />
    </Nav>
    <Nav gap="small">
      <Button icon={<Chat />} />
      <Button icon={<Help />} />
    </Nav>
  </Box>
);

export const GreenLake = () => (
  <Grommet theme={aries} full>
    <Box direction="row" fill="vertical">
      <Sidebar background="blue" header={<SidebarHeader />}>
        <Navigation />
      </Sidebar>
    </Box>
  </Grommet>
);

storiesOf('Sidebar', module).add('GreenLake', () => <GreenLake />);
