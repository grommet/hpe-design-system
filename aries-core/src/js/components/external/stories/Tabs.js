import React, { useState } from 'react';
import {
  Box,
  Grommet,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Text,
} from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Tabs',
};

const TableContent = () => (
  <>
    <Text size="xxlarge">User Information</Text>
    <Table alignSelf="start">
      <TableBody>
        <TableRow>
          <TableCell scope="row">Name</TableCell>
          <TableCell>Ahab</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Email</TableCell>
          <TableCell>whitewhale@theessex.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Phone</TableCell>
          <TableCell>none</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Location</TableCell>
          <TableCell>Cape of South Africa</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
);

const TabContent = ({ ...props }) => (
  <Box margin="small" gap="small" {...props} />
);

export const Simple = () => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Tabs activeIndex={index} onActive={onActive} justify="start">
          <Tab title="General">
            <TabContent>
              <TableContent />
            </TabContent>
          </Tab>
          <Tab title="Account">
            <TabContent>Account Information</TabContent>
          </Tab>
          <Tab title="Billing">
            <TabContent>Billing Information</TabContent>
          </Tab>
          <Tab title="Notifications">
            <TabContent>Notifications will show here.</TabContent>
          </Tab>
          <Tab title="Security">
            <TabContent>Security Information</TabContent>
          </Tab>
          <Tab title="Integrations">
            <TabContent>Integrations Information</TabContent>
          </Tab>
        </Tabs>
      </Box>
    </Grommet>
  );
};
