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
  recipient: 'operations@example.com',
  frequency: 'Daily',
  channel: 'Email',
  'report-delivery': '08:15',
};

export const TimeInputReportDeliveryExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [edit, setEdit] = useState(true);

  return (
    <ContentPane width={edit ? 'medium' : undefined}>
      {edit ? (
        <Box gap="medium">
          <Header direction="column" align="start" gap="5xsmall">
            <Heading level={2} margin="none">
              Schedule report
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
        </Box>
      ) : (
        <Box gap="medium">
          <Header direction="row" align="center" justify="between">
            <Heading level={2} margin="none">
              Schedule report
            </Heading>
            <Button label="Edit" onClick={() => setEdit(true)} />
          </Header>
          <Box>
            <NameValueList nameProps={{ width: 'xxsmall' }}>
              <NameValuePair name="Recipients">
                {formValue.recipient}
              </NameValuePair>
              <NameValuePair name="Frequency">
                {formValue.frequency}
              </NameValuePair>
              <NameValuePair name="Delivery channel">
                {formValue.channel}
              </NameValuePair>
              <NameValuePair name="Next run">
                {formatTime(formValue['report-delivery'])}
              </NameValuePair>
            </NameValueList>
          </Box>
        </Box>
      )}
    </ContentPane>
  );
};
