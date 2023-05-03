import React from 'react';
import { Box, Button, Header } from 'grommet';
import { ButtonGroup, TextEmphasis } from 'aries-core';

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
    <ButtonGroup>
      <Button primary label="Primary" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
      <Button label="Default" onClick={() => {}} />
    </ButtonGroup>
  </Box>
);
