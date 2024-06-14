import React, { useEffect, useState } from 'react';
import {
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Pagination,
  Toolbar,
  ToggleGroup,
} from 'grommet';
import { Apps, Table, List as ListIcon } from 'grommet-icons';
import { columns, fetchLaunches, formatData } from './utils';
import { CardView } from './CardView';
import { ListView } from './ListView';

const toggleOptions = [
  {
    icon: <ListIcon a11yTitle="List view" />,
    value: 'list',
  },
  {
    icon: <Table a11yTitle="Table view" />,
    value: 'table',
  },
  {
    icon: <Apps a11yTitle="Card view" />,
    value: 'card',
  },
];

export const ToggleGroupViews = () => {
  const [result, setResult] = useState({ data: [] });
  // fetch launch data
  useEffect(() => {
    fetchLaunches('https://api.spacexdata.com/v4/launches/query').then(
      response => {
        setResult({
          data: formatData(response.docs),
        });
      },
    );
  }, []);
  const [value, setValue] = useState('table');
  return (
    <Data
      data={result.data}
      properties={{
        name: { filter: false },
        rocket: { label: 'Rocket' },
        cores: { label: 'Cores' },
        date_utc: { label: 'Date' },
        success: { label: 'Success' },
        failureAltitude: { label: 'Failure altitude' },
      }}
      views={[
        {
          name: 'My rockets',
          properties: {
            rocket: ['Falcon 9'],
          },
        },
      ]}
    >
      <Toolbar>
        <DataSearch />
        <DataFilters layer />
        <ToggleGroup
          onToggle={e => {
            if (e.value.length) setValue(e.value);
          }}
          value={value}
          options={toggleOptions}
        />
      </Toolbar>
      <DataSummary />
      {value === 'table' && (
        <DataTable aria-describedby="spaceX" columns={columns} />
      )}
      {value === 'card' && <CardView />}
      {value === 'list' && <ListView />}
      <Pagination summary stepOptions border="top" pad="xsmall" />
    </Data>
  );
};
