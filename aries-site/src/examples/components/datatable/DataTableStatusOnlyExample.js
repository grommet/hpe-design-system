import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  DataTable,
  Heading,
  NameValueList,
  NameValuePair,
  PageHeader,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ContentPane } from '../../../layouts';
import { ReverseAnchor } from '../../templates/ReverseAnchor';
import data from '../../../data/mockData/statusState.json';
import { getStatusIcon } from './utils/statusIcon';

// statusOnlyData - remove the state property from each item
const statusOnlyData = data.statusState.map(datum => {
  const { state, ...rest } = datum;
  return rest;
});

const columns = [
  {
    property: 'status',
    header: 'Status',
    render: datum => {
      const StatusIconComponent = getStatusIcon(datum.status);
      return (
        <Box direction="row" align="center" gap="xsmall">
          <StatusIconComponent color={`status-${datum.status}`} size="small" />
          <Text>{datum.status}</Text>
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

const collectionId = 'datatable-status-only-heading';

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableStatusOnlyExample = ({
  designSystemDemo,
  clickable = true,
}) => {
  const size = React.useContext(ResponsiveContext);
  const [pageDetails, setPageDetails] = React.useState({});
  const { name, id, ...adjustedPageDetails } = pageDetails;

  return !pageDetails.id ? (
    <ContentPane gap="medium">
      <Heading id={collectionId} level={3} margin="none">
        {clickable
          ? 'Using only status columns with state in detail page'
          : 'Using single columns for status and state'}
      </Heading>
      <Box
        // Height is restricted to keep inline doc page examples more compact.
        // In production, DataTable height should follow height guidelines.
        // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
        height={designSystemDemo ? undefined : 'medium'}
        overflow="auto"
      >
        <DataTable
          aria-describedby={collectionId}
          data={statusOnlyData}
          columns={[
            {
              primary: true,
              property: 'name',
              header: 'Name',
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          fill
          sortable
          onClickRow={
            clickable ? ({ datum }) => setPageDetails(datum) : undefined
          }
        />
      </Box>
    </ContentPane>
  ) : (
    <ContentPane gap="medium">
      <PageHeader
        title={`Server: ${pageDetails.name}`}
        parent={
          <ReverseAnchor
            label="Servers"
            onClick={() => {
              setPageDetails({});
            }}
            href={`#${collectionId}`}
          />
        }
      />
      <Box gap="xsmall">
        <Heading level={2} margin="none">
          Details
        </Heading>
        {adjustedPageDetails && (
          <NameValueList nameProps={{ width: ['5xsmall', '3xsmall'] }}>
            {Object.entries(adjustedPageDetails).map(([key, value]) => (
              <NameValuePair key={key} name={key}>
                {value === '' ? '--' : value}
              </NameValuePair>
            ))}
          </NameValueList>
        )}
      </Box>
    </ContentPane>
  );
};

DataTableStatusOnlyExample.propTypes = {
  designSystemDemo: PropTypes.bool,
  clickable: PropTypes.bool,
};
