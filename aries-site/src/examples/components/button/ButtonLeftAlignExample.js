import React from 'react';
import { Box, Button, Header } from 'grommet';
import { ButtonGroup, TextEmphasis } from 'aries-core';

export const ButtonLeftAlignExample = () => (
  <Box width="xlarge" gap="medium" pad="xsmall">
    <Header
      direction="column"
      align="start"
      gap="3xsmall"
      pad={{ horizontal: '5xsmall' }}
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
