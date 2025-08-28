import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonBadGroupPreview = () => (
  <Box gap="medium" pad='xsmall' width="medium">
    <Header
      direction="column"
      align="start"
      gap='5xsmall'
      pad={{ horizontal: '5xsmall' }}
    >
      <Heading level={2} margin="none">
        Heading
      </Heading>
      <Text>Subtitle</Text>
    </Header>
    <Box direction="row" gap='xsmall'>
      <Button primary label="Primary..." onClick={() => {}} />
      <Button secondary label="Seconda..." onClick={() => {}} />
      <Button default label="Default..." onClick={() => {}} />
    </Box>
  </Box>
);
