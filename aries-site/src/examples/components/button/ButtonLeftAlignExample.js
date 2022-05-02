import React from 'react';
import { Box, Button, Header, Text } from 'grommet';

export function ButtonLeftAlignExample() {
  return <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Text weight="bold" size="large">Left-aligned buttons</Text>
    </Header>
    <Box direction="row" gap="medium">
      <Button primary label="Primary" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
      <Button label="Default" onClick={() => {}} />
    </Box>
  </Box>;
}
