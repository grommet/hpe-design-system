import React, { useState, useContext, useEffect } from 'react';
import {
  Anchor,
  Box,
  Button,
  DataFilters,
  Grid,
  Toolbar,
  DataSearch,
  Text,
  Data,
  DataContext,
  ResponsiveContext,
  DataTable,
  Pagination,
} from 'grommet';
import {
  StatusCriticalSmall,
  FormUpload,
  SettingsOption,
  StatusGoodSmall,
  StatusPlaceholderSmall,
  StatusUnknownSmall,
} from 'grommet-icons';
import opsRamp from '../../../../mockData/opsRamp.json';
import { SelectorGroup, Selector } from '../../../../components';
import { ResourceDetails } from './ResourceDetails';

interface DataContextType {
  onView: (view: any) => void;
  view: any;
}

const VALUE_MAP = {
  'state.up': {
    property: 'state',
    value: 'up',
  },
  'state.down': {
    property: 'state',
    value: 'down',
  },
  'state.unknown': {
    property: 'state',
    value: 'unknown',
  },
  'state.undefined': {
    property: 'state',
    value: 'undefined',
  },
};

const QuickFilters: React.FC<{
  value: string;
  setValue: (value: string) => void;
  counts: number;
}> = ({ value: selectedValue, setValue, counts }) => {
  const { onView, view } = useContext<DataContextType>(DataContext);
  const size = useContext(ResponsiveContext);

  return (
    <SelectorGroup
      a11yTitle="Server availability filters"
      value={selectedValue}
      // this func does not work right now
      // onSelect={({ value }) => {
      //   let nextView = { ...view };
      //   const nextProperties = {};
      //   // manipulate value to view object
      //   if (value)
      //     nextProperties[VALUE_MAP[value].property] = [
      //       VALUE_MAP[value].value,
      //     ];
      //   nextView = {
      //     ...nextView,
      //     // reset search/page when filter applied
      //     search: '',
      //     page: 1,
      //     properties: nextProperties,
      //     value: undefined,
      //   };

      //   onView(nextView);
      //   setValue(value);
      // }}
      multiple={true}
      layout="grid"
      defaultValue={[]}
    >
      <Text size="large">Group By Availability State</Text>
      <Selector
        icon={<StatusCriticalSmall color="status-critical" height="medium" />}
        title="Down"
        value="status.down"
        direction="column"
        indicator={true}
        description={null}
      />
      <Selector
        icon={<StatusGoodSmall color="status-ok" height="medium" />}
        title="Up"
        value="status.up"
        direction="column"
        indicator={true}
        description={null}
      />
      <Selector
        icon={<StatusUnknownSmall height="medium" />}
        title="Unknown"
        value="status.unknown"
        direction="column"
        indicator={true}
        description={null}
      />
      <Selector
        icon={<StatusPlaceholderSmall color="status-unknown" height="medium" />}
        title="Undefined"
        value="status.undefined"
        direction="column"
        indicator={true}
        description={null}
      />
    </SelectorGroup>
  );
};

type Server = {
  name: string;
  'ip address': string;
  make: string;
  model: string;
  state: string;
};

type Result = {
  data: Server[];
};

const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' },
  step: 10,
};

export const ServersTable = () => {
  const [result, setResult] = useState<Result>({ data: [] });
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [value, setValue] = useState<string>('');
  const counts = result.data.length;
  const breakpoint = useContext(ResponsiveContext);

  const columns = [
    {
      property: 'name',
      primary: true,
      header: 'Name',
      render: datum => (
        <Box align="center" direction="row" gap="xsmall">
          {datum.state === 'up' ? (
            <StatusGoodSmall color="status-ok" />
          ) : datum.state === 'down' ? (
            <StatusCriticalSmall color="status-critical" />
          ) : datum.state === 'unknown' ? (
            <StatusUnknownSmall color="status-unknown" />
          ) : datum.state === 'undefined' ? (
            <StatusPlaceholderSmall />
          ) : null}
          <Anchor
            onClick={() => {
              setShowResultDetails(true);
            }}
          >
            {datum.name}
          </Anchor>
        </Box>
      ),
    },
    {
      property: 'ip address',
      header: 'IP Address',
      sortable: false,
    },
    {
      property: 'make',
      header: 'Make',
      sortable: false,
    },
    {
      property: 'model',
      header: 'Model',
      sortable: false,
    },
  ];

  const gridColumns = ['xsmall', 'small'].includes(breakpoint)
    ? ['flex', 'auto']
    : ['auto', 'auto'];

  const rows = ['auto'];
  const columnsGap = {
    xsmall: 'small',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };
  const rowsGap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };

  const gap = {
    row: rowsGap[breakpoint],
    column: columnsGap[breakpoint],
  };

  const areasDefault = [
    ['quickfilters', 'resourcedetails'],
    ['datatable', 'resourcedetails'],
  ];

  const areasSmall = [
    ['quickfilters', 'unassigned'],
    ['datatable', 'unassigned'],
  ];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

  useEffect(() => {
    // demo purposes so imported mock data
    // real app you'd fetch() API
    setResult({ data: opsRamp.servers });
  }, []);

  return (
    <Grid
      rows={rows}
      columns={showResultDetails ? gridColumns : 'full'}
      areas={showResultDetails ? areas : undefined}
      gap={{ row: gap.row, column: gap.column }}
    >
      <Data data={result.data} defaultView={defaultView}>
        <Box
          round="small"
          background="background-front"
          pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
          gap="medium"
        >
          <Box gridArea="quickfilters">
            <QuickFilters value={value} setValue={setValue} counts={counts} />
          </Box>
          <Box overflow="auto" gridArea="datatable">
            <Toolbar>
              <Box flex />
              <DataSearch />
              <DataFilters layer />
              <Button icon={<FormUpload />} />
              <Button icon={<SettingsOption />} />
            </Toolbar>
            <DataTable onSelect={() => {}} columns={columns} sortable />
            <Pagination
              summary
              stepOptions
              border="top"
              pad={{ vertical: 'xsmall', left: 'small' }}
            />
          </Box>
        </Box>
      </Data>
      <Box gridArea="resourcedetails">
        {showResultDetails && (
          <ResourceDetails
            layer={['xsmall', 'small', 'medium'].includes(breakpoint)}
            onClose={() => setScheduledJobs(false)}
            animation={
              ['xsmall', 'small', 'medium'].includes(breakpoint)
                ? false
                : ['slideLeft', 'fadeIn']
            }
          />
        )}
      </Box>
    </Grid>
  );
};
