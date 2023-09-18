import React from 'react';
import { Box, Button, Heading, Header, Paragraph } from 'grommet';
import { ButtonGroup } from 'library';

export const ButtonBadCancelPreview = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xsmall"
      pad={{ horizontal: 'xxsmall' }}
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
