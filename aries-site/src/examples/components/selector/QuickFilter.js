import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Page,
  PageContent,
  Data,
  DataContext,
  DataTable,
  Menu,
  Pagination,
  Toolbar,
  DataSearch,
  DataFilters,
  DataSummary,
  PageHeader,
} from 'grommet';
import { StatusCriticalSmall, StatusWarningSmall, Power } from 'grommet-icons';
import { SelectorGroup, Selector } from 'aries-core';
import MOCK_DATA from '../../../data/mockData/serverhealth.json';

const columns = [
  {
    property: 'id',
    header: 'ID',
  },
  {
    property: 'displayName',
    header: 'Name',
  },
];

const VALUE_MAP = {
  'hardware.health.summary.critical': {
    property: 'hardware.health.summary',
    value: 'Critical',
  },
  'hardware.health.summary.warning': {
    property: 'hardware.health.summary',
    value: 'Warning',
  },
  'hardware.powerState.off': {
    property: 'hardware.powerState',
    value: 'Off',
  },
};

const QuickFilters = ({ counts }) => {
  const { onView, view } = useContext(DataContext);

  return (
    <SelectorGroup
      multiple
      // TO DO should clicking "clear filters" clear this out?
      onSelect={({ value }) => {
        let nextView = { ...view };
        const nextProperties = {};
        // manipulate value to view object
        if (Array.isArray(value)) {
          value.forEach(v => {
            nextProperties[VALUE_MAP[v].property] = VALUE_MAP[v].value;
          });
          nextView = {
            ...nextView,
            properties: nextProperties,
          };
        } else {
          if (value)
            nextProperties[VALUE_MAP[value].property] = VALUE_MAP[value].value;
          nextView = {
            ...nextView,
            properties: nextProperties,
          };
        }
        onView(nextView);
      }}
    >
      <Selector
        icon={<StatusCriticalSmall color="status-critical" height="medium" />}
        title="Health critical"
        value="hardware.health.summary.critical"
        description={counts['hardware.health.summary.critical']}
      />
      <Selector
        icon={<StatusWarningSmall color="status-warning" height="medium" />}
        title="Health warning"
        value="hardware.health.summary.warning"
        description={counts['hardware.health.summary.warning']}
      />
      <Selector
        icon={<Power height="medium" />}
        title="Power state off"
        value="hardware.powerState.off"
        description={counts['hardware.powerState.off']}
      />
    </SelectorGroup>
  );
};

QuickFilters.propTypes = {
  counts: PropTypes.shape({
    'hardware.health.summary.critical': PropTypes.number,
    'hardware.health.summary.warning': PropTypes.number,
    'hardware.powerState.off': PropTypes.number,
  }),
};

const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' },
  step: 10,
};

export const QuickFilter = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(defaultView);
  const counts = React.useMemo(
    () => ({
      'hardware.health.summary.warning': 0,
      'hardware.health.summary.critical': 0,
      'hardware.powerState.off': 0,
    }),
    [],
  );

  useEffect(() => {
    // simulate API call
    console.log('fetch data', view);
    setData([...MOCK_DATA].slice(0, defaultView.step));
  }, [view]);

  useEffect(() => {
    // simulate API call to get quick filter counts
    MOCK_DATA.forEach(datum => {
      if (datum.hardware?.health?.summary === 'Critical')
        counts['hardware.health.summary.critical'] += 1;
      else if (datum.hardware?.health?.summary === 'Warning')
        counts['hardware.health.summary.warning'] += 1;
      if (datum.hardware?.powerState === 'Off')
        counts['hardware.powerState.off'] += 1;
    });
  }, [counts]);

  return (
    <Page>
      <PageContent>
        <PageHeader title="Devices" subtitle="Manage your devices." />
        <Data
          data={data}
          gap="medium"
          defaultView={defaultView}
          view={view}
          onView={nextView => setView(nextView)}
          total={MOCK_DATA.length}
          filteredTotal={MOCK_DATA.length}
          properties={{
            'hardware.model': { label: 'Model' },
            'hardware.health.summary': { label: 'Health summary' },
            'hardware.powerState': { label: 'Power state' },
          }}
        >
          <QuickFilters counts={counts} />
          <Box>
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Box flex>
                <Menu alignSelf="end" label="Actions" kind="toolbar" />
              </Box>
            </Toolbar>
            <DataSummary />
            <DataTable columns={columns} />
            <Pagination
              summary
              stepOptions
              border="top"
              pad={{ vertical: 'xsmall', horizontal: 'small' }}
            />
          </Box>
        </Data>
      </PageContent>
    </Page>
  );
};
