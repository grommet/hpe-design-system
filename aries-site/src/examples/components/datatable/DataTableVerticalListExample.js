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
        ? data.map(item => <Text>{item}</Text>)
        : data.slice(0, max).map(item => <Text>{item}</Text>)}

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

const data = ServerGroups.groups;
const max = 3;
const columns = [
  {
    property: 'name',
    header: 'Name',
    render: datum => <Text truncate>{datum.name}</Text>,
  },
  {
    property: 'groupName',
    header: 'Group Name',
    render: datum => <Text truncate>{datum.groupName}</Text>,
    sortable: true,
  },
  {
    property: 'servers',
    header: 'Servers',
    sortable: false,
    render: datum => ViewMore(datum.servers, max),
  },
  {
    property: 'status',
    header: 'Status',
    sortable: false,
  },
];

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableVerticalListExample = ({ designSystemDemo }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <>
      <Heading
        id="server-groups-vertical-align"
        level={3}
        margin={{ bottom: 'small', top: 'none' }}
      >
        Server Groups
      </Heading>
      <Box
        // Height is restricted to keep inline doc page examples more compact.
        // In production, DataTable height should follow height guidelines.
        // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
        height={designSystemDemo ? undefined : 'medium'}
        overflow="auto"
      >
        <DataTable
          aria-describedby="server-groups-vertical-align"
          data={data}
          columns={[
            {
              property: 'id',
              header: 'Id',
              primary: true,
              sortable: false,
              render: datum => datum.id.slice(datum.id.length - 5),
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          pin
          sortable
          verticalAlign="top"
        />
      </Box>
    </>
  );
};

DataTableVerticalListExample.propTypes = {
  designSystemDemo: PropTypes.bool,
};
