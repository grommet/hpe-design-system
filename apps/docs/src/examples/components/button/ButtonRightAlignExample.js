import React from 'react';
import { Box, Button } from 'grommet';
import { ButtonGroup, TextEmphasis } from '@shared/aries-core';

export const ButtonRightAlignExample = () => (
  <Box width="xlarge" gap="medium" pad="xsmall">
    <TextEmphasis alignSelf="end" size="large">
      Right-aligned buttons
    </TextEmphasis>
    <ButtonGroup justify="end">
      <Button label="Default" />
      <Button secondary label="Secondary" />
      <Button primary label="Primary" />
    </ButtonGroup>
  </Box>
);
