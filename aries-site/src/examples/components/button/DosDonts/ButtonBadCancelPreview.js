import React from 'react';
import { Box, Button, Heading, Header, Paragraph } from 'grommet';
import { ButtonGroup } from 'aries-core';

export const ButtonBadCancelPreview = () => (
  <Box width="xlarge" gap="medium" pad="xsmall">
    <Header
      direction="column"
      align="start"
      gap="3xsmall"
      pad={{ horizontal: '5xsmall' }}
    >
      <Heading level={2} margin="none">
        Delete item?
      </Heading>
      <Paragraph>
        Deleting this role assignment will revoke access to the underlying
        resources.
      </Paragraph>
    </Header>
    <ButtonGroup alignSelf="end">
      <Button secondary label="Cancel" onClick={() => {}} />
      <Button primary label="Delete role assignment" onClick={() => {}} />
    </ButtonGroup>
  </Box>
);
