import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonBadGroupPreview = () => (
  <Box gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xxsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Heading level={2} margin="none">
        Heading
      </Heading>
      <Text>Subtitle</Text>
    </Header>
    <Box direction="row" gap="small">
      <Button primary label="Primary..." onClick={() => { }} />
      <Button secondary label="Seconda..." onClick={() => { }} />
      <Button default label="Default..." onClick={() => { }} />
    </Box>
  </Box>
);
