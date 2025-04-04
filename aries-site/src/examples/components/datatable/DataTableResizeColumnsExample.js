import React from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, Heading, Text } from 'grommet';
import { ContentPane } from '../../../layouts';

const data = [
  {
    id: 'b0:2a:43:52:48:c5',
    company: 'Blue Line Graphics',
    contact: 'Joe Smith',
    title: 'CTO',
    email: 'joe.smith@blg.com',
    phoneNumber: '542-659-6500',
    city: 'Phoenix, AZ',
    deviceName: 'Chromecast',
  },
  {
    id: '00:d0:2d:32:b6:cd',
    company: 'Home Depot',
    contact: 'John Gomez',
    title: 'Regional Manager',
    email: 'john@homedepot.com',
    phoneNumber: '332-467-5872',
    city: 'Orlando, FL',
    deviceName: 'Gateway32B6CD',
  },
  {
    id: 'd8:6c:63:46:13:03',
    company: 'Hewlett Packard',
    contact: 'Alissa Marshall',
    title: 'Sales Person',
    email: 'alissa.m@hp.com',
    phoneNumber: '450-221-0093',
    city: 'Austin, TX',
    deviceName: 'Amazon-Firestick',
  },
  {
    id: 'f4:f5:d8:c0:e2:9c',
    company: 'Michaels',
    contact: 'Maritza Garcia',
    title: 'Site Manager',
    email: 'maritza@michaels.com',
    phoneNumber: '549-691-3199',
    city: 'Rochester, NY',
    deviceName: 'Google-Home',
  },
  {
    id: '38:f9:d3:b7:09:4e',
    company: 'Trader Joes',
    contact: 'Victor Manuel',
    title: 'Regional Manager',
    email: 'victor.manuel@tj.com',
    phoneNumber: '864-092-3469',
    city: 'Ann Arbor, MI',
    deviceName: 'Daras-MBP',
  },
  {
    id: '10:40:f3:85:67:44',
    company: 'Whole Foods',
    contact: 'Leticia Anderson',
    title: 'CFO',
    email: 'leti@wholefoods.com',
    phoneNumber: '445-543-7899',
    city: 'Los Angeles, CA',
    deviceName: 'Daras-Air',
  },
  {
    id: 'a4:f1:e8:27:e7:1c',
    company: 'Macys',
    contact: 'Bryan Newman',
    title: 'Manager',
    email: 'bryan.newman@macys.com',
    phoneNumber: '203-793-0983',
    city: 'Boise, ID',
    deviceName: 'iPhone',
  },
  {
    id: '10:e7:c6:cb:f8:58',
    company: 'Electro Co.',
    contact: 'Liz Montgomery',
    title: 'Assistant Manager',
    email: 'liz@electroco.com',
    phoneNumber: '982-430-5643',
    city: 'Portland, OR',
    deviceName: 'HPCBF857',
  },
  {
    id: '44:07:0b:ba:1e:eb',
    company: 'Home Depot',
    contact: 'Amy Li',
    title: 'CTO',
    email: 'amy@homedepot.com',
    phoneNumber: '370-432-5430',
    city: 'New York, NY',
    deviceName: 'Google-Home-Mini',
  },
  {
    id: '00:f6:20:60:15:d0',
    company: 'HPE',
    contact: 'Joshua Hansen',
    title: 'Site Manager',
    email: 'joshua@hpe.com',
    phoneNumber: '656-264-3398',
    city: 'Fort Collins, CO',
    deviceName: 'Amazon-Alexa',
  },
  {
    id: '30:fd:38:88:49:f4',
    company: 'Electro Co.',
    contact: 'Marco Ventura',
    title: 'Sales Person',
    email: 'marco@electroco.com',
    phoneNumber: '320-633-0912',
    city: 'Atlanta, GA',
    deviceName: 'Google-Home-Mini',
  },
  {
    id: '7c:b0:c2:5c:94:a5',
    company: 'Trader Joes',
    contact: 'Justin Jones',
    title: 'Assistant Manager',
    email: 'justin.jones@tj.com',
    phoneNumber: '432-348-4453',
    city: 'San Francisco, CA',
    deviceName: 'N/A',
  },
  {
    id: 'E0:5F:45:96:F4:DD',
    company: 'Michaels',
    contact: 'Pierre Laurent',
    title: 'Regional Manager',
    email: 'pierre@michaels.com',
    phoneNumber: '124-567-4039',
    city: 'Paris, France',
    deviceName: 'N/A',
  },
];

const columns = [
  {
    property: 'company',
    header: 'Company',
    render: datum => datum.company,
    pin: true,
  },
  {
    property: 'contact',
    header: 'Contact',
    render: datum => <Text truncate="tip">{datum.contact}</Text>,
    size: 'xsmall',
  },
  {
    property: 'title',
    header: 'Title',
    render: datum => <Text truncate="tip">{datum.title}</Text>,
    size: 'xsmall',
  },
  {
    property: 'email',
    header: 'Email',
  },
  {
    property: 'phoneNumber',
    header: 'Phone number',
  },
  {
    property: 'deviceName',
    header: 'Device name',
    render: datum => <Text truncate="tip">{datum.deviceName}</Text>,
    size: 'xsmall',
  },
  {
    property: 'city',
    header: 'City',
  },
];

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableResizeColumnsExample = ({ designSystemDemo }) => (
  <ContentPane gap="medium">
    <Heading id="contact-info-heading" level={3} margin="none">
      Contact information
    </Heading>
    <Box
      align="start"
      // restricting height to demonstrate pinned header behavior
      // Height is restricted to keep inline doc page examples more compact.
      // In production, DataTable height should follow height guidelines.
      // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
      height={designSystemDemo ? undefined : 'medium'}
      overflow="auto"
      fill="horizontal"
    >
      <DataTable
        aria-describedby="contact-info-heading"
        data={data}
        columns={columns}
        pin
        resizeable
      />
    </Box>
  </ContentPane>
);

DataTableResizeColumnsExample.propTypes = {
  designSystemDemo: PropTypes.bool,
};
