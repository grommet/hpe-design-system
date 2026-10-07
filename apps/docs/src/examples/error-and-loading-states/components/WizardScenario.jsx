// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Box, Button, List, Notification, Text } from 'grommet';
import { Scenario } from './Scenario';
import { CreateServerWizard } from './CreateServerWizard';

const walkthrough = [
  {
    step: 'Step 1 · Server details',
    trigger: 'Leave "Server name" empty and click Next.',
    result:
      `Client-side validation. The error is shown on each failing field,
        and a step-level summary appears so the user can see something
        is blocking them even if the field has scrolled out of view.`,
  },
  {
    step: 'Step 2 · Network',
    trigger: 'Keep the default subnet (10.0.0.0/24) and click Next.',
    result:
      `The API rejects the request and names the field. Because the error
        has a specific target, it is displayed on the "Subnet" field only.
        Editing the field clears it.`,
  },
  {
    step: 'Step 3 · Review & create',
    trigger: 'Click "Create server".',
    result:
      `The API times out. Nothing about the user's input is wrong, so the
        error is displayed at the step level as an inline notification.
        The button shows a busy state while the request is in flight.
        Retrying succeeds.`,
  },
];

export const WizardScenario = () => {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState();

  return (
    <Scenario
      id="wizard"
      tag="Wizard"
      heading={`Errors in a wizard — validate at step level, display at
        the most specific target`}
      guidance={`Treat each step like a form: the user can't advance while 
        the current step has errors. Whether the error comes from client-side 
        validation or from an API response, attach it to the most specific 
        target available. If the API points at a field, show it on that 
        field. If it doesn't, show it inline at step level, close to the 
        action that triggered it.`}
      reference={{
        label: 'Wizard validation guidance',
        href: 'https://design-system.hpe.design/templates/wizard#validation',
      }}
      actions={
        <Button label="Open wizard" primary onClick={() => setOpen(true)} />
      }
    >
      <List
        data={walkthrough}
        defaultItemProps={{ pad: { vertical: 'small' } }}
        border={{ side: 'bottom', color: 'border-weak' }}
      >
        {item => (
          <Box gap="3xsmall">
            <Text weight={500} color="text-strong">
              {item.step}
            </Text>
            <Text>
              <Text weight={500}>Try: </Text>
              {item.trigger}
            </Text>
            <Text color="text-weak">{item.result}</Text>
          </Box>
        )}
      </List>

      {open && (
        <CreateServerWizard
          onClose={() => setOpen(false)}
          onComplete={value => {
            setOpen(false);
            setCreated(value.name);
          }}
        />
      )}
      {created && (
        <Notification
          toast
          status="normal"
          title={`Server "${created}" is being created`}
          message="You'll be notified when it is ready."
          onClose={() => setCreated(undefined)}
        />
      )}
    </Scenario>
  );
};
