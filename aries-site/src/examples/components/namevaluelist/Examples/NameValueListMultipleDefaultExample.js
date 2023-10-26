import React from 'react';
import {
  Box,
  Heading,
  NameValueList,
  NameValuePair,
  PageHeader,
  Tab,
  Tabs,
} from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';
import { kubernetesData, serverData, tagsData } from '../data';

export const NameValueListMultipleDefaultExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <Box gap="medium">
      <PageHeader title="Demo_Cluster_5" />
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <Box gap="medium">
            <>
              <Heading level={2} margin={{ bottom: 'small' }}>
                Details
              </Heading>
              <NameValueList>
                {Object.entries(serverData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {name === 'Health' ? (
                      <Box align="center" gap="xsmall" direction="row">
                        <StatusGoodSmall size="small" color="status-ok" />
                        {value}
                      </Box>
                    ) : (
                      <> {value}</>
                    )}
                  </NameValuePair>
                ))}
              </NameValueList>
            </>
            <>
              <Heading level={2} margin={{ bottom: 'small' }}>
                Kubernetes
              </Heading>
              <NameValueList>
                {Object.entries(kubernetesData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {value}
                  </NameValuePair>
                ))}
              </NameValueList>
            </>
            <>
              <Heading level={2} margin={{ bottom: 'small' }}>
                Tags
              </Heading>
              <NameValueList>
                {Object.entries(tagsData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {value}
                  </NameValuePair>
                ))}
              </NameValueList>
            </>
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
