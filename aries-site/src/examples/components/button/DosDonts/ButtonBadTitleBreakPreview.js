import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonBadTitleBreakPreview = () => (
  <Box width="medium" gap="medium" pad="small">
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
    <Button primary label="Primary Button" onClick={() => {}} />
    <Button secondary label="Secondary Button" onClick={() => {}} />
    <Button secondary label="Secondary Button" onClick={() => {}} />
    </Box>
  </Box>
);
