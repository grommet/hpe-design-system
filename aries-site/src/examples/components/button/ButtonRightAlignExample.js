import React from 'react';
import { Box, Button, Header } from 'grommet';
import { ButtonGroup, TextEmphasis } from 'aries-core';

export const ButtonRightAlignExample = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <TextEmphasis alignSelf="end" size="large">
        Right-aligned buttons
      </TextEmphasis>
    </Header>
    <ButtonGroup justify="end">
      <Button label="Default" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
      <Button primary label="Primary" onClick={() => {}} />
    </ButtonGroup>
  </Box>
);
