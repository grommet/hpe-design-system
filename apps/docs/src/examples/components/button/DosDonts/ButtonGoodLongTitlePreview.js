import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonGoodLongTitlePreview = () => (
  <Box gap="medium" pad="xsmall" width="medium">
    <Header
      direction="column"
      align="start"
      gap="5xsmall"
      pad={{ horizontal: '5xsmall' }}
    >
      <Heading level={2} margin="none">
        Heading
      </Heading>
      <Text>Subtitle</Text>
    </Header>
    <Box gap="xsmall">
      <Button primary label="Primary button" onClick={() => {}} />
      <Button secondary label="Secondary button" onClick={() => {}} />
      <Button default label="Default button" onClick={() => {}} />
    </Box>
  </Box>
);
