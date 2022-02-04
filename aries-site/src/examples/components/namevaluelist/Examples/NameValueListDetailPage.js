import React from 'react';
import {
  Box,
  Heading,
  NameValueList,
  NameValuePair,
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
    <>
      <Heading level={1} size="small">
        Demo_Cluster_5
      </Heading>
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
                    <>{value || <Text a11yTitle="No value">--</Text>}</>
                  )}
                </NameValuePair>
              ))}
            </NameValueList>
          </Box>
        </Tab>
        <Tab title="Policies">
          <Box margin="small">Policies Information</Box>
        </Tab>
        <Tab title="Services">
          <Box margin="small">Services Information</Box>
        </Tab>
      </Tabs>
    </>
  );
};
