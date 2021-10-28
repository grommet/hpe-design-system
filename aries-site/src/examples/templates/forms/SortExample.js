import React from 'react';
import {
  Box,
  Form,
  FormField,
  Header,
  Heading,
  RadioButtonGroup,
  Select,
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
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Sort
        </Heading>
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
