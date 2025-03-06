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
import { ContentPane } from '../../../../layouts';
import { emptyServerData } from '../data';

export const NameValueListDetailPage = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <Box gap="medium">
      <PageHeader title="Demo_Cluster_5" />
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <Box pad={{ vertical: 'small' }}>
            <ContentPane gap="medium">
              <Heading margin="none" level={2}>
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
            </ContentPane>
          </Box>
        </Tab>
        <Tab title="Policies">
          <Box margin="small">
            <ContentPane>Policies information</ContentPane>
          </Box>
        </Tab>
        <Tab title="Services">
          <Box margin="small">
            <ContentPane>Services information</ContentPane>
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
