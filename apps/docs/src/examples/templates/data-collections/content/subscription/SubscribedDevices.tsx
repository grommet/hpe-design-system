// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { MouseEvent } from 'react';
import {
  Anchor,
  Box,
  Button,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  type DataProps,
  Heading,
  List,
  Pagination,
  Text,
  Toolbar,
} from 'grommet';
// @ts-expect-error Grommet omits this runtime export from its declarations.
import { DataContext } from 'grommet';
import { Search, StatusCritical } from '@hpe-design/icons-grommet';
import { EmptyState } from '@shared/aries-core';
import {
  devices,
  type SubscribedDevice,
  supportStatuses,
  type SupportStatus as SupportStatusValue,
} from './data';

type DataView = Record<string, unknown>;

type DataContextValue = {
  clearFilters: () => void;
  filteredTotal: number;
  onView: (view: DataView) => void;
  total: number;
  view: DataView;
};

const headingId = 'subscribed-devices-heading';
const searchId = 'subscribed-devices-search';

// In an application this would navigate to the device's detail page.
const openDevice = (event: MouseEvent) => event.preventDefault();

// Searchable properties. Those without `filter: false` also appear, in
// this order, in the filters layer.
const properties: Exclude<
  NonNullable<DataProps['properties']>,
  string[]
> = {
  serialNumber: { label: 'Serial number', filter: false },
  model: { label: 'Model' },
  type: { label: 'Type' },
  location: { label: 'Location' },
  support: { label: 'Support', options: [...supportStatuses] },
};

// Status Indicator pattern: a semantic icon paired with a visible label so
// the status is understandable without color perception. Supported devices
// carry no indicator, as in the design.
const SupportStatus = ({ status }: { status: SupportStatusValue }) =>
  status === supportStatuses[0] ? (
    <Box direction="row" align="center" gap="3xsmall" flex={false}>
      <StatusCritical color="icon-critical" aria-hidden />
      <Text>{status}</Text>
    </Box>
  ) : null;

// Shown when search or filters match no devices.
const NoDevicesFound = () => {
  const { clearFilters, onView, view }: DataContextValue =
    useContext(DataContext);

  // clearFilters resets the filter badge but leaves the search term, and
  // its view update is overridden by the onView call below.
  const clear = () => {
    const nextView = { ...view };
    ['properties', 'search', 'page'].forEach(key => {
      delete nextView[key];
    });
    clearFilters();
    onView(nextView);
    // The button unmounts once results return, so move focus first.
    (
      document.getElementById(searchId) ?? document.getElementById(headingId)
    )?.focus();
  };

  return (
    <Box pad={{ vertical: 'xlarge' }} align="center">
      <EmptyState
        title="No devices found"
        description={`No devices match your search or filters. Try 
        different criteria or clear them to see all devices.`}
        icon={<Search />}
        actions={<Button label="Clear search and filters" onClick={clear} />}
        level={3}
      />
    </Box>
  );
};

const DevicesContent = () => {
  const { filteredTotal, total }: DataContextValue = useContext(DataContext);

  // A dataset that is empty before filtering is not a filter miss.
  if (filteredTotal === 0 && total > 0) return <NoDevicesFound />;

  return (
    <>
      <List<SubscribedDevice>
        aria-labelledby={headingId}
        pad={{ horizontal: 'none', vertical: 'xsmall' }}
        action={datum => (
          <SupportStatus key={datum.id} status={datum.support} />
        )}
      >
        {(datum: SubscribedDevice) => (
          <Box key={datum.id}>
            {/* Placeholder href keeps the link in the tab order. */}
            <Anchor
              label={datum.serialNumber}
              href="#"
              onClick={openDevice}
            />
            <Text size="small" color="text-weak">
              {[datum.model, datum.type, datum.location].join(' • ')}
            </Text>
          </Box>
        )}
      </List>
      <Box pad={{ top: 'xsmall' }} border={{ side: 'top' }}>
        <Pagination summary stepOptions={[10, 20, 50]} />
      </Box>
    </>
  );
};

export const SubscribedDevices = () => (
  <Box as="section" gap="small">
    <Heading id={headingId} level={2} margin="none" tabIndex={-1}>
      Subscribed devices
    </Heading>
    <Data
      data={devices}
      properties={properties}
      defaultView={{ step: 10 }}
      gap="small"
    >
      <Toolbar gap="medium" align="center" justify="between" wrap>
        <Toolbar>
          <DataSearch id={searchId} placeholder="Search" responsive />
          <DataFilters layer>
            {Object.keys(properties)
              .filter(property => properties[property].filter !== false)
              .map(property => (
                <DataFilter key={property} property={property} />
              ))}
          </DataFilters>
        </Toolbar>
        <Box flex={false}>
          <Button label="Assign devices" secondary />
        </Box>
      </Toolbar>
      <DataSummary />
      <DevicesContent />
    </Data>
  </Box>
);
