import React from 'react';
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
import data from '../../../data/mockData/orders.json';

const columns = [
  {
    property: 'orderName',
    header: 'Name',
    render: datum => <Text truncate="tip">{datum.orderName}</Text>,
    size: 'small',
  },
  {
    property: 'purchaseOrder',
    header: 'P.O. #',
    render: datum => <Text truncate="tip">{datum.purchaseOrder}</Text>,
    size: 'xsmall',
    align: 'end',
  },
  {
    property: 'state',
    header: 'State',
    render: datum => <Text truncate="tip">{datum.state}</Text>,
    size: 'xsmall',
  },
  {
    property: 'service',
    header: 'Service',
    render: datum => <Text truncate="tip">{datum.service}</Text>,
    size: 'small',
  },
  {
    property: 'tenant',
    header: 'Tenant',
    render: datum => <Text truncate="tip">{datum.tenant}</Text>,
    size: 'xsmall',
  },
  {
    property: 'contact.email',
    header: 'Contact',
  },
  {
    property: 'orderDate',
    header: 'Order date',
    render: datum =>
      datum.orderDate && new Date(datum.orderDate).toLocaleDateString(),
    align: 'end',
  },
];

const collectionId = 'orders-heading';

export const DataTableSingleSelectExample = () => {
  const size = React.useContext(ResponsiveContext);
  const [pageDetails, setPageDetails] = React.useState({});

  return !pageDetails.id ? (
    <ContentPane gap="medium">
      <Heading id={collectionId} level={3} margin="none">
        Orders
      </Heading>
      <Box overflow="auto">
        <DataTable
          aria-describedby={collectionId}
          data={data.orders}
          columns={[
            {
              property: 'id',
              header: 'Id',
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          onClickRow={({ datum }) => setPageDetails(datum)}
          pin={['xsmall', 'small'].includes(size)}
        />
      </Box>
    </ContentPane>
  ) : (
    <ContentPane gap="medium">
      <PageHeader
        title={`Order number: ${pageDetails.id}`}
        parent={
          <ReverseAnchor
            label="Orders"
            onClick={() => {
              setPageDetails({});
            }}
            href={`#${collectionId}`}
          />
        }
      />
      <Box gap="small">
        <Heading level={2} margin="none">
          Details
        </Heading>
        {pageDetails && (
          <NameValueList nameProps={{ width: ['xxsmall', 'xsmall'] }}>
            {Object.entries(pageDetails).map(([key, value]) => (
              <NameValuePair key={key} name={key}>
                {value}
              </NameValuePair>
            ))}
          </NameValueList>
        )}
      </Box>
    </ContentPane>
  );
};
