import React from 'react';
import { Box, Button, Header, Heading, Text } from 'grommet';

export const ButtonBadCTAPreview = () => (
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
    <Button secondary label="Secondary" onClick={() => {}} />
  </Box>
);
