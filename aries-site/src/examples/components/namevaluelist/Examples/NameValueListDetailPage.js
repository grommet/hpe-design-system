import React from 'react';
import {
  Box,
  Heading,
  NameValueList,
  NameValuePair,
  PageHeader,
  Tab,
  Tabs,
  Text,
} from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';
import { emptyServerData } from '../data';

export const NameValueListDetailPage = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <Box gap="medium">
      <PageHeader title="Demo_Cluster_5" />
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <Box gap="medium">
            <Heading margin={{ bottom: 'small' }} level={2} size="small">
              Details
            </Heading>
            <NameValueList>
              {Object.entries(emptyServerData).map(([name, value]) => (
                <NameValuePair key={name} name={name}>
                  {name === 'Health' ? (
                    <Box align="center" gap="xsmall" direction="row">
                      <StatusGoodSmall size="small" color="status-ok" />
                      {value}
                    </Box>
                  ) : (
                    value || <Text a11yTitle="No value">--</Text>
                  )}
                </NameValuePair>
              ))}
            </NameValueList>
          </Box>
        </Tab>
        <Tab title="Policies">
          <Box margin="small">Policies information</Box>
        </Tab>
        <Tab title="Services">
          <Box margin="small">Services information</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
