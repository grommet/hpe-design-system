import React from 'react';
import { Box, Button, Header, Heading, Text } from 'grommet';

export const ButtonGoodGroupPreview = () => (
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
    <Box gap="small" direction="row">
      <Button primary label="Primary" onClick={() => {}} />
      <Button secondary label="Secondary" onClick={() => {}} />
    </Box>
  </Box>
);
