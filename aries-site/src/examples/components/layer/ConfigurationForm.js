/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  DataTable,
  Form,
  FormField,
  Heading,
  Page,
  PageContent,
  TextInput,
  CheckBoxGroup,
  AnnounceContext,
} from 'grommet';
import { LayerHeader } from 'aries-core';
import {
  useFilters,
  FiltersProvider,
  FilterControls,
} from '../../templates/FilterControls';
import applications from '../../../data/mockData/applications.json';
import {
  ConfirmationContext,
  ConfirmationProvider,
  DoubleConfirmation,
  Sidedrawer,
  useConfirmation,
} from './components';

const defaultFormValues = {
  'application-title': '',
  'publisher-title': '',
  'pricing-select': [],
  'delivery-select': [],
};

export const ConfigurationForm = () => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ showLayer, showConfirmation }) => (
        <>
          <ApplicationsPage />
          {showLayer ? <AddApplication /> : null}
          {showConfirmation ? <DoubleConfirmation title="application" /> : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

const AddApplication = ({ ...rest }) => {
  const { onClose } = useConfirmation();
  const announce = useContext(AnnounceContext);

  useEffect(() => {
    announce('Add application modal opened', 'assertive');
  }, [announce]);

  return (
    <Sidedrawer onEsc={onClose} {...rest}>
      <LayerHeader title="Add application" onClose={onClose} />
      <Box flex={false}>
        <LayerForm id="application-form" />
      </Box>
      <Box direction="row" gap="small" flex={false}>
        <Button
          form="application-form"
          label="Add application"
          primary
          type="submit"
        />
        <Button label="Cancel" onClick={onClose} />
      </Box>
    </Sidedrawer>
  );
};

export const LayerForm = ({ ...rest }) => {
  const [formValue, setFormValue] = useState(defaultFormValues);

  const { setShowLayer, setTouched } = useConfirmation();

  // setTouched to false when form dismounts
  useEffect(() => () => setTouched(false), [setTouched]);

  return (
    <Form
      onSubmit={event => {
        console.log(event.value);
        setShowLayer(false);
      }}
      messages={{
        required: 'This is a required field.',
      }}
      value={formValue}
      onChange={(nextValue, { touched }) => {
        console.log('Change', nextValue, touched);
        setFormValue(nextValue);
        setTouched(Object.keys(touched).length);
      }}
      {...rest}
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
        name="pricing"
        htmlFor="pricing"
        required
      >
        <CheckBoxGroup
          id="pricing"
          name="pricing"
          options={[
            'Annual license',
            'Free',
            'Free trial',
            'Monthly Subscription',
          ]}
        />
      </FormField>
      <FormField
        label="Delivery"
        contentProps={{ width: 'medium' }}
        name="delivery"
        htmlFor="delivery"
        required
      >
        <CheckBoxGroup
          id="delivery"
          name="delivery"
          options={['License key', 'Package manager', 'Web application']}
        />
      </FormField>
    </Form>
  );
};

const ApplicationsPage = () => {
  const { setShowLayer } = useConfirmation();
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
                  onClick={() => setShowLayer(true)}
                />
              }
            />
            <ApplicationResults />
          </Box>
        </PageContent>
      </Page>
    </FiltersProvider>
  );
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
    <Box alignSelf="start" height={height} overflow="auto">
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
