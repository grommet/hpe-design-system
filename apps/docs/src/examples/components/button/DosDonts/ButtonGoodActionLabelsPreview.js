import React from 'react';
import { Box, Button, CheckBox, FormField, Heading, Text } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonGoodActionLabelsPreview = () => (
  <Box width="medium" gap="medium" pad="xsmall">
    <Box pad={{ horizontal: '5xsmall' }} gap="3xsmall">
      <Heading level={2} margin="none">
        Filters
      </Heading>
      <Text color="text-weak" size="small">
        Status
      </Text>
      <FormField
        htmlFor="active-good"
        name="active"
        contentProps={{ border: false }}
      >
        <CheckBox id="active-good" name="active" label="Active" />
      </FormField>
      <FormField
        htmlFor="inactive-good"
        name="inactive"
        contentProps={{ border: false }}
      >
        <CheckBox id="inactive-good" name="inactive" label="Inactive" />
      </FormField>
    </Box>
    <ButtonGroup alignSelf="end">
      <Button label="Reset" onClick={() => {}} />
      <Button primary label="Apply filters" onClick={() => {}} />
    </ButtonGroup>
  </Box>
);
