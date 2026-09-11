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

export const TimeInputSettingReportDeliveryTimesExample = () => {
  const [value, setValue] = React.useState({
    recipient: 'operations@example.com',
    frequency: 'Daily',
    channel: 'Email',
    time: '08:15',
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
          label="Recipients"
          name="recipient"
          htmlFor="report-recipient"
        >
          <TextInput
            id="report-recipient"
            name="recipient"
            value={value.recipient}
            onChange={updateValue('recipient')}
          />
        </FormField>
        <FormField
          label="Frequency"
          name="frequency"
          htmlFor="report-frequency"
        >
          <Select
            id="report-frequency"
            name="frequency"
            options={['Daily', 'Weekly', 'Monthly']}
            value={value.frequency}
            onChange={updateValue('frequency')}
          />
        </FormField>
        <FormField
          label="Delivery channel"
          name="channel"
          htmlFor="report-channel"
        >
          <Select
            id="report-channel"
            name="channel"
            options={['Email', 'Slack', 'Storage']}
            value={value.channel}
            onChange={updateValue('channel')}
          />
        </FormField>
        <FormField
          label="Daily delivery time"
          htmlFor="report-delivery"
          name="report-delivery"
        >
          <TimeInput
            id="report-delivery"
            name="report-delivery"
            value={value.time}
            format="12"
            showSeconds={false}
            minuteStep={15}
            onChange={event => {
              setValue({ ...value, time: event.value || '' });
              setSaved(false);
            }}
          />
        </FormField>
        <Button
          label="Save report schedule"
          primary
          onClick={() => setSaved(true)}
        />
        </Form>
      )}
      {saved && (
        <NameValueList nameProps={{ width: 'small' }}>
          <NameValuePair name="Recipients">
            {value.recipient}
          </NameValuePair>
          <NameValuePair name="Frequency">{value.frequency}</NameValuePair>
          <NameValuePair name="Delivery channel">
            {value.channel}
          </NameValuePair>
          <NameValuePair name="Next run">{value.time}</NameValuePair>
        </NameValueList>
      )}
    </Box>
  );
};
