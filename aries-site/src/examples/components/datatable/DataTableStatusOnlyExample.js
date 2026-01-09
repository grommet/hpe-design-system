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
import { StatusIcon } from './StatusIcon';

const columns = [
  {
    property: 'status',
    header: 'Status',
    render: datum => {
      return (
        <Box direction="row" align="center" gap="xsmall">
          <StatusIcon status={datum.status} />
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

const renderDetailValue = (key, value) => {
  console.log('key,value', key, value);
  if (key === 'status') {
    return (
      <Box direction="row" align="center" gap="xsmall">
        <StatusIcon status={value} />
        <Text>{value}</Text>
      </Box>
    );
  }
  if (value === '') {
    return '--';
  }
  return value;
};

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
        Status only column
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
        title={pageDetails.name}
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
          <NameValueList>
            {Object.entries(adjustedPageDetails).map(([key, value]) => (
              <NameValuePair
                key={key}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                {renderDetailValue(key, value)}
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
