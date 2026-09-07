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

const businessHoursInfo =
  'Available Monday to Friday, 8:00 AM to 6:00 PM in 30-minute intervals.';

export const TimeInputConstrainingSelectionToBusinessHoursExample = () => {
  const [value, setValue] = React.useState({
    customer: 'Avery Morgan',
    service: 'Platform consultation',
    time: '10:30 AM',
  });
  const [error, setError] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);

  const parseTime = time => {
    const match = time?.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
    if (!match) return undefined;
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    if (match[3] === 'PM' && hour !== 12) hour += 12;
    if (match[3] === 'AM' && hour === 12) hour = 0;
    return hour * 60 + minute;
  };

  const validateTime = time => {
    const minutes = parseTime(time);
    if (minutes === undefined || minutes < 480 || minutes > 1080) {
      return 'Choose a time between 8:00 AM and 6:00 PM.';
    }
    return '';
  };

  const updateValue = name => event => {
    const nextValue = event.value || event.target?.value || '';
    setValue({ ...value, [name]: nextValue });
    if (name === 'time') setError(validateTime(nextValue));
    setConfirmed(false);
  };

  const confirmBooking = () => {
    const nextError = validateTime(value.time);
    setError(nextError);
    setConfirmed(!nextError);
  };

  return (
    <Box gap="small" width="medium">
      {!confirmed && (
        <Form>
        <FormField
          label="Customer"
          name="customer"
          htmlFor="booking-customer"
        >
          <TextInput
            id="booking-customer"
            name="customer"
            value={value.customer}
            onChange={updateValue('customer')}
          />
        </FormField>
        <FormField
          label="Service"
          name="service"
          htmlFor="booking-service"
        >
          <Select
            id="booking-service"
            name="service"
            options={[
              'Platform consultation',
              'Architecture review',
              'Support session',
            ]}
            value={value.service}
            onChange={updateValue('service')}
          />
        </FormField>
        <FormField
          label="Appointment time"
          htmlFor="business-hours"
          name="business-hours"
          info={businessHoursInfo}
          error={error}
        >
          <TimeInput
            id="business-hours"
            name="business-hours"
            value={value.time}
            format="12"
            showSeconds={false}
            minuteStep={30}
            onChange={updateValue('time')}
          />
        </FormField>
        <Button label="Confirm booking" primary onClick={confirmBooking} />
        </Form>
      )}
      {confirmed && (
        <NameValueList nameProps={{ width: 'small' }}>
          <NameValuePair name="Customer">{value.customer}</NameValuePair>
          <NameValuePair name="Service">{value.service}</NameValuePair>
          <NameValuePair name="Appointment time">
            {value.time}
          </NameValuePair>
        </NameValueList>
      )}
    </Box>
  );
};
