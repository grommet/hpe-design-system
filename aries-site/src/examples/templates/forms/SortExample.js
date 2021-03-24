import React from 'react';
import {
  Box,
  Form,
  FormField,
  Header,
  RadioButtonGroup,
  Select,
  Text,
} from 'grommet';

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
    <Box gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
      >
        <Text size="xxlarge" weight="bold">
          Sort
        </Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form value={formValues} onChange={onFormChange} method="post">
          <FormField htmlFor="sortBy__input" name="sortBy" label="Sort by">
            <Select
              id="sortBy"
              name="sortBy"
              options={sortFeatures}
              placeholder="-- Select --"
            />
          </FormField>
          <FormField
            htmlFor="sortOrder"
            name="sortOrder"
            label="Sort order"
            help="Select how results are ordered"
          >
            <RadioButtonGroup
              id="sortOrder"
              name="sortOrder"
              options={['Ascending', 'Descending']}
            />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};
