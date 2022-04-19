import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
  TextInput,
  TextArea,
  Select,
} from 'grommet';

const options = ['Any', 'None', 'Any Scheduled'];

export const LayerStickyFormExample = () => {
  const [formValues, setFormValues] = React.useState({
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
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const onFormChange = value => {
    setFormValues(value);
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };
  return (
    <>
      <Box align="start">
        <Button label="Show me the Layer" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer
          position="right"
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
          >
            <Header
              background="background"
              sticky="scrollup"
              pad={{ top: 'medium', horizontal: 'small' }}
            >
              <Heading margin="none" level={2} size="small">
                Add Monitor
              </Heading>
            </Header>
            <Box
              // Padding used to prevent focus from being cutoff
              pad={{ vertical: 'medium', horizontal: 'small' }}
            >
              <Form
                onSubmit={({ value, touched }) => onSubmit({ value, touched })}
                value={formValues}
                onChange={onFormChange}
                method="post"
              >
                <Box margin={{ bottom: 'small' }}>
                  <FormField name="monitorName" label="Monitor Name">
                    <TextInput name="monitorName" />
                  </FormField>
                  <FormField name="desc" label="Bussiness Description">
                    <TextArea name="monitorName" />
                  </FormField>
                  <Text
                    margin={{ vertical: 'medium' }}
                    weight="bold"
                    color="text-strong"
                  >
                    Monitor Detail
                  </Text>
                  <FormField name="monitorType" label="Monitor Type">
                    <TextInput name="monitorType" />
                  </FormField>
                  <FormField name="rules">
                    <CheckBox
                      name="rules"
                      label="Include Process Rules"
                      toggle
                      fill
                      checked
                      reverse
                    />
                  </FormField>
                  <FormField name="frameworks" label="Frameworks">
                    <Select options={options} name="frameworks" />
                  </FormField>
                  <FormField name="severity" label="Rule Severity">
                    <Select options={options} name="severity" />
                  </FormField>
                  <FormField name="provider" label="Provider">
                    <Select options={options} name="provider" />
                  </FormField>
                  <FormField name="account" label="Account">
                    <Select options={options} name="account" />
                  </FormField>
                  <FormField name="ruleName" label="Rule Name">
                    <Select options={options} name="ruleName" />
                  </FormField>
                  <Text
                    margin={{ vertical: 'medium' }}
                    weight="bold"
                    color="text-strong"
                  >
                    Email Notification
                  </Text>
                  <FormField name="notifications">
                    <CheckBox
                      name="notifications"
                      label="Email Notifications"
                      toggle
                      fill
                      checked
                      reverse
                    />
                  </FormField>
                  <FormField name="email" label="Primary Email">
                    <TextInput name="email" />
                  </FormField>
                </Box>
                <Box>
                  <Box
                    direction="row"
                    gap="small"
                    align={
                      !['xsmall', 'small'].includes(size) ? 'start' : undefined
                    }
                    margin={{ top: 'small', bottom: 'small' }}
                  >
                    <Button label="Apply Settings" primary type="submit" />
                    <Button label="Cancel" onClick={() => setOpen(false)} />
                  </Box>
                </Box>
              </Form>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
