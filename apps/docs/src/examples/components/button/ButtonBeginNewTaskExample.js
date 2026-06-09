import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AnnounceContext,
  Box,
  Button,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Form,
  FormField,
  Heading,
  Select,
  Toolbar,
  TextInput,
  Page,
  PageContent,
} from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import devices from '../../../data/mockData/devices.json';
import {
  ConfirmationContext,
  ConfirmationProvider,
  DoubleConfirmation,
  Sidedrawer,
  useConfirmation,
} from '../layer/components';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const ButtonBeginNewTaskExample = () => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ showLayer, showConfirmation }) => (
        <>
          <DevicesPage />
          {showLayer ? <AddDevices /> : null}
          {showConfirmation ? <DoubleConfirmation title="devices" /> : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

const AddDevices = ({ ...rest }) => {
  const { onClose } = useConfirmation();
  const announce = useContext(AnnounceContext);

  useEffect(() => {
    announce('Add devices modal opened', 'assertive');
  }, [announce]);

  return (
    <Sidedrawer onEsc={onClose} {...rest}>
      <LayerHeader title="Add devices" onClose={onClose} />
      <LayerForm id="devices-form" onClose={onClose} />
    </Sidedrawer>
  );
};


const columns = [
  { header: 'Name', primary: true, property: 'name' },
  { header: 'Type', property: 'type' },
  { header: 'Status', property: 'status' },
];

const DevicesPage = () => {
  const { setShowLayer } = useConfirmation();
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <ContentPane gap="medium">
          <Heading id="devices-heading" level={2} margin="none">
            Devices
          </Heading>
          <Data data={devices}>
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Box flex />
              <Button
                label="Create device"
                onClick={() => setShowLayer(true)}
                secondary
              />
            </Toolbar>
            <DataSummary />
            <Box height={{ max: 'medium' }} alignSelf="start" overflow="auto">
              <DataTable
                aria-describedby="devices-heading" columns={columns} />
            </Box>
          </Data>
        </ContentPane>
      </PageContent>
    </Page>
  );
};

const defaultFormValues = {
  'device-name': '',
  'device-type': '',
  'device-status': '',
};

const LayerForm = ({ onClose, ...rest }) => {
  const [formValue, setFormValue] = useState(defaultFormValues);
  const { setShowLayer, setTouched } = useConfirmation();

  // setTouched to false when form dismounts
  useEffect(() => () => setTouched(false), [setTouched]);

  return (
    <Form
      onSubmit={() => {
        setShowLayer(false);
      }}
      messages={{
        required: 'This is a required field.',
      }}
      value={formValue}
      onChange={(nextValue, { touched }) => {
        setFormValue(nextValue);
        setTouched(Object.keys(touched).length);
      }}
      {...rest}
    >
      <FormField
        label="Device name"
        contentProps={{ width: 'medium' }}
        name="device-name"
        htmlFor="device-name"
        required
      >
        <TextInput
          id="device-name"
          name="device-name"
          placeholder="e.g. web-server-04"
        />
      </FormField>
      <FormField
        label="Type"
        name="device-type"
        htmlFor="device-type"
        required
      >
        <Select
          id="device-type"
          name="device-type"
          options={['Server', 'Database', 'Proxy']}
          placeholder="Select type"
        />
      </FormField>
      <FormField
        label="Status"
        name="device-status"
        htmlFor="device-status"
        required
      >
        <Select
          id="device-status"
          name="device-status"
          options={['Active', 'Inactive']}
          placeholder="Select status"
        />
      </FormField>
      <Box
        direction="row"
        gap="xsmall"
        flex={false}
        margin={{ top: 'medium' }}
      >
        <Button
          label="Create device"
          primary
          type="submit"
        />
        <Button
          label="Cancel"
          onClick={onClose}
        />
      </Box>
    </Form>
  );
};

LayerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
