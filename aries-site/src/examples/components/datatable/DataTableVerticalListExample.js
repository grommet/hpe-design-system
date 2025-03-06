import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  DataTable,
  Heading,
  Text,
  ResponsiveContext,
} from 'grommet';
import { StatusGoodSmall, StatusWarningSmall } from 'grommet-icons';
import { ContentPane } from '../../../layouts';

import ServerGroups from '../../../data/mockData/serverGroups.json';

/* This function displays an arr's values in a vertical list within a table 
   cell, hiding all values from view that exceed the given maximum list 
   length until the "View More" button is clicked, at which point the 
   button label changes to "View Less". */
const ViewMore = (data, max) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <Box>
      {viewMore
        ? data.map(item => <Text key={item}>{item}</Text>)
        : data.slice(0, max).map(item => <Text key={item}>{item}</Text>)}

      {data.length > max && (
        <Button
          alignSelf="start"
          label={viewMore ? 'View less' : `View more (${data.length - max})`}
          onClick={() => setViewMore(!viewMore)}
        />
      )}
    </Box>
  );
};

const formatData = dataSet =>
  dataSet.map(datum => {
    const adjustedDatum = { ...datum };
    switch (datum.status) {
      case 'OK':
        adjustedDatum.status = {
          label: 'ok',
          icon: StatusGoodSmall,
          color: 'status-ok',
        };
        break;
      case 'Warning':
        adjustedDatum.status = {
          label: 'warning',
          icon: StatusWarningSmall,
          color: 'status-warning',
        };
        break;
      default:
        adjustedDatum.status = {
          label: datum.status,
        };
    }
    return adjustedDatum;
  });

const data = ServerGroups.groups;
const max = 3;
const columns = [
  {
    property: 'name',
    header: 'Name',
    render: datum => <Text truncate>{datum.name}</Text>,
  },
  {
    property: 'servers',
    header: 'Servers',
    render: datum => ViewMore(datum.servers, max),
    sortable: false,
  },
];

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableVerticalListExample = ({ designSystemDemo }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <ContentPane gap="medium">
      <Heading id="server-groups-vertical-align" level={3} margin="none">
        Server groups
      </Heading>
      <Box
        // Height is restricted to keep inline doc page examples more compact.
        // In production, DataTable height should follow height guidelines.
        // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
        height={designSystemDemo ? undefined : 'medium'}
        overflow="auto"
        alignSelf="start"
      >
        <DataTable
          aria-describedby="server-groups-vertical-align"
          data={formatData(data)}
          columns={[
            {
              property: 'status.label',
              header: 'Status',
              render: datum => (
                <Box direction="row" align="center" gap="xsmall">
                  <datum.status.icon color={datum.status.color} size="small" />
                  <Text>{datum.status.label}</Text>
                </Box>
              ),
            },
            {
              property: 'id',
              header: 'Id',
              primary: true,
              render: datum => datum.id.slice(datum.id.length - 5),
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          pin
          sortable
          verticalAlign={{ body: 'top' }}
        />
      </Box>
    </ContentPane>
  );
};

DataTableVerticalListExample.propTypes = {
  designSystemDemo: PropTypes.bool,
};
