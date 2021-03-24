import React from 'react';
import {
  Box,
  CheckBoxGroup,
  Form,
  FormField,
  Header,
  Select,
  Text,
  TextInput,
} from 'grommet';

const locationTypes = [
  'All Locations',
  'EU-East',
  'EU-West',
  'NA-Central',
  'NA-East',
  'NA-West',
];

const sellers = ['Amazon', 'Insight', 'Tiger Direct', 'CDW'];

const serverTypes = [
  'Rack Servers',
  'Tower Servers',
  'Composable Systems',
  'Hyper Converged Systems',
  'Blade Infrastructure',
];

export const FilterExample = () => {
  const [formValues, setFormValues] = React.useState({
    keyword: '',
    locationType: 'All Locations',
    'server-types': ['Rack Servers', 'Tower Servers'],
    sellers: ['Amazon', 'Insight'],
  });

  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };

  const onFormChange = value => {
    setFormValues(value);
    applyFilters();
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
          Filter
        </Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form value={formValues} onChange={onFormChange} method="post">
          <FormField htmlFor="keyword" name="keyword" label="Keyword">
            <TextInput
              id="keyword"
              name="keyword"
              component={TextInput}
              placeholder="server_name"
            />
          </FormField>
          <FormField
            htmlFor="locationType__input"
            name="locationType"
            label="Location Type"
          >
            <Select
              id="locationType"
              name="locationType"
              options={locationTypes}
            />
          </FormField>
          {serverTypes && (
            <FormField
              label="HPE Server Types"
              htmlFor="server-types"
              name="server-types"
            >
              <CheckBoxGroup
                options={serverTypes}
                id="server-types"
                name="server-types"
              />
            </FormField>
          )}
          {sellers && (
            <FormField label="Seller" htmlFor="sellers" name="sellers">
              <CheckBoxGroup options={sellers} id="sellers" name="sellers" />
            </FormField>
          )}
        </Form>
      </Box>
    </Box>
  );
};
