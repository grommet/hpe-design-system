import React from 'react';
import { Box, Button, Header, Text } from 'grommet';

export const ButtonRightAlignExample = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Text alignSelf="end" weight="bold" size="large">
        Right-aligned buttons
      </Text>
    </Header>
    <Box direction="row" justify="end" gap="medium">
      <Button label="Default" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
      <Button primary label="Primary" onClick={() => {}} />
    </Box>
  </Box>
);
