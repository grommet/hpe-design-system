import React from 'react';
import {
  Box,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  RadioButtonGroup,
  Select,
} from 'grommet';

import { FormContainer } from '.';

const sortFeatures = ['Featured', 'Price', 'Users'];

export const SortExample = () => {
  const [formValues, setFormValues] = React.useState({
    sortBy: 'Featured',
    sortOrder: 'Descending',
  });

  const applySort = () => {
    // Mock function to demonstrate implementation
  };

  const onFormChange = value => {
    setFormValues(value);
    applySort();
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={3} margin="none">
            Sort
          </Heading>
        </Header>
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form value={formValues} onChange={onFormChange}>
            <FormField
              name="sortBy"
              label="Sort by"
              component={Select}
              options={sortFeatures}
            />
            <FormField
              name="sortOrder"
              label="Sort order"
              component={RadioButtonGroup}
              options={['Ascending', 'Descending']}
            />
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
