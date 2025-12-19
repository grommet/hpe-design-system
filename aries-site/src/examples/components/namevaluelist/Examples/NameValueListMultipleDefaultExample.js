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
import { StatusGood } from '@hpe-design/icons-grommet';
import { ContentPane } from '../../../../layouts';
import { kubernetesData, serverData, tagsData } from '../data';

export const NameValueListMultipleDefaultExample = () => {
  const [index, setIndex] = React.useState();
  const onActive = nextIndex => setIndex(nextIndex);
  return (
    <>
      <PageHeader title="Demo_Cluster_5" />
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="Overview">
          <Box gap="medium" pad={{ top: 'medium' }}>
            <ContentPane gap="medium">
              <Heading level={2} margin="none">
                Details
              </Heading>
              <NameValueList>
                {Object.entries(serverData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {name === 'Health' ? (
                      <Box align="center" gap="3xsmall" direction="row">
                        <StatusGood size="small" color="status-ok" />
                        {value}
                      </Box>
                    ) : (
                      <> {value}</>
                    )}
                  </NameValuePair>
                ))}
              </NameValueList>
            </ContentPane>
            <ContentPane gap="medium">
              <Heading level={2} margin="none">
                Kubernetes
              </Heading>
              <NameValueList>
                {Object.entries(kubernetesData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {value}
                  </NameValuePair>
                ))}
              </NameValueList>
            </ContentPane>
            <ContentPane gap="medium">
              <Heading level={2} margin="none">
                Tags
              </Heading>
              <NameValueList>
                {Object.entries(tagsData).map(([name, value]) => (
                  <NameValuePair key={name} name={name}>
                    {value}
                  </NameValuePair>
                ))}
              </NameValueList>
            </ContentPane>
          </Box>
        </Tab>
        <Tab title="Policies">
          <Box margin="xsmall">Policies information</Box>
        </Tab>
        <Tab title="Services">
          <Box margin="xsmall">Services information</Box>
        </Tab>
      </Tabs>
    </>
  );
};
