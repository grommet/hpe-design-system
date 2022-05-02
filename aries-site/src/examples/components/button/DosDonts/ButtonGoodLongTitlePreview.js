import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export function ButtonGoodLongTitlePreview() {
  return <Box gap="medium" pad="small" width="medium">
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
    <Box gap="small">
      <Button primary label="Primary Button" onClick={() => {}} />
      <Button secondary label="Secondary Button" onClick={() => {}} />
      <Button default label="Default Button" onClick={() => {}} />
    </Box>
  </Box>;
}
