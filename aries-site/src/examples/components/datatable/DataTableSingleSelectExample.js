import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  DataTable,
  Heading,
  Text,
  ResponsiveContext,
  Button,
} from 'grommet';
import { FormPrevious } from 'grommet-icons';

const DetailsPage = ({ orderDetails, orderPageDetails, ...rest }) => (
  <Box direction="row" align="start" {...rest}>
    <Box width="small">
      <Text size="small">{orderDetails}</Text>
    </Box>
    <Text color="text-strong">{orderPageDetails}</Text>
  </Box>
);

DetailsPage.propTypes = {
  orderDetails: PropTypes.string,
  orderPageDetails: PropTypes.string,
};

const data = [
  {
    id: 'OID257383',
    orderName: 'My PVT Cloud Order',
    purchaseOrder: '9701231123323',
    state: 'Created',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Suncor Energy',
    email: 'melinda@suncor.co',
    orderDate: '04/30/2020',
  },
  {
    id: 'OID789345',
    orderName: 'GEM_1',
    purchaseOrder: '9253856295',
    state: 'Build Prep',
    service: 'HPE Goats as a Service',
    tenant: 'Nestle',
    email: 'wan@nestle.com',
    orderDate: '04/05/2020',
  },
  {
    id: 'OID894567',
    orderName: 'VMaaS for R&D',
    purchaseOrder: '7239456727',
    state: 'Processing',
    service: 'VMaaS for R&D',
    tenant: 'Coke',
    email: 'muhtar@coke.com',
    orderDate: '03/04/2020',
  },
  {
    id: 'OID829374',
    orderName: 'GEM_1',
    purchaseOrder: '1926573453',
    state: 'Factory Express',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Domain',
    email: 'priyanka@domain.com',
    orderDate: '02/28/2020',
  },
  {
    id: 'OID648379',
    orderName: 'VMaas for R&D',
    purchaseOrder: '2341835675',
    state: 'Provisioning',
    service: 'VMaaS for R&D',
    tenant: 'Nestle',
    email: 'wan@nestle.com',
    orderDate: '02/15/2020',
  },
  {
    id: 'OID192653',
    orderName: 'GEM_1',
    purchaseOrder: '9253578367',
    state: 'In Transit',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Suncor Energy',
    email: 'melinda@suncor.co',
    orderDate: '01/30/2020',
  },
  {
    id: 'OID524387',
    orderName: 'My MVT Cloud Order',
    purchaseOrder: '2634986755',
    state: 'Cancelled',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Boeing',
    email: 'susan@boeing.com',
    orderDate: '01/15/2020',
  },
  {
    id: 'OID824567',
    orderName: 'VMaaS for R&D',
    purchaseOrder: '1986476536',
    state: 'Ready to Ship',
    service: 'HPE Goats as a Service',
    tenant: 'Coke',
    email: 'muhtar@coke.com',
    orderDate: '12/29/2019',
  },
  {
    id: 'OID945423',
    orderName: 'My PVT Cloud Order',
    purchaseOrder: '9454285743',
    state: 'Created',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Domain',
    email: 'priyanka@domain.com',
    orderDate: '12/15/2019',
  },
  {
    id: 'OID253462',
    orderName: 'GEM_1',
    purchaseOrder: '4459253462',
    state: 'Accepted',
    service: 'VMaaS for R&D',
    tenant: 'Suncor Energy',
    email: 'melinda@suncor.co',
    orderDate: '11/01/2019',
  },
  {
    id: 'OID953856',
    orderName: 'DevStageSymR31 (default)',
    purchaseOrder: '2341835675',
    state: 'Processing',
    service: 'VMaaS for R&D',
    tenant: 'Coke',
    email: 'muhtar@coke.com',
    orderDate: '11/01/2019',
  },
  {
    id: 'OID953890',
    orderName: 'DevStageSymR31 (default)',
    purchaseOrder: '475078908',
    state: 'Delivered',
    service: 'Mercury',
    tenant: 'Nestle',
    email: 'wan@nestle.com',
    orderDate: '11/01/2019',
  },
];

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
    header: 'Order Date',
    render: datum =>
      datum.orderDate && new Date(datum.orderDate).toLocaleDateString(),
    align: 'end',
  },
];

export const DataTableSingleSelectExample = () => {
  const size = React.useContext(ResponsiveContext);
  const [pageDetails, setPageDetails] = React.useState({});

  return !pageDetails.id ? (
    <>
      <Heading
        id="orders-heading"
        level={3}
        margin={{ bottom: 'small', top: 'none' }}
      >
        Orders
      </Heading>
      <Box overflow="auto">
        <DataTable
          aria-describedby="orders-heading"
          data={data}
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
    </>
  ) : (
    <>
      <Button
        onClick={() => {
          setPageDetails({});
        }}
        alignSelf="start"
        icon={<FormPrevious />}
        label="Orders"
      />
      <Box margin={{ horizontal: 'large' }} border="bottom">
        <Heading size="small">Order Number: {pageDetails.id}</Heading>
      </Box>
      <Heading
        size="small"
        level={2}
        margin={{ horizontal: 'large', top: 'large', bottom: 'medium' }}
      >
        Details
      </Heading>
      <Box margin={{ vertical: 'small', horizontal: 'large' }} gap="small">
        {pageDetails &&
          Object.entries(pageDetails).map(([key, value]) => (
            <DetailsPage
              key={key}
              orderDetails={key}
              orderPageDetails={value}
            />
          ))}
      </Box>
    </>
  );
};
