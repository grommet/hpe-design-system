// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
  Select,
  TextInput,
  TimeInput,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';
import { formatTime } from './utils/formatTime';

const defaultFormValues = {
  customer: 'Avery Morgan',
  service: 'Platform consultation',
  'appointment-time': '07:30',
};

const BUSINESS_START = 8 * 60;
const BUSINESS_END = 18 * 60;

// TimeInput values are 24-hour HH:MM:SS strings.
const validateAppointmentTime = time => {
  if (!time) return 'Appointment time is required.';
  const [hour, minute] = time.split(':').map(Number);
  const minutes = hour * 60 + minute;
  if (minutes < BUSINESS_START || minutes > BUSINESS_END) {
    return 'Choose a time between 8:00 AM and 6:00 PM.';
  }
  if (minute % 30 !== 0) {
    return 'Choose a time in 30-minute intervals.';
  }
  return undefined;
};

export const TimeInputBusinessHoursExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [edit, setEdit] = useState(true);

  return (
    <ContentPane width={edit ? 'medium' : undefined}>
      {edit ? (
        <Box gap="medium">
          <Header>
            <Heading level={2} margin="none">
              Booking details
            </Heading>
          </Header>
          <Form
            value={formValue}
            onChange={setFormValue}
            onSubmit={() => setEdit(false)}
          >
            <Box gap="medium">
              <>
                <FormField
                  label="Customer"
                  name="customer"
                  htmlFor="booking-customer"
                >
                  <TextInput id="booking-customer" name="customer" />
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
                  />
                </FormField>
                <FormField
                  label="Appointment time"
                  htmlFor="appointment-time"
                  name="appointment-time"
                  info={
                    'Available Monday to Friday, 8:00 AM to 6:00 PM ' +
                    'in 30-minute intervals.'
                  }
                  validate={validateAppointmentTime}
                >
                  <TimeInput
                    id="appointment-time"
                    name="appointment-time"
                    format="12"
                    minuteStep={30}
                  />
                </FormField>
              </>
              <Button
                alignSelf={
                  !['xsmall', 'small'].includes(size) ? 'start' : undefined
                }
                label="Confirm booking"
                primary
                type="submit"
              />
            </Box>
          </Form>
        </Box>
      ) : (
        <Box gap="medium">
          <Header>
            <Heading level={2} margin="none">
              Booking details
            </Heading>
            <Button label="Edit" onClick={() => setEdit(true)} />
          </Header>
          <NameValueList nameProps={{ width: 'xxsmall' }}>
            <NameValuePair name="Customer">{formValue.customer}</NameValuePair>
            <NameValuePair name="Service">{formValue.service}</NameValuePair>
            <NameValuePair name="Appointment time">
              {formatTime(formValue['appointment-time'])}
            </NameValuePair>
          </NameValueList>
        </Box>
      )}
    </ContentPane>
  );
};
