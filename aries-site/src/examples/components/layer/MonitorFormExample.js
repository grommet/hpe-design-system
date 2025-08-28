import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  TextInput,
  TextArea,
  Select,
} from 'grommet';
import { TextEmphasis } from 'aries-core';
import { useConfirmation } from './components';

const options = ['Any', 'None', 'Any Scheduled'];

export const MonitorFormExample = ({ sticky }) => {
  const [formValues, setFormValues] = useState({
    monitorName: 'C2 Monitor',
    // disabling max-len to ensure a new line isn't added in the
    // textarea in browser
    // eslint-disable-next-line max-len
    desc: 'Sustainable neutra echo park helvetica freegan forage hashtag meditation kogi activated charcoal pitchfork',
    monitorType: 'Rule',
    frameworks: 'Any Scheduled',
    severity: 'Any',
    provider: 'Any',
    account: 'Any',
    ruleName: 'Any Scheduled',
    email: 'jane@hpe.com',
  });

  const { setTouched, onClose } = useConfirmation();

  const onFormChange = (value, { touched }) => {
    setFormValues(value);
    setTouched(Object.keys(touched).length);
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    onClose();
  };

  const contentProps = { width: 'medium' };

  return (
    // Having overflow set to auto is needed for the sticky header.
    <Box
      pad={{ horizontal: 'medium', bottom: 'medium' }}
      flex={sticky === true ? undefined : false}
      overflow={sticky === true ? 'auto' : undefined}
    >
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
            contentProps={contentProps}
          >
            <TextInput id="monitorName" name="monitorName" />
          </FormField>
          <FormField
            htmlFor="description"
            name="desc"
            label="Business description"
            contentProps={contentProps}
          >
            <TextArea id="description" name="desc" />
          </FormField>
          <TextEmphasis margin={{ vertical: 'medium' }}>
            Monitor detail
          </TextEmphasis>
          <FormField
            htmlFor="monitorType"
            name="monitorType"
            label="Monitor type"
            contentProps={contentProps}
          >
            <TextInput id="monitorType" name="monitorType" />
          </FormField>
          <FormField htmlFor="rules" name="rules" contentProps={contentProps}>
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
          <FormField
            htmlFor="frameworks"
            name="frameworks"
            label="Frameworks"
            contentProps={contentProps}
          >
            <Select id="frameworks" options={options} name="frameworks" />
          </FormField>
          <FormField
            htmlFor="severity"
            name="severity"
            label="Rule severity"
            contentProps={contentProps}
          >
            <Select id="severity" options={options} name="severity" />
          </FormField>
          <FormField
            htmlFor="provider"
            name="provider"
            label="Provider"
            contentProps={contentProps}
          >
            <Select id="provider" options={options} name="provider" />
          </FormField>
          <FormField
            htmlFor="account"
            name="account"
            label="Account"
            contentProps={contentProps}
          >
            <Select id="account" options={options} name="account" />
          </FormField>
          <FormField
            htmlFor="ruleName"
            name="ruleName"
            label="Rule name"
            contentProps={contentProps}
          >
            <Select id="ruleName" options={options} name="ruleName" />
          </FormField>
          <TextEmphasis margin={{ vertical: 'medium' }}>
            Email notification
          </TextEmphasis>
          <FormField
            htmlFor="notifications"
            name="notifications"
            contentProps={contentProps}
          >
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
          <FormField
            htmlFor="email"
            name="email"
            label="Primary email"
            contentProps={contentProps}
          >
            <TextInput id="email" name="email" />
          </FormField>
          <Box direction="row" gap='xsmall' pad={{ top: 'medium' }}>
            <Button label="Add monitor" primary type="submit" />
            <Button label="Cancel" onClick={onClose} />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

MonitorFormExample.propTypes = {
  sticky: PropTypes.bool,
};
