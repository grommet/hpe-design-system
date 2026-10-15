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
  service: 'Payments API',
  ticket: 'CHG-2048',
  scope: 'Service owners',
  'maintenance-start': '02:15',
  'maintenance-end': '03:45',
};

export const TimeInputMaintenanceWindowExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [edit, setEdit] = useState(true);

  return (
    <ContentPane width={edit ? 'medium' : undefined}>
      {edit ? (
        <Box gap="medium">
          <Header direction="column" align="start" gap="5xsmall">
            <Heading level={2} margin="none">
              Maintenance window
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
                  label="Affected service"
                  name="service"
                  htmlFor="maintenance-service"
                >
                  <Select
                    id="maintenance-service"
                    name="service"
                    options={[
                      'Payments API',
                      'Identity service',
                      'Billing portal',
                    ]}
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
                    options={[
                      'Service owners',
                      'On-call team',
                      'All stakeholders',
                    ]}
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
        </Box>
      ) : (
        <Box gap="medium">
          <Header direction="row" align="center" justify="between">
            <Heading level={2} margin="none">
              Maintenance window
            </Heading>
            <Button label="Edit" onClick={() => setEdit(true)} />
          </Header>
          <Box>
            <NameValueList nameProps={{ width: 'xsmall' }}>
              <NameValuePair name="Service">{formValue.service}</NameValuePair>
              <NameValuePair name="Ticket">{formValue.ticket}</NameValuePair>
              <NameValuePair name="Notification scope">
                {formValue.scope}
              </NameValuePair>
              <NameValuePair name="Maintenance starts">
                {formatTime(formValue['maintenance-start'], '24')}
              </NameValuePair>
              <NameValuePair name="Maintenance ends">
                {formatTime(formValue['maintenance-end'], '24')}
              </NameValuePair>
            </NameValueList>
          </Box>
        </Box>
      )}
    </ContentPane>
  );
};
