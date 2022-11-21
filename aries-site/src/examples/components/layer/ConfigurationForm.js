import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  DataTable,
  Form,
  FormField,
  Heading,
  Layer,
  Page,
  PageContent,
  TextInput,
  Select,
} from 'grommet';
import {
  useFilters,
  FiltersProvider,
  FilterControls,
} from '../../templates/FilterControls';
import applications from '../../../data/mockData/applications.json';

export const ConfigurationForm = ({ containerRef }) => {
  const [open, setOpen] = useState(true);

  return (
    <FiltersProvider>
      <Page>
        <PageContent>
          <Box gap="medium">
            <Heading id="applications-heading" level={2} margin="none">
              Applications
            </Heading>
            <FilterControls
              data={applications}
              filters={[]}
              primaryKey="title"
              searchFilter={{ placeholder: 'Search' }}
              actions={
                <Button
                  label="Add application"
                  secondary
                  onClick={() => setOpen(true)}
                />
              }
              layerProps={{ target: containerRef?.target }}
            />
            <ApplicationResults />
          </Box>
          {open && (
            <Layer
              target={containerRef?.current}
              position="right"
              full="vertical"
              onEsc={() => setOpen(false)}
            >
              <Box pad="medium" gap="medium" overflow="auto">
                <Heading level={2} size="small" margin="none">
                  Add application
                </Heading>
                <Box>
                  <LayerForm setOpen={setOpen} />
                </Box>
                <Box direction="row" gap="small" flex={false}>
                  <Button
                    label="Add application"
                    primary
                    type="submit"
                    form="application-form"
                  />
                  <Button label="Cancel" onClick={() => setOpen(false)} />
                </Box>
              </Box>
            </Layer>
          )}
        </PageContent>
      </Page>
    </FiltersProvider>
  );
};

ConfigurationForm.propTypes = {
  containerRef: PropTypes.object,
};

const LayerForm = ({ setOpen }) => (
  <Form
    id="application-form"
    onSubmit={event => {
      console.log(event.value);
      setOpen(false);
    }}
    messages={{
      required: 'This is a required field.',
    }}
  >
    <FormField
      label="Title"
      contentProps={{ width: 'medium' }}
      required
      name="application-title"
      htmlFor="application-title"
    >
      <TextInput id="application-title" name="application-title" />
    </FormField>
    <FormField
      label="Publisher"
      contentProps={{ width: 'medium' }}
      required
      name="publisher"
      htmlFor="publisher"
    >
      <TextInput name="publisher" id="publisher" />
    </FormField>
    <FormField
      label="Pricing"
      contentProps={{ width: 'medium' }}
      name="pricing-select"
      htmlFor="pricing-select__input"
      required
    >
      <Select
        id="pricing-select"
        name="pricing-select"
        options={[
          'Annual license',
          'Free',
          'Free trial',
          'Monthly Subscription',
        ]}
      />
    </FormField>
  </Form>
);

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const columns = [
  {
    property: 'title',
    header: 'Title',
  },
  {
    property: 'publisher',
    header: 'Publisher',
  },
  {
    property: 'pricing',
    header: 'Pricing',
  },
];

const ApplicationResults = ({ height = { max: 'medium' } }) => {
  // const breakpoint = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();

  return (
    <Box height={height} overflow="auto">
      <DataTable
        aria-describedby="applications-heading"
        data={filteredResults}
        columns={columns}
        pin
        primaryKey="title"
        sortable
        onSelect={nextSelected => setSelected(nextSelected)}
        select={selected}
      />
    </Box>
  );
};

ApplicationResults.propTypes = {
  height: PropTypes.string,
};
