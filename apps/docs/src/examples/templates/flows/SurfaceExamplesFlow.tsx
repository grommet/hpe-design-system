// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Notification, Paragraph } from 'grommet';
import { OverviewDashboard } from '../dashboards/OverviewDashboard';
import { DevicesCollection } from '../data-collections/DevicesCollection';
import { SubscriptionDetails } from '../data-collections/SubscriptionDetails';
import type { Device } from '../data-collections/content/devices/data';
import { AddResourceWizard } from '../wizard/AddResourceWizard';
import {
  getLabel,
  resourceTypes,
  type ResourceFormValues,
} from '../wizard/content/add-resource/data';
import { getDeviceSubscription } from './deviceSubscriptions';

type Screen = 'Home' | 'Devices' | 'Subscription';

export const SurfaceExamplesFlow = () => {
  const [screen, setScreen] = useState<Screen>('Home');
  const [device, setDevice] = useState<Device>();
  const [adding, setAdding] = useState(false);
  const [completion, setCompletion] = useState<ResourceFormValues>();
  const regionRef = useRef<HTMLDivElement>(null);
  const details = useMemo(
    () => (device ? getDeviceSubscription(device) : undefined),
    [device],
  );
  const addResource = () => {
    setCompletion(undefined);
    setAdding(true);
  };

  useEffect(() => {
    regionRef.current?.focus();
    window.scrollTo({ top: 0 });
  }, [screen, adding]);

  return (
    <Box
      ref={regionRef}
      role="region"
      aria-label={adding ? 'Add resource' : screen}
      tabIndex={-1}
    >
      {adding ? (
        <Box height="100vh">
          <AddResourceWizard
            onCancel={() => setAdding(false)}
            onComplete={value => {
              setCompletion(value);
              setAdding(false);
            }}
          />
        </Box>
      ) : (
        <>
          {screen === 'Home' && (
            <OverviewDashboard onOpenDevices={() => setScreen('Devices')} />
          )}
          {screen === 'Devices' && (
            <DevicesCollection
              onHome={() => setScreen('Home')}
              onAddResource={addResource}
              onOpenSubscription={selected => {
                setDevice(selected);
                setScreen('Subscription');
              }}
            />
          )}
          {screen === 'Subscription' && device && details && (
            <SubscriptionDetails
              {...details}
              selectedDeviceLabel={`${device.serialNumber} (${device.name})`}
              onBack={() => setScreen('Devices')}
              onHome={() => setScreen('Home')}
              onAddResource={addResource}
              assistantContent={
                <Paragraph margin="none">
                  Viewing the demo subscription for device{' '}
                  {device.serialNumber} at {device.location}. The subscribed
                  devices below use the
                  same identities as the Devices collection. This flow uses
                  synthetic subscription groups, not live account data.
                </Paragraph>
              }
            />
          )}
        </>
      )}
      {!adding && completion && (
        <Notification
          toast={{ autoClose: false }}
          status="normal"
          title="Resources added (demo)"
          message={[
            completion.resources.length,
            'resources configured as',
            getLabel(resourceTypes, completion.resourceType).toLowerCase(),
            `in ${completion.region}.`,
            'No live resources were provisioned.',
          ].join(' ')}
          onClose={() => setCompletion(undefined)}
        />
      )}
    </Box>
  );
};
