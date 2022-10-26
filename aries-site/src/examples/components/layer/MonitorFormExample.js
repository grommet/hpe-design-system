import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Text,
  TextInput,
  TextArea,
  Select,
} from 'grommet';

const options = ['Any', 'None', 'Any Scheduled'];

export const MonitorFormExample = ({ sticky }) => {
  const [formValues, setFormValues] = useState({
    monitorName: 'C2 Monitor',
    desc: `Sustainable neutra echo park helvetica freegan
    forage hashtag meditation kogi activated charcoal
    pitchfork`,
    monitorType: 'Rule',
    frameworks: 'Any Scheduled',
    severity: 'Any',
    provider: 'Any',
    account: 'Any',
    ruleName: 'Any Scheduled',
    email: 'jane@hpe.com',
  });

  const onFormChange = value => {
    setFormValues(value);
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    // Having overflow set to auto is needed for the sticky header.
    <Box pad={{ horizontal: 'medium' }} overflow={sticky ? 'auto' : undefined}>
      <Form
        onSubmit={({ value, touched }) => onSubmit({ value, touched })}
        value={formValues}
        onChange={onFormChange}
        method="post"
      >
        <Box>
          <FormField
            htmlFor="monitorName"
            name="monitorName"
            label="Monitor name"
          >
            <TextInput id="monitorName" name="monitorName" />
          </FormField>
          <FormField
            htmlFor="description"
            name="desc"
            label="Bussiness description"
          >
            <TextArea id="description" name="monitorName" />
          </FormField>
          <Text
            margin={{ vertical: 'medium' }}
            weight="bold"
            color="text-strong"
          >
            Monitor detail
          </Text>
          <FormField
            htmlFor="monitorType"
            name="monitorType"
            label="Monitor type"
          >
            <TextInput id="monitorType" name="monitorType" />
          </FormField>
          <FormField htmlFor="rules" name="rules">
            <CheckBox
              id="rules"
              name="rules"
              label="Include process rules"
              toggle
              fill
              checked
              reverse
            />
          </FormField>
          <FormField htmlFor="frameworks" name="frameworks" label="Frameworks">
            <Select id="frameworks" options={options} name="frameworks" />
          </FormField>
          <FormField htmlFor="severity" name="severity" label="Rule severity">
            <Select id="severity" options={options} name="severity" />
          </FormField>
          <FormField htmlFor="provider" name="provider" label="Provider">
            <Select id="provider" options={options} name="provider" />
          </FormField>
          <FormField htmlFor="account" name="account" label="Account">
            <Select id="account" options={options} name="account" />
          </FormField>
          <FormField htmlFor="ruleName" name="ruleName" label="Rule name">
            <Select id="ruleName" options={options} name="ruleName" />
          </FormField>
          <Text
            margin={{ vertical: 'medium' }}
            weight="bold"
            color="text-strong"
          >
            Email notification
          </Text>
          <FormField htmlFor="notifications" name="notifications">
            <CheckBox
              name="notifications"
              id="notifications"
              label="Email notifications"
              toggle
              fill
              checked
              reverse
            />
          </FormField>
          <FormField htmlFor="email" name="email" label="Primary email">
            <TextInput id="email" name="email" />
          </FormField>
          <Box
            direction="row"
            gap="small"
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Add monitor" primary type="submit" />
            <Button label="Cancel" />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

MonitorFormExample.propTypes = {
  sticky: PropTypes.bool,
};
