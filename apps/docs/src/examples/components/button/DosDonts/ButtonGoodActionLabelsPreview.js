import React from 'react';
import { Box, Button, CheckBoxGroup, FormField, Heading } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonGoodActionLabelsPreview = () => (
   <Box gap="medium">
    <Heading level={2} margin="none">
      Filters
    </Heading>
    <FormField label="Status" htmlFor="status-bad" name="status">
      <CheckBoxGroup
        id="status-bad"
        name="status"
        options={['Active', 'Inactive']}
      />
    </FormField>
    <ButtonGroup>
      <Button primary label="Apply filters" onClick={() => {}} />
      <Button label="Reset" onClick={() => {}} />
    </ButtonGroup>
  </Box>
);
