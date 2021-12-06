import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonGoodCTAPreview = () => (
  <Box gap="small" pad="small">
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
    <Box align="start">
      <Button secondary label="Secondary" onClick={() => {}} />
    </Box>
  </Box>
);
