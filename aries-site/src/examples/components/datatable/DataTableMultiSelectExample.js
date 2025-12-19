import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  DataTable,
  Heading,
  Menu,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ContentPane } from '../../../layouts';

const data = [
  {
    id: 'OID257383',
    orderName: 'My PVT Cloud Order',
    purchaseOrder: '9701231123323',
    state: 'Created',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Suncor Energy',
    contact: {
      email: 'melinda@suncor.co',
    },
    orderDate: '04/30/2020',
  },
  {
    id: 'OID789345',
    orderName: 'GEM_1',
    purchaseOrder: '9253856295',
    state: 'Build prep',
    service: 'HPE Goats as a Service',
    tenant: 'Nestle',
    contact: {
      email: 'wan@nestle.com',
    },
    orderDate: '04/05/2020',
  },
  {
    id: 'OID894567',
    orderName: 'VMaaS for R&D',
    purchaseOrder: '7239456727',
    state: 'Processing',
    service: 'VMaaS for R&D',
    tenant: 'Coke',
    contact: {
      email: 'muhtar@coke.com',
    },
    orderDate: '03/04/2020',
  },
  {
    id: 'OID829374',
    orderName: 'GEM_1',
    purchaseOrder: '1926573453',
    state: 'Factory express',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Domain',
    contact: {
      email: 'priyanka@domain.com',
    },
    orderDate: '02/28/2020',
  },
  {
    id: 'OID648379',
    orderName: 'VMaas for R&D',
    purchaseOrder: '2341835675',
    state: 'Provisioning',
    service: 'VMaaS for R&D',
    tenant: 'Nestle',
    contact: {
      email: 'wan@nestle.com',
    },
    orderDate: '02/15/2020',
  },
  {
    id: 'OID192653',
    orderName: 'GEM_1',
    purchaseOrder: '9253578367',
    state: 'In transit',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Suncor Energy',
    contact: {
      email: 'melinda@suncor.co',
    },
    orderDate: '01/30/2020',
  },
  {
    id: 'OID524387',
    orderName: 'My MVT Cloud Order',
    purchaseOrder: '2634986755',
    state: 'Cancelled',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Boeing',
    contact: {
      email: 'susan@boeing.com',
    },
    orderDate: '01/15/2020',
  },
  {
    id: 'OID824567',
    orderName: 'VMaaS for R&D',
    purchaseOrder: '1986476536',
    state: 'Ready to ship',
    service: 'HPE Goats as a Service',
    tenant: 'Coke',
    contact: {
      email: 'muhtar@coke.com',
    },
    orderDate: '12/29/2019',
  },
  {
    id: 'OID945423',
    orderName: 'My PVT Cloud Order',
    purchaseOrder: '9454285743',
    state: 'Created',
    service: 'HPE GreenLake Private Cloud',
    tenant: 'Domain',
    contact: {
      email: 'priyanka@domain.com',
    },
    orderDate: '12/15/2019',
  },
  {
    id: 'OID253462',
    orderName: 'GEM_1',
    purchaseOrder: '4459253462',
    state: 'Accepted',
    service: 'VMaaS for R&D',
    tenant: 'Suncor Energy',
    contact: {
      email: 'melinda@suncor.co',
    },
    orderDate: '11/01/2019',
  },
  {
    id: 'OID953856',
    orderName: 'DevStageSymR31 (default)',
    purchaseOrder: '2341835675',
    state: 'Processing',
    service: 'VMaaS for R&D',
    tenant: 'Coke',
    contact: {
      email: 'muhtar@coke.com',
    },
    orderDate: '11/01/2019',
  },
  {
    id: 'OID953890',
    orderName: 'DevStageSymR31 (default)',
    purchaseOrder: '475078908',
    state: 'Delivered',
    service: 'Mercury',
    tenant: 'Nestle',
    contact: {
      email: 'wan@nestle.com',
    },
    orderDate: '11/01/2019',
  },
];

const onClickHandler = record => {
  // eslint-disable-next-line no-alert
  alert(`
    Record was clicked:
    { 
        id: ${record.id},
        orderName: ${record.orderName}
        state: ${record.state}
        orderDate: ${record.orderDate}
    }
    
    You can use onClick() to navigate to a record's detail
    page, open a panel or modal to edit the record, or perform 
    other actions as you see fit.
  `);
};

const columns = [
  {
    property: 'orderName',
    header: 'Order name',
    render: datum => (
      <Anchor
        href="#"
        label={datum.orderName}
        onClick={() => onClickHandler(datum)}
      />
    ),
  },
  {
    property: 'purchaseOrder',
    header: 'P.O. #',
    render: datum => <Text truncate="tip">{datum.purchaseOrder}</Text>,
    size: '3xsmall',
    align: 'end',
  },
  {
    property: 'state',
    header: 'State',
    render: datum => <Text truncate="tip">{datum.state}</Text>,
  },
  {
    property: 'service',
    header: 'Service',
    render: datum => <Text truncate="tip">{datum.service}</Text>,
    size: '3xsmall',
  },
  {
    property: 'tenant',
    header: 'Tenant',
    render: datum => <Text truncate="tip">{datum.tenant}</Text>,
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

export const DataTableMultiSelectExample = () => {
  const size = React.useContext(ResponsiveContext);
  const [selected, setSelected] = React.useState([]);

  return (
    <ContentPane gap="medium">
      <Heading id="orders-heading" level={3} margin="none">
        Manage orders
      </Heading>
      <Box>
        <TableControls selected={selected} />
        <Box height={{ max: 'xlarge' }} overflow="auto">
          <DataTable
            aria-describedby="orders-heading"
            data={data}
            primaryKey="id"
            columns={[
              {
                primary: true,
                property: 'id',
                header: 'Id',
                pin: ['xsmall', 'small'].includes(size),
              },
              ...columns,
            ]}
            pin={['xsmall', 'small'].includes(size)}
            select={selected}
            onSelect={setSelected}
          />
        </Box>
      </Box>
    </ContentPane>
  );
};

const TableControls = ({ selected }) => {
  const demoActionHandler = records => {
    // eslint-disable-next-line no-alert
    alert(
      `
      Handler called to perform an action
      against these records:
      [${records}]
      `,
    );
  };

  return (
    <Box
      direction="row"
      fill="horizontal"
      justify="between"
      pad={{ vertical: 'xsmall' }}
      flex={false}
    >
      <Box justify="center">
        <SelectionSummary selected={selected} data={data} />
      </Box>
      <Menu
        label="Actions"
        kind="toolbar"
        items={[
          {
            label: 'Apply Batch Update',
            onClick: () => {
              demoActionHandler(selected);
            },
          },
          {
            label: 'Update Order Status',
            onClick: () => {
              demoActionHandler(selected);
            },
          },
          {
            label: 'Export',
            onClick: () => {
              demoActionHandler(selected);
            },
          },
        ]}
      />
    </Box>
  );
};

TableControls.propTypes = {
  selected: PropTypes.array,
};

const SelectionSummary = ({ selected }) =>
  selected.length ? (
    <Text>
      {selected.length} of {data.length} items selected
    </Text>
  ) : (
    <Text>{data.length} items</Text>
  );

SelectionSummary.propTypes = {
  selected: PropTypes.array,
};
