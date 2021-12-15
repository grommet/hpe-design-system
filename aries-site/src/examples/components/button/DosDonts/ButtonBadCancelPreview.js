import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonBadCancelPreview = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Heading level={2} margin="none" size="small">
        Delete
      </Heading>
      <Text size="large">
        Deleting this item? Consider previewing results to see the effects of
        deleting the iteam.
      </Text>
    </Header>
    <Box direction="row" gap="small">
      <Box width="medium" direction="row" s gap="small">
        <Button secondary label="Preview Results" onClick={() => {}} />
        <Button primary label="Save" onClick={() => {}} />
      </Box>
      <Box align="end" fill>
        <Button secondary label="Cancel" onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
