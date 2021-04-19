import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  Button,
  DataTable,
  FileInput,
  Form,
  FormField,
  Layer,
  Header,
  Heading,
  Menu,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';

const data = [
  {
    service: 'Mercury',
    tenant: 'Boeing',
    requester: 'jane@boeing.com',
    quoteName: 'My_Mercury_1',
    quoteID: 'QUO_957_59',
  },
  {
    service: 'MCC',
    tenant: 'Domain',
    requester: 'roman@domain.com',
    quoteName: 'VMaas for R&D',
    quoteID: 'QUO_123_55',
  },
  {
    service: 'Mercury',
    tenant: 'Nestle',
    requester: 'klaus@nestle.com',
    quoteName: 'My_Mercury_QT_1',
    quoteID: 'QUO_128_34',
  },
  {
    service: 'HPE GLC Private',
    tenant: 'Boeing',
    requester: 'davina@boeing.com',
    quoteName: 'Gem_1',
    quoteID: 'QUO_489_39',
  },
  {
    service: 'Mercury',
    tenant: 'Boeing',
    requester: 'davina@boeing.com',
    quoteName: 'My_Mercury_QT1',
    quoteID: 'QUO_397_30',
  },
  {
    service: 'MCC',
    tenant: 'Boeing',
    requester: 'roman@boeing.com',
    quoteName: 'VMaaS for R&D',
    quoteID: 'QUO_279_27',
  },
  {
    service: 'GLMI',
    tenant: 'Boeing',
    requester: 'klaus@boeing.com',
    quoteName: 'My_Mercury_QT_1',
    quoteID: 'QUO_280_38',
  },
  {
    service: 'Mercury',
    tenant: 'Domain',
    requester: 'davina@boeing.com',
    quoteName: 'My_Mercury_QT_1',
    quoteID: 'QUO_280_38',
  },
  {
    service: 'Mercury',
    tenant: 'Boeing',
    requester: 'jane@boeing.com',
    quoteName: 'My_Mercury_1',
    quoteID: 'QUO_957_59',
  },
];

const columns = [
  {
    property: 'tenant',
    header: 'Tenant',
    render: datum => <Text truncate>{datum.tenant}</Text>,
  },
  {
    property: 'requester',
    header: 'Requester',
    render: datum => <Text truncate>{datum.requester}</Text>,
    size: 'xsmall',
  },
  {
    property: 'quoteName',
    header: 'Quote Name',
    render: datum => <Text truncate>{datum.quoteName}</Text>,
  },
  {
    property: 'quoteID',
    header: 'Quote ID',
    render: datum => <Text truncate>{datum.quoteID}</Text>,
    align: 'end',
  },
];

const States = ['Colorado', 'California', 'Texas', 'florida'];

const LayerForm = ({ setOpen }) => {
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    setOpen(false);
  };

  return (
    <Box gap="medium">
      <Box>
        <Header align="start" pad={{ horizontal: 'xxsmall' }}>
          <Box gap="xxsmall">
            <Heading level={3} margin="none">
              New Quote
            </Heading>
            <Text>
              Please fill out the form and select a file to add a new quote
            </Text>
          </Box>
          <Button icon={<Close />} onClick={() => setOpen(false)} />
        </Header>
      </Box>
      <Form
        validate="blur"
        method="post"
        onSubmit={({ value, touched }) => onSubmit({ value, touched })}
      >
        <FormField
          label="Service Name"
          htmlFor="service-name-input"
          name="serviceNameInput"
        >
          <TextInput value="Mercury" id="service-name" name="serviceName" />
        </FormField>
        <FormField
          label="Quote Name"
          htmlFor="quote-name-input"
          name="quoteNameInput"
        >
          <TextInput value="My_Mercury_QT_2" id="quote-name" name="quoteName" />
        </FormField>
        <FormField
          label="Quote ID"
          htmlFor="quote-id-input"
          name="quoteIDInput"
        >
          <TextInput value="QUO_182_$6" id="quote-id" name="quoteID" />
        </FormField>
        <FormField label="Tenant Type" htmlFor="tenant-type" name="tenantType">
          <RadioButtonGroup
            options={['Boeing', 'Domain', 'Nestle']}
            id="tenant-name"
            value="Domain"
            name="tenantName"
          />
        </FormField>
        <FormField label="State" htmlFor="state-select" name="stateSelect">
          <Select value="Colorado" options={States} id="state" name="state" />
        </FormField>
        <FormField
          label="Description (Optional)"
          htmlFor="description-textArea"
          name="Description"
        >
          <TextArea id="Description" name="Description" />
        </FormField>
        <FileInput multiple id="fileInput" name="fileInput" />
        <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
          <Button label="Submit" primary type="submit" />
        </Box>
      </Form>
    </Box>
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const ActionsMenu = styled(Menu)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
`;

export const FileInputMultipeExample = () => {
  const size = React.useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(undefined);

  return (
    <>
      <Heading level={3} margin="none">
        Quotes
      </Heading>
      <Box
        direction="row"
        fill="horizontal"
        justify="end"
        pad={{ vertical: 'small' }}
      >
        <ActionsMenu
          label="Actions"
          items={[
            {
              label: 'Add New Quote',
              onClick: () => {
                setOpen(true);
              },
            },
          ]}
        />
      </Box>
      <Box height={{ max: 'large' }} overflow="auto">
        <DataTable
          data={data}
          columns={[
            { property: 'service', header: 'Service', pin: size === 'small' },
            ...columns,
          ]}
          pin={size === 'small'}
        />
      </Box>
      {open && (
        <Layer
          position="right"
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={size !== 'small' ? 'medium' : undefined}
            pad="medium"
          >
            <LayerForm setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};
