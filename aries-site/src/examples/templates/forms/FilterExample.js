import React from 'react';
import {
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Main,
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
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form value={formValues} onChange={onFormChange}>
            <FormField
              name="keyword"
              label="Keyword"
              component={TextInput}
              placeholder="server_name"
              type="email"
            />
            <FormField
              name="locationType"
              label="Location Type"
              component={Select}
              options={locationTypes}
            />
            {serverTypes && (
              <Box gap="small" margin={{ bottom: 'small' }}>
                <Text margin={{ left: 'small' }}>HPE Server Types</Text>
                {serverTypes.map(server => {
                  return <CheckBox key={server} name={server} label={server} />;
                })}
              </Box>
            )}
            {sellers && (
              <Box gap="small" margin={{ bottom: 'small' }}>
                <Text margin={{ left: 'small' }}>Seller</Text>
                {sellers.map(seller => {
                  return <CheckBox key={seller} name={seller} label={seller} />;
                })}
              </Box>
            )}
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
