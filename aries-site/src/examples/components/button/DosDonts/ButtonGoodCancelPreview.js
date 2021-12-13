import React from 'react';
import { Box, Button, Heading, Header, Text, Spinner } from 'grommet';

export const ButtonGoodCancelPreview = () => (
  <Box width="large" gap="medium" pad="small">
    <Header
      direction="column"
      align="start"
      gap="xxsmall"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Heading level={2} margin="none">
        Rule Ordering
      </Heading>
      <Text>
        This rule set is for manipulating ASM/ARM field in departments and
        products. Also changing units to add chargeback information
      </Text>
    </Header>
    <Box gap="small" align="center" justify="center">
      <Spinner size="medium" />
      <Text> Loading rules...</Text>
    </Box>
    <Box direction="row" justify="end" gap="small">
      <Button label="Cancel" onClick={() => {}} />
      <Button secondary label="Redo" onClick={() => {}} />
      <Button primary label="Save" onClick={() => {}} />
    </Box>
  </Box>
);
