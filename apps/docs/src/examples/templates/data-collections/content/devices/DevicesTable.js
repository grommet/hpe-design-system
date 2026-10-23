// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Cards,
  Data,
  DataContext,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataView,
  Heading,
  Menu,
  NameValueList,
  NameValuePair,
  Pagination,
  Text,
  ToggleGroup,
  Toolbar,
} from 'grommet';
import {
  Apps,
  Search,
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
  Table,
} from '@hpe-design/icons-grommet';
import { EmptyState } from '@shared/aries-core';
import {
  devices,
  formatDate,
  formatNumber,
  subscriptionStatuses,
  surfaceBackground,
} from './data';

const subscriptionIcons = {
  Expired: <StatusCritical color="icon-critical" aria-hidden />,
  'Expiring soon': <StatusWarning color="icon-warning" aria-hidden />,
  Active: <StatusGood color="icon-ok" aria-hidden />,
  Unknown: <StatusUnknown color="icon-unknown" aria-hidden />,
};

// In an application this would navigate to the device's detail page.
const openDevice = () => {};

const searchId = 'devices-search';

// Devices are identified by serial number; the hostname is secondary and
// may be long, so the cell is capped and the hostname truncates within it.
const DeviceIdentity = ({ name, serialNumber }) => (
  <Box width={{ max: 'xsmall' }}>
    <Anchor label={serialNumber} onClick={openDevice} />
    <Text size="small" color="text-weak" truncate>
      {name}
    </Text>
  </Box>
);

DeviceIdentity.propTypes = {
  name: PropTypes.string.isRequired,
  serialNumber: PropTypes.string.isRequired,
};

// Status Indicator pattern: a semantic icon paired with a visible label so
// the status is understandable without color perception.
const SubscriptionStatus = ({ date, status }) => (
  <Box direction="row" align="start" gap="3xsmall">
    <Box pad={{ vertical: '5xsmall' }}>{subscriptionIcons[status]}</Box>
    <Box>
      <Text>{status}</Text>
      {date && (
        <Text size="small" color="text-weak">
          {formatDate(date)}
        </Text>
      )}
    </Box>
  </Box>
);

SubscriptionStatus.propTypes = {
  date: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(subscriptionStatuses).isRequired,
};

const columns = [
  {
    property: 'serialNumber',
    header: 'Device',
    primary: true,
    render: datum => (
      <DeviceIdentity name={datum.name} serialNumber={datum.serialNumber} />
    ),
  },
  { property: 'model', header: 'Model' },
  { property: 'type', header: 'Type' },
  {
    property: 'subscriptionStatus',
    header: 'Subscription status',
    render: datum => (
      <SubscriptionStatus
        status={datum.subscriptionStatus}
        date={datum.subscriptionDate}
      />
    ),
  },
  { property: 'age', header: 'Age' },
  { property: 'location', header: 'Location' },
  {
    property: 'weeklyEnergy',
    header: 'Energy (7 days)',
    units: 'kWh',
    align: 'end',
    render: datum => formatNumber(datum.weeklyEnergy, 1),
  },
];

// Searchable properties. Those without `filter: false` also appear, in this
// order, in the filters layer.
const properties = {
  serialNumber: { label: 'Serial number', filter: false },
  name: { label: 'Hostname', filter: false },
  model: { label: 'Model', filter: false },
  type: { label: 'Type' },
  subscriptionStatus: {
    label: 'Subscription status',
    options: subscriptionStatuses,
  },
  age: { label: 'Age', options: ['< 3 years', '3-5 years', '5+ years'] },
  location: { label: 'Location' },
  weeklyEnergy: {
    label: 'Energy, 7 days (kWh)',
    range: { min: 0, max: 400, step: 10 },
  },
};

// Saved views offered by the "Select view" control.
const views = [
  {
    name: 'Expiring subscriptions',
    properties: { subscriptionStatus: ['Expiring soon'] },
    sort: { property: 'subscriptionDate', direction: 'asc' },
  },
  {
    name: 'Expired subscriptions',
    properties: { subscriptionStatus: ['Expired'] },
  },
  {
    name: 'Highest energy',
    sort: { property: 'weeklyEnergy', direction: 'desc' },
  },
];

const actions = [
  { label: 'Assign to group' },
  { label: 'Apply tags' },
  { label: 'Renew subscription' },
  { label: 'Export selected' },
];

const displays = [
  { icon: <Table />, value: 'table', tip: 'Table' },
  { icon: <Apps />, value: 'cards', tip: 'Cards' },
];

export const DevicesTable = () => {
  const [display, setDisplay] = useState('table');
  const [selected, setSelected] = useState([]);

  return (
    <Box as="section" gap="small">
      <Heading id="devices-heading" level={2} margin="none" tabIndex={-1}>
        Devices
      </Heading>
      <Data
        data={devices}
        properties={properties}
        views={views}
        defaultView={{
          sort: { property: 'weeklyEnergy', direction: 'desc' },
          step: 20,
        }}
        gap="small"
      >
        <Toolbar gap="medium">
          <Toolbar>
            <DataSearch id={searchId} placeholder="Search devices" responsive />
            <DataFilters layer>
              {Object.keys(properties)
                .filter(property => properties[property].filter !== false)
                .map(property => (
                  <DataFilter key={property} property={property} />
                ))}
            </DataFilters>
            <DataView />
            <ToggleGroup
              a11yTitle="Display as"
              options={displays}
              value={display}
              onToggle={({ value }) => setDisplay(value)}
            />
          </Toolbar>
          <Box flex />
          <Menu
            label="Action"
            items={actions}
            dropAlign={{ top: 'bottom', right: 'right' }}
          />
        </Toolbar>
        <DataSummary />
        <DevicesContent
          display={display}
          selected={selected}
          onSelect={setSelected}
        />
      </Data>
    </Box>
  );
};

const DevicesContent = ({ display, onSelect, selected }) => {
  const { filteredTotal, total } = useContext(DataContext);

  // A dataset that is empty before filtering is not a filter miss.
  if (filteredTotal === 0 && total > 0) return <NoDevicesFound />;

  return (
    <>
      {display === 'table' ? (
        <Box overflow="auto">
          <DataTable
            aria-describedby="devices-heading"
            columns={columns}
            primaryKey="id"
            sortable
            pin
            select={selected}
            onSelect={onSelect}
            verticalAlign={{ body: 'top' }}
          />
        </Box>
      ) : (
        <DeviceCards />
      )}
      <Box pad={{ top: 'xsmall' }} border={{ side: 'top' }}>
        <Pagination stepOptions={[10, 20, 50]} />
      </Box>
    </>
  );
};

DevicesContent.propTypes = {
  display: PropTypes.oneOf(['table', 'cards']).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

// Shown when search or filters match no devices.
const NoDevicesFound = () => {
  const { clearFilters, onView, view } = useContext(DataContext);

  // clearFilters resets the filter badge but leaves the search term, and its
  // view update is overridden by the onView call below.
  const clear = () => {
    const nextView = { ...view };
    ['properties', 'search', 'page', 'name', 'view'].forEach(key => {
      delete nextView[key];
    });
    clearFilters();
    onView(nextView);
    // The button unmounts once results return, so move focus first. The
    // search is collapsed on small screens, so fall back to the heading.
    (
      document.getElementById(searchId) ??
      document.getElementById('devices-heading')
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

// Alternate card presentation of the same collection, driven by the
// surrounding Data context.
const DeviceCards = () => (
  <Cards
    as="ul"
    aria-describedby="devices-heading"
    columns={{ count: 'fit', size: ['small', 'medium'] }}
    gap="medium"
  >
    {datum => (
      <Card as="li" key={datum.id} background={surfaceBackground}>
        <CardHeader>
          <DeviceIdentity name={datum.name} serialNumber={datum.serialNumber} />
        </CardHeader>
        <CardBody>
          <NameValueList pairProps={{ direction: 'column' }}>
            <NameValuePair name="Model">{datum.model}</NameValuePair>
            <NameValuePair name="Subscription">
              <SubscriptionStatus
                status={datum.subscriptionStatus}
                date={datum.subscriptionDate}
              />
            </NameValuePair>
            <NameValuePair name="Location">{datum.location}</NameValuePair>
            <NameValuePair name="Energy (7 days)">
              {formatNumber(datum.weeklyEnergy, 1)} kWh
            </NameValuePair>
          </NameValueList>
        </CardBody>
      </Card>
    )}
  </Cards>
);
