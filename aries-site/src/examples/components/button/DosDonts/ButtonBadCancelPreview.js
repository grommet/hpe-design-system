import React from 'react';
import { Box, Button, Heading, Header, Text, Spinner } from 'grommet';

export const ButtonBadCancelPreview = () => (
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
    <Box align="center" justify="center" height={{ min: 'small' }}>
      <Spinner message="Loading rules..." size="medium" />
    </Box>
    <Box direction="row" gap="small">
      <Button secondary label="Redo" onClick={() => {}} />
      <Button primary label="Save" onClick={() => {}} />
      <Box fill justify="end">
        <Button label="Cancel" secondary onClick={() => {}} />
      </Box>
    </Box>
  </Box>
);
