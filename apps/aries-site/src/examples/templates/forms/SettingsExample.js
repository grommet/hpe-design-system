import React, { useContext } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  RangeInput,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const SettingsExample = () => {
  const [formValues, setFormValues] = React.useState({
    doNotDisturbHours: '9:00pm - 5:00am',
    notifications: true,
    notificationsVolume: 0.7,
  });
  const size = useContext(ResponsiveContext);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <ContentPane gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="5xsmall"
        pad={{ horizontal: '5xsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Settings
        </Heading>
        <Text>for HPE Service</Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: '5xsmall' }}
      >
        <Form
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <Box margin={{ bottom: 'xsmall' }}>
            <FormField
              name="notifications"
              htmlFor="notifications"
              label="Key feature"
              help="Description of feature"
            >
              <CheckBox
                id="notifications"
                name="notifications"
                label="Notifications"
                toggle
                reverse
              />
            </FormField>
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
          <Box>
            <FormField
              name="doNotDisturb"
              htmlFor="doNotDisturb"
              label="Key feature"
              help="Description of feature"
            >
              <CheckBox
                id="doNotDisturb"
                name="doNotDisturb"
                label="Do not disturb"
                reverse
                toggle
              />
            </FormField>
            <FormField
              htmlFor="doNotDisturbHours"
              name="doNotDisturbHours"
              label="Do not disturb hours"
              disabled={!formValues.doNotDisturb}
            >
              <TextInput
                id="doNotDisturbHours"
                name="doNotDisturbHours"
                disabled={!formValues.doNotDisturb}
              />
            </FormField>
            <Box
              align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
              margin={{ top: 'xsmall', bottom: 'xsmall' }}
            >
              <Button label="Apply settings" primary type="submit" />
            </Box>
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
