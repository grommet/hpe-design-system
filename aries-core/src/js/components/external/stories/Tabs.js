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

export const Simple = () => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Tabs activeIndex={index} onActive={onActive} justify="start">
          <Tab title="General">
            <Box margin="small" gap="small">
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
            </Box>
          </Tab>
          <Tab title="Account">
            <Box margin="small">Account Information</Box>
          </Tab>
          <Tab title="Billing">
            <Box margin="small">Billing Information</Box>
          </Tab>
          <Tab title="Notifications">
            <Box margin="small">Notifications will show here.</Box>
          </Tab>
          <Tab title="Security">
            <Box margin="small">Security Information</Box>
          </Tab>
          <Tab title="Integrations">
            <Box margin="small">Integrations Information</Box>
          </Tab>
        </Tabs>
      </Box>
    </Grommet>
  );
};
