import React from 'react';
import { Box, Button, Header } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const ButtonLeftAlignExample = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <TextEmphasis size="large">Left-aligned buttons</TextEmphasis>
    </Header>
    <Box direction="row" gap="medium">
      <Button primary label="Primary" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
      <Button label="Default" onClick={() => {}} />
    </Box>
  </Box>
);
