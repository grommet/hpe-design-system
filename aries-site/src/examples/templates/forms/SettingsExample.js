import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  RangeInput,
  Text,
  TextInput,
} from 'grommet';

import { FormContainer } from '.';

export const SettingsExample = () => {
  const [formValues, setFormValues] = React.useState({
    doNotDisturbHours: '9:00am - 5:00pm',
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
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <Box margin={{ bottom: 'small' }}>
              <Text margin={{ left: 'small' }}>Key feature</Text>
              <Text margin={{ left: 'small' }} color="text-xweak">
                Description of feature
              </Text>
              <FormField
                name="notifications"
                label="Notifications"
                component={CheckBox}
                reverse
                toggle
              />
              <FormField
                name="notificationsVolume"
                label="Notifications Volume"
                component={RangeInput}
                max={1}
                min={0}
                pad
                step={0.1}
              />
            </Box>
            <Box margin={{ bottom: 'small' }}>
              <Text margin={{ left: 'small' }}>Key feature</Text>
              <Text margin={{ left: 'small' }} color="text-xweak">
                Description of feature
              </Text>
              <FormField
                name="doNotDisturb"
                label="Do Not Disturb"
                component={CheckBox}
                reverse
                toggle
              />
              <FormField
                name="doNotDisturbHours"
                component={TextInput}
                disabled
              />
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Apply Settings" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
