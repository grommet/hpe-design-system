import React from 'react';
import { Box, Button } from 'grommet';
import { ButtonGroup, TextEmphasis } from '@shared/aries-core';

export const ButtonLeftAlignExample = () => (
  <Box width="xlarge" gap="medium" pad="xsmall">
    <TextEmphasis size="large">Left-aligned buttons</TextEmphasis>
    <ButtonGroup>
      <Button primary label="Primary" />
      <Button secondary label="Secondary" />
      <Button label="Default" />
    </ButtonGroup>
  </Box>
);
