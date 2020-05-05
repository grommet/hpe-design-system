import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  RangeInput,
  Text,
  TextInput,
} from 'grommet';

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box
        flex
        pad={{ horizontal: 'medium', vertical: 'medium' }}
        {...rest}
       />
    </Box>
  );
};

export const SettingsExample = () => {
  const [formValues, setFormValues] = React.useState({
    doNotDisturbHours: '9:00pm - 5:00am',
    notifications: true,
    notificationsVolume: 0.7,
  });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={3} margin="none">
            Settings
          </Heading>
          <Text>for HPE Service</Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <Box margin={{ bottom: 'small' }}>
              <Text color="text-weak" size="xsmall">
                Key feature
              </Text>
              <FormField
                name="notifications"
                label="Notifications"
                component={CheckBox}
                reverse
                help="Description of feature"
                toggle
              />
              <FormField
                htmlFor="notificationsVolume"
                name="notificationsVolume"
                label="Notifications Volume"
              >
                <RangeInput
                  id="notificationsVolume"
                  name="notificationsVolume"
                  max={1}
                  min={0}
                  pad
                  step={0.1}
                />
              </FormField>
            </Box>
            <Box margin={{ bottom: 'small' }}>
              <Text color="text-weak" size="xsmall">
                Key feature
              </Text>
              <FormField
                name="doNotDisturb"
                label="Do Not Disturb"
                component={CheckBox}
                help="Description of feature"
                reverse
                toggle
              />
              <FormField htmlFor="doNotDisturbHours" name="doNotDisturbHours">
                <TextInput
                  id="doNotDisturbHours"
                  name="doNotDisturbHours"
                  disabled={!formValues.doNotDisturb}
                />
              </FormField>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Apply Settings" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
