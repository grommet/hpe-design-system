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
  recipient: 'operations@example.com',
  frequency: 'Daily',
  channel: 'Email',
  'report-delivery': '08:15:00',
};

export const TimeInputReportDeliveryExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);

  return (
    <ContentPane width="medium">
      <Form value={formValue} onChange={setFormValue} onSubmit={() => {}}>
        <Box gap="medium">
          <>
            <FormField
              label="Recipients"
              name="recipient"
              htmlFor="report-recipient"
            >
              <TextInput id="report-recipient" name="recipient" />
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
                format="12"
                showSeconds={false}
                minuteStep={15}
              />
            </FormField>
          </>
          <Button
            alignSelf={
              !['xsmall', 'small'].includes(size) ? 'start' : undefined
            }
            label="Save report schedule"
            primary
            type="submit"
          />
        </Box>
      </Form>
    </ContentPane>
  );
};
