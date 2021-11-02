import React from 'react';
import { Box, Heading, NameValueList, NameValuePair, Tab, Tabs } from 'grommet';
import { kubernetesData, serverData, tagsData } from './data';

export const NameValueListMultipleDefaultExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <Box pad="small">
      <Heading level={1} size="small">
        Demo_Cluster_5
      </Heading>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <Heading level={2} size="small">
            Details
          </Heading>
          <NameValueList>
            {Object.entries(serverData).map(([name, value]) => (
              <NameValuePair key={name} name={name}>
                {value}
              </NameValuePair>
            ))}
          </NameValueList>
          <Heading level={2} size="small">
            Kubernetes
          </Heading>
          <NameValueList>
            {Object.entries(kubernetesData).map(([name, value]) => (
              <NameValuePair key={name} name={name}>
                {value}
              </NameValuePair>
            ))}
          </NameValueList>
          <Heading level={2} size="small">
            Tags
          </Heading>
          <NameValueList>
            {Object.entries(tagsData).map(([name, value]) => (
              <NameValuePair key={name} name={name}>
                {value}
              </NameValuePair>
            ))}
          </NameValueList>
        </Tab>
        <Tab title="Policies">
          <Box margin="small">Policies Information</Box>
        </Tab>
        <Tab title="Services">
          <Box margin="small">Services Information</Box>
        </Tab>
      </Tabs>
    </Box>
  );
};
