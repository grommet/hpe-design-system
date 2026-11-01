// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  NameValueList,
  NameValuePair,
  Notification,
  Text,
  ToggleGroup,
} from 'grommet';
import { Power, PowerCycle, Trash } from '@hpe-design/icons-grommet';
import { Scenario } from './Scenario';
import { ConfirmationBody, ConfirmationLayer } from './ConfirmationLayer';
import { request } from '../api';

const SERVER = 'web-prod-01';

const tiers = [
  {
    title: 'Low cost, easily reversed',
    example: 'Restart iLO',
    behavior:
      `No confirmation. Run the action immediately, show a busy state on
        the button, then confirm the outcome with a toast.`,
  },
  {
    title: 'Costly or disruptive',
    example: 'Power off',
    behavior:
      `Confirm with a center layer. Lead with the action in the title,
        state the consequence in the subtitle, and offer a clear Cancel /
        confirm pair. The layer itself is the warning, so no additional
        warning icon or styling.`,
  },
  {
    title: 'Irreversible and destructive',
    example: 'Delete server',
    behavior:
      `Double confirmation: the user types the resource name before the
        primary action is enabled, and a critical inline notification
        states the action cannot be undone.`,
  },
];

const errors = {
  restart: {
    title: `Unable to restart iLO on ${SERVER}`,
    message: 'The server did not respond. Try again in a few minutes.',
  },
  powerOff: {
    title: `Unable to power off ${SERVER}`,
    message:
      `The power command was not acknowledged by the server. No change was
        made. Try again, and if the problem persists, contact support.`,
  },
  delete: {
    title: `Unable to delete ${SERVER}`,
    message:
      `The server could not be deleted because the inventory service is
        unavailable. No change was made. Try again later.`,
  },
};

export const LayerScenario = () => {
  const [outcome, setOutcome] = useState('success');
  const [layer, setLayer] = useState();
  const [toast, setToast] = useState();
  const [restarting, setRestarting] = useState(false);

  const call = key =>
    request({ delay: 1400, outcome, error: errors[key] });

  const restart = async () => {
    setRestarting(true);
    try {
      await call('restart');
      setToast({ status: 'normal', title: `iLO restarted on ${SERVER}` });
    } catch (error) {
      // No layer is open, so the failure is reported with a critical toast
      setToast({ status: 'critical', ...error });
    } finally {
      setRestarting(false);
    }
  };

  return (
    <Scenario
      id="layer"
      tag="Layer with action"
      heading={`Confirming an action — and handling a request that fails
        after confirmation`}
      guidance={`Match the amount of confirmation to the cost of the action. 
        Displaying a confirmation layer is itself the "warning" scenario; 
        don't add extra warning icons or styling. When the request fails 
        after the user confirms, keep the layer open and show the error 
        inline so the user can retry or back out without losing context.`}
      reference={{
        label: 'Layer and double confirmation guidance',
        href: 'https://design-system.hpe.design/components/layer#closing',
      }}
      actions={
        <Box gap="3xsmall">
          <Text size="small" color="text-weak" id="layer-outcome-label">
            Simulated API response
          </Text>
          <ToggleGroup
            a11yTitle="Simulated API response"
            options={[
              { label: 'Success', value: 'success' },
              { label: 'Error', value: 'error' },
            ]}
            value={outcome}
            onToggle={({ value }) => setOutcome(value)}
          />
        </Box>
      }
    >
      <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
        {tiers.map(tier => (
          <Box key={tier.title} gap="3xsmall">
            <Text weight={500} color="text-strong">
              {tier.title}
            </Text>
            <Text size="small" color="text-weak">
              e.g. {tier.example}
            </Text>
            <Text>{tier.behavior}</Text>
          </Box>
        ))}
      </Grid>

      <Box
        border={{ color: 'border-weak' }}
        round="small"
        pad="medium"
        gap="medium"
      >
        <NameValueList>
          <NameValuePair name="Server">{SERVER}</NameValuePair>
          <NameValuePair name="Power state">On</NameValuePair>
          <NameValuePair name="Running workloads">3</NameValuePair>
        </NameValueList>
        <Box direction="row" gap="xsmall" wrap>
          <Button
            label="Restart iLO"
            icon={<PowerCycle />}
            secondary
            busy={restarting}
            onClick={restart}
          />
          <Button
            label="Power off"
            icon={<Power />}
            secondary
            onClick={() => setLayer('powerOff')}
          />
          <Button
            label="Delete server"
            icon={<Trash />}
            secondary
            onClick={() => setLayer('delete')}
          />
        </Box>
      </Box>

      {layer === 'powerOff' && (
        <ConfirmationLayer
          title={`Power off ${SERVER}?`}
          subtitle="3 running workloads will be interrupted."
          confirmLabel="Power off"
          onClose={() => setLayer(undefined)}
          onConfirm={async () => {
            await call('powerOff');
            setToast({ status: 'normal', title: `${SERVER} is powering off` });
          }}
        />
      )}

      {layer === 'delete' && (
        <ConfirmationLayer
          title={`Delete ${SERVER}?`}
          confirmLabel="Delete"
          destructive={{ match: SERVER }}
          onClose={() => setLayer(undefined)}
          onConfirm={async () => {
            await call('delete');
            setToast({ status: 'normal', title: `${SERVER} deleted` });
          }}
        >
          <ConfirmationBody>
            The server, its 3 running workloads, and all local storage will
            be permanently deleted.
          </ConfirmationBody>
        </ConfirmationLayer>
      )}

      {toast && (
        <Notification
          toast
          status={toast.status}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(undefined)}
        />
      )}
    </Scenario>
  );
};
