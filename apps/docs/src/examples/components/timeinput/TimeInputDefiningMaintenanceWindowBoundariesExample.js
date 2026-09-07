// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  NameValueList,
  NameValuePair,
  Select,
  TextInput,
  TimeInput,
} from 'grommet';

export const TimeInputDefiningMaintenanceWindowBoundariesExample = () => {
  const [value, setValue] = React.useState({
    service: 'Payments API',
    ticket: 'CHG-2048',
    scope: 'Service owners',
    start: '02:15',
    end: '03:45',
  });
  const [saved, setSaved] = React.useState(false);

  const updateValue = name => event => {
    setValue({ ...value, [name]: event.value || event.target?.value || '' });
    setSaved(false);
  };

  return (
    <Box gap="small" width="medium">
      {!saved && (
        <Form>
        <FormField
          label="Affected service"
          name="service"
          htmlFor="maintenance-service"
        >
          <Select
            id="maintenance-service"
            name="service"
            options={['Payments API', 'Identity service', 'Billing portal']}
            value={value.service}
            onChange={updateValue('service')}
          />
        </FormField>
        <FormField
          label="Change ticket"
          name="ticket"
          htmlFor="maintenance-ticket"
        >
          <TextInput
            id="maintenance-ticket"
            name="ticket"
            value={value.ticket}
            onChange={updateValue('ticket')}
          />
        </FormField>
        <FormField
          label="Notification scope"
          name="scope"
          htmlFor="maintenance-scope"
        >
          <Select
            id="maintenance-scope"
            name="scope"
            options={['Service owners', 'On-call team', 'All stakeholders']}
            value={value.scope}
            onChange={updateValue('scope')}
          />
        </FormField>
        <FormField
          label="Maintenance starts"
          htmlFor="maintenance-start"
          name="maintenance-start"
        >
          <TimeInput
            id="maintenance-start"
            name="maintenance-start"
            value={value.start}
            format="24"
            showSeconds={false}
            onChange={updateValue('start')}
          />
        </FormField>
        <FormField
          label="Maintenance ends"
          htmlFor="maintenance-end"
          name="maintenance-end"
        >
          <TimeInput
            id="maintenance-end"
            name="maintenance-end"
            value={value.end}
            format="24"
            showSeconds={false}
            onChange={updateValue('end')}
          />
        </FormField>
        <Button
          label="Save maintenance window"
          primary
          onClick={() => setSaved(true)}
        />
        </Form>
      )}
      {saved && (
        <NameValueList nameProps={{ width: 'small' }}>
          <NameValuePair name="Affected service">
            {value.service}
          </NameValuePair>
          <NameValuePair name="Change ticket">{value.ticket}</NameValuePair>
          <NameValuePair name="Notification scope">
            {value.scope}
          </NameValuePair>
          <NameValuePair name="Maintenance window">
            {value.start} to {value.end}
          </NameValuePair>
        </NameValueList>
      )}
    </Box>
  );
};
