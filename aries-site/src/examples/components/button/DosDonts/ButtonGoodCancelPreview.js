import React from 'react';
import { Box, Button, Heading, Header, Text } from 'grommet';

export const ButtonGoodCancelPreview = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Heading level={2} margin="none" size="small">
        Delete item?
      </Heading>
      <Text size="large">
        Deleting this item cannot be undone. Consider previewing results to see
        the effects of deleting the item.
      </Text>
    </Header>
    <Box direction="row" justify="end" gap="small">
      <Button label="Cancel" onClick={() => {}} />
      <Button secondary label="Preview Results" onClick={() => {}} />
      <Button primary label="Delete Item" onClick={() => {}} />
    </Box>
  </Box>
);
