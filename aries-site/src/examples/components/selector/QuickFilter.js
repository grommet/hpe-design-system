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
      select: ['name', 'success', 'failures'],
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

const columns = [
  {
    property: 'name',
    header: 'Name',
    size: 'small',
    primary: true,
  },
  {
    property: 'rocket.name',
    header: 'Rocket',
    size: 'xsmall',
    sortable: false,
  },
  {
    property: 'success',
    header: 'Success',
    size: 'xsmall',
    sortable: false,
    render: datum => {
      if (datum.success === false) {
        return 'Failed';
      }
      return 'Successful';
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

const QuickFilters = ({ value: selectedValue, setValue }) => {
  const { onView, view } = useContext(DataContext);

  return (
    <SelectorGroup
      // TO DO should clicking "clear filters" clear this out?
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
        };

        onView(nextView);
        setValue(value);
      }}
    >
      <Selector
        icon={<StatusCriticalSmall color="status-critical" height="medium" />}
        title="Failed launches"
        value="success.failed"
      />
      <Selector
        icon={<StatusGoodSmall color="status-ok" height="medium" />}
        title="Successful launches"
        value="success.successful"
      />
    </SelectorGroup>
  );
};

QuickFilters.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export const QuickFilter = () => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState({ data: [] });
  const [rockets, setRockets] = useState([]);
  const [view, setView] = useState(defaultView);
  const [quickFilter, setQuickFilter] = useState('');

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
    fetchLaunches(view).then(response => {
      setResult({
        data: response.docs,
        filteredTotal: response.totalDocs,
        page: response.page,
      });
      // The REST API doesn't return the unfiltered total in responses.
      // Since the first request likely has no filtering, we'll likely use
      // response.totalDocs the first time and prevTotal thereafter.
      setTotal(prevTotal => Math.max(prevTotal, response.totalDocs));
    });
  }, [view]);

  return (
    <Page>
      <PageContent>
        <PageHeader title="Launches" subtitle="Manage recent launches." />
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
          <QuickFilters value={quickFilter} setValue={setQuickFilter} />
          <Box>
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Box flex>
                <Menu alignSelf="end" label="Actions" kind="toolbar" />
              </Box>
            </Toolbar>
            <DataSummary />
            {/* eslint-disable-next-line grommet/datatable-aria-describedby */}
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
