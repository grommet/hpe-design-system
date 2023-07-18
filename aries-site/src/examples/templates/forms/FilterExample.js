import React from 'react';
import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  TextInput,
} from 'grommet';

const locationTypes = [
  'All locations',
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
    locationType: 'All locations',
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
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Filter
        </Heading>
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
          {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField
            htmlFor="locationType__input"
            name="locationType"
            label="Location type"
          >
            <Select
              id="locationType"
              name="locationType"
              options={locationTypes}
            />
          </FormField>
          {serverTypes && (
            <FormField
              label="HPE server types"
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
          <Box direction="row-responsive" gap="medium" pad={{ top: 'medium' }}>
            <Button label="Apply filters" primary />
            <Button label="Reset filters" secondary />
            <Button label="Cancel" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
