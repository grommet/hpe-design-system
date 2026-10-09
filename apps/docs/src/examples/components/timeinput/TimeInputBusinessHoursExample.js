// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  Select,
  TextInput,
  TimeInput,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

const defaultFormValues = {
  customer: 'Avery Morgan',
  service: 'Platform consultation',
  'business-hours': '07:30:00', // remove seconds with latest grommet
};

const BUSINESS_START = 8 * 60;
const BUSINESS_END = 18 * 60;

// TimeInput values are 24-hour HH:MM:SS strings.
const validateBusinessHours = time => {
  if (!time) return 'Appointment time is required.';
  const [hour, minute] = time.split(':').map(Number);
  const minutes = hour * 60 + minute;
  if (minutes < BUSINESS_START || minutes > BUSINESS_END) {
    return 'Choose a time between 8:00 AM and 6:00 PM.';
  }
  return undefined;
};

export const TimeInputBusinessHoursExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);

  return (
    <ContentPane width="medium">
      <Form value={formValue} onChange={setFormValue} onSubmit={() => {}}>
        <Box gap="medium">
          <>
            <FormField
              label="Customer"
              name="customer"
              htmlFor="booking-customer"
            >
              <TextInput id="booking-customer" name="customer" />
            </FormField>
            <FormField label="Service" name="service" htmlFor="booking-service">
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
              htmlFor="business-hours"
              name="business-hours"
              info={
                'Available Monday to Friday, 8:00 AM to 6:00 PM ' +
                'in 30-minute intervals.'
              }
              validate={validateBusinessHours}
            >
              <TimeInput
                id="business-hours"
                name="business-hours"
                format="12"
                showSeconds={false}
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
    </ContentPane>
  );
};
