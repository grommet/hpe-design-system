import React from 'react';
import {
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  Text,
  TextInput,
} from 'grommet';

import { FormContainer } from '.';

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
    locationType: 'All Locations',
    'Rack Servers': true,
    'Tower Servers': true,
    Amazon: true,
    Insight: true,
  });

  const applyFilters = () => {
    // Mock function to demonstrate implementation
  };

  const onFormChange = value => {
    setFormValues(value);
    applyFilters();
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
            Filter
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form value={formValues} onChange={onFormChange}>
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
              <Box gap="xsmall" margin={{ top: 'medium' }}>
                <Text color="text-weak" size="xsmall">
                  HPE Server Types
                </Text>
                <Box border gap="small" pad="xsmall" round="xsmall">
                  {serverTypes.map(server => {
                    return (
                      <CheckBox key={server} name={server} label={server} />
                    );
                  })}
                </Box>
              </Box>
            )}
            {sellers && (
              <Box gap="xsmall" margin={{ top: 'medium' }}>
                <Text color="text-weak" size="xsmall">
                  Seller
                </Text>
                <Box border gap="small" pad="xsmall" round="xsmall">
                  {sellers.map(seller => {
                    return (
                      <CheckBox key={seller} name={seller} label={seller} />
                    );
                  })}
                </Box>
              </Box>
            )}
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
