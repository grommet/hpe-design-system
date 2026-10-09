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
  service: 'Payments API',
  ticket: 'CHG-2048',
  scope: 'Service owners',
  'maintenance-start': '02:15:00', // remove seconds with latest grommet
  'maintenance-end': '03:45:00', // remove seconds with latest grommet
};

export const TimeInputMaintenanceWindowExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);

  return (
    <ContentPane width="medium">
      <Form value={formValue} onChange={setFormValue} onSubmit={() => {}}>
        <Box gap="medium">
          <>
            <FormField
              label="Affected service"
              name="service"
              htmlFor="maintenance-service"
            >
              <Select
                id="maintenance-service"
                name="service"
                options={['Payments API', 'Identity service', 'Billing portal']}
              />
            </FormField>
            <FormField
              label="Change ticket"
              name="ticket"
              htmlFor="maintenance-ticket"
            >
              <TextInput id="maintenance-ticket" name="ticket" />
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
                format="24"
                showSeconds={false}
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
                format="24"
                showSeconds={false}
              />
            </FormField>
          </>
          <Button
            alignSelf={
              !['xsmall', 'small'].includes(size) ? 'start' : undefined
            }
            label="Save maintenance window"
            primary
            type="submit"
          />
        </Box>
      </Form>
    </ContentPane>
  );
};
