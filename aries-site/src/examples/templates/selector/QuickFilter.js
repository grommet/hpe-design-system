/* eslint-disable grommet/datatable-aria-describedby */
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
  Text,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';
import { SelectorGroup, Selector } from 'aries-core';

const buildQuery = view => {
  const query = {};
  const properties = view?.properties || [];
  Object.keys(properties).forEach(property => {
    switch (property) {
      case 'success':
        if (properties.success.length === 1) {
          query[property] = properties.success[0] === 'Successful';
        }
        break;
      case 'rocket':
        query.rocket = {
          $in: properties.rocket,
        };
        break;
      default:
        query[property] = properties[property];
    }
  });
  if (view?.search) query.$text = { $search: view.search };
  return query;
};

const fetchLaunches = async view => {
  const query = buildQuery(view);
  const sort = {
    [view?.sort?.property || 'name']: view?.sort?.direction || 'asc',
  };

  const body = {
    options: {
      populate: [
        {
          path: 'rocket',
          select: { name: 1 },
        },
      ],
      sort,
      select: ['name', 'failures', 'success', 'date_utc', 'cores', 'links'],
      limit: view?.step || 10,
      page: view?.page || 1,
    },
    query,
  };
  return fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

const fetchRockets = async () => {
  const body = {
    options: {
      sort: { name: 'asc' },
      select: ['name', 'id'],
    },
  };
  return fetch('https://api.spacexdata.com/v4/rockets/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

const formatData = data =>
  data?.map(datum => ({
    ...datum,
    rocket: datum.rocket.name,
    success: datum.success ? 'Successful' : 'Failed',
    failures: datum.failures?.map(({ reason }) => reason),
    failureTime: Math.max(datum.failures?.[0]?.time || 0, 0),
    failureAltitude: datum.failures?.[0]?.altitude || 0,
    cores: datum.cores.length,
  }));

const columns = [
  {
    property: 'name',
    header: 'Name',
    primary: true,
  },
  {
    property: 'rocket',
    header: 'Rocket',
  },
  {
    property: 'cores',
    header: 'Cores',
    align: 'end',
  },
  {
    property: 'success',
    header: 'Success',
    render: datum => {
      const icon =
        datum.success === 'Failed' ? (
          <StatusCriticalSmall color="status-critical" height="medium" />
        ) : (
          <StatusGoodSmall color="status-ok" height="medium" />
        );

      return (
        <Box direction="row" align="center" gap="xsmall">
          {icon}
          <Text>{datum.success}</Text>
        </Box>
      );
    },
  },
  {
    property: 'date_utc',
    header: 'Date',
    render: datum =>
      Intl.DateTimeFormat(undefined, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(datum.date_utc)),
  },
  {
    property: 'failureAltitude',
    header: 'Failure altitude',
    align: 'end',
  },
  {
    property: 'failures',
    header: 'Reason for failure',
    sortable: false,
    render: datum => {
      if (datum.failures.length) {
        return datum.failures?.map(reason => (
          <Paragraph key={reason} margin="none" maxLines={2}>
            {reason}
          </Paragraph>
        ));
      }
      return '--';
    },
  },
];

const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' },
  step: 10,
};

const VALUE_MAP = {
  'success.successful': {
    property: 'success',
    value: 'Successful',
  },
  'success.failed': {
    property: 'success',
    value: 'Failed',
  },
};

const QuickFilters = ({ value: selectedValue, setValue, counts }) => {
  const { onView, view } = useContext(DataContext);
  const size = useContext(ResponsiveContext);

  return (
    <SelectorGroup
      a11yTitle="Launches quick filters"
      value={selectedValue}
      onSelect={({ value }) => {
        let nextView = { ...view };
        const nextProperties = {};
        // manipulate value to view object
        if (value)
          nextProperties[VALUE_MAP[value].property] = [VALUE_MAP[value].value];
        nextView = {
          ...nextView,
          // reset search/page when filter applied
          search: '',
          page: 1,
          properties: nextProperties,
          value: undefined,
        };

        onView(nextView);
        setValue(value);
      }}
      columns={!['xsmall', 'small'].includes(size) ? '1/3' : '100%'}
    >
      <Selector
        icon={<StatusCriticalSmall color="status-critical" height="medium" />}
        title="Failed launches"
        value="success.failed"
        description={<Text size="xlarge">{counts?.failed}</Text>}
      />
      <Selector
        icon={<StatusGoodSmall color="status-ok" height="medium" />}
        title="Successful launches"
        value="success.successful"
        description={<Text size="xlarge">{counts?.successful}</Text>}
      />
    </SelectorGroup>
  );
};

QuickFilters.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  counts: PropTypes.shape({
    failed: PropTypes.number,
    successful: PropTypes.number,
  }),
};

export const QuickFilter = () => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState({ data: [] });
  const [rockets, setRockets] = useState([]);
  const [view, setView] = useState(defaultView);
  const [quickFilter, setQuickFilter] = useState('');
  const [failed, setFailed] = useState();
  const [successful, setSuccessful] = useState();

  useEffect(() => {
    fetchRockets().then(response =>
      setRockets(
        response.docs.map(({ name, id }) => ({ value: id, label: name })),
      ),
    );
  }, []);

  useEffect(() => {
    if (!('properties' in view)) {
      setQuickFilter('');
    }
    if (view.properties?.rocket?.length > 0) {
      setQuickFilter('');
    }
    if (view.properties?.success?.length > 1) {
      setQuickFilter('');
    }
    fetchLaunches(view).then(response => {
      setResult({
        data: formatData(response.docs),
        filteredTotal: response.totalDocs,
        page: response.page,
      });
      // The REST API doesn't return the unfiltered total in responses.
      // Since the first request likely has no filtering, we'll likely use
      // response.totalDocs the first time and prevTotal thereafter.
      setTotal(prevTotal => Math.max(prevTotal, response.totalDocs));
    });
  }, [view]);

  // get counts for successful and failed launches
  useEffect(() => {
    fetchLaunches({
      step: total,
      properties: {
        success: [false],
      },
    }).then(response => {
      setFailed(response.docs.length);
    });
    fetchLaunches({
      step: total,
      properties: {
        success: ['Successful'],
      },
    }).then(response => {
      setSuccessful(response.docs.length);
    });
  }, [total]);

  return (
    <Page>
      <PageContent>
        <PageHeader
          title="Launches"
          subtitle="Manage recent launches."
          pad={{ top: 'none', bottom: 'medium' }}
        />
        <Data
          properties={{
            rocket: { label: 'Rocket', options: rockets },
            success: { label: 'Success', options: ['Successful', 'Failed'] },
          }}
          data={result.data}
          total={total}
          filteredTotal={result.filteredTotal}
          defaultView={defaultView}
          view={view}
          onView={setView}
          gap="medium"
        >
          <QuickFilters
            value={quickFilter}
            setValue={setQuickFilter}
            counts={{ failed, successful }}
          />
          <Box>
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Box flex>
                <Menu alignSelf="end" label="Actions" kind="toolbar" />
              </Box>
            </Toolbar>
            <DataSummary />
            <Box overflow="auto">
              <DataTable
                alignSelf="start"
                columns={columns}
                verticalAlign={{ body: 'top' }}
              />
            </Box>
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
