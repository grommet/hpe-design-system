import React from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  CheckBox,
  FormField,
  Text,
} from 'grommet';

export const AccordionOrganizingReferenceContentExample = () => (
  <Box width="large" pad="small">
    <Accordion>
      <AccordionPanel label="Notifications">
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }} gap="xsmall">
          <FormField name="email-alerts" htmlFor="email-alerts">
            <CheckBox
              id="email-alerts"
              name="email-alerts"
              label="Email alerts"
              defaultChecked
            />
          </FormField>
          <FormField name="sms-alerts" htmlFor="sms-alerts">
            <CheckBox
              id="sms-alerts"
              name="sms-alerts"
              label="SMS alerts"
            />
          </FormField>
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Security">
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }} gap="xsmall">
          <FormField name="mfa" htmlFor="mfa">
            <CheckBox
              id="mfa"
              name="mfa"
              label="Require multi-factor authentication"
              defaultChecked
            />
          </FormField>
          <FormField name="session-timeout" htmlFor="session-timeout">
            <CheckBox
              id="session-timeout"
              name="session-timeout"
              label="Auto sign out after 30 minutes of inactivity"
            />
          </FormField>
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Display">
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }} gap="xsmall">
          <FormField name="dark-mode" htmlFor="dark-mode">
            <CheckBox
              id="dark-mode"
              name="dark-mode"
              label="Dark mode"
              toggle
            />
          </FormField>
          <FormField name="compact" htmlFor="compact">
            <CheckBox
              id="compact"
              name="compact"
              label="Compact layout"
              toggle
            />
          </FormField>
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Data & Privacy">
        <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <Text>
            Manage data retention, export your data, or request account
            deletion from this section.
          </Text>
        </Box>
      </AccordionPanel>
    </Accordion>
  </Box>
);
