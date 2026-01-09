import React from 'react';
import PropTypes from 'prop-types';

import { Box, DataTable, Heading, Text, ResponsiveContext } from 'grommet';
import { ContentPane } from '../../../layouts';
import data from '../../../data/mockData/statusState.json';
import { StatusIcon } from './StatusIcon';

const columns = [
  {
    property: 'status',
    header: 'Status',
    render: datum => {
      return (
        <Box direction="row" align="center" gap="xsmall">
          <StatusIcon status={datum.status} />
          <Text>{datum.state}</Text>
        </Box>
      );
    },
  },
  {
    property: 'serial',
    header: 'Serial',
  },
  {
    property: 'power',
    header: 'Power',
  },
];

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableCombinedStatusStateExample = ({ designSystemDemo }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <ContentPane gap="medium">
      <Heading
        id="datatable-combined-status-state-heading"
        level={3}
        margin="none"
      >
        Servers
      </Heading>
      <Box
        // Height is restricted to keep inline doc page examples more compact.
        // In production, DataTable height should follow height guidelines.
        // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
        height={designSystemDemo ? undefined : 'small'}
        overflow="auto"
      >
        <DataTable
          aria-describedby="datatable-combined-status-state-heading"
          data={data.statusState}
          columns={[
            {
              primary: true,
              property: 'name',
              header: 'Name',
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          sortable
        />
      </Box>
    </ContentPane>
  );
};

DataTableCombinedStatusStateExample.propTypes = {
  designSystemDemo: PropTypes.bool,
};
