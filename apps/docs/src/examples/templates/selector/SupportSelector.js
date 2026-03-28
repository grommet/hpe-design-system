import React, { useContext } from 'react';

import {
  Box,
  PageContent,
  Text,
  Heading,
  Page,
  TextInput,
  ResponsiveContext,
} from 'grommet';
import { Iteration, Search as SearchIcon } from '@hpe-design/icons-grommet';
import { SelectorGroup, Selector } from '@shared/aries-core';
import { ContentPane } from '../../../layouts/content/ContentPane';

const services = [
  {
    value: 'aruba',
    title: 'Aruba Central',
  },
  {
    value: 'green lake portal',
    title: 'HPE GreenLake Portal',
  },
];

const devices = [
  {
    value: 'aruba',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">22</Text>,
    icon: <Iteration aria-hidden height="medium" />,
  },
  {
    value: 'green lake portal',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'block storage',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">26</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'complete care',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">32</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'storage management',
    title: 'Aruba Mobility Controller Virtual',
    description: <Text size="xlarge">6</Text>,
    icon: <Iteration height="medium" />,
  },
];
export const SupportSelector = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Page>
      <PageContent>
        <ContentPane>
          <Box gap="medium">
            <Box gap="xsmall">
              <Heading margin="none">What can we help you with?</Heading>
              <Text>Choose a product to continue.</Text>
            </Box>
            <TextInput
              aria-label="search"
              icon={<SearchIcon />}
              placeholder="Search all assets"
              type="search"
              width="medium"
            />
            <Box gap="xlarge">
              <Box gap="xsmall">
                <Text>Services</Text>
                <SelectorGroup
                  a11yTitle="Select service products"
                  columns={!['xsmall', 'small'].includes(size) ? '1/3' : '100%'}
                >
                  {services.map(datum => (
                    <Selector
                      key={datum.value}
                      value={datum.value}
                      title={datum.title}
                    />
                  ))}
                </SelectorGroup>
              </Box>
              <Box gap="xsmall">
                <Text>Devices</Text>
                <SelectorGroup
                  multiple
                  a11yTitle="Select devices products"
                  columns={!['xsmall', 'small'].includes(size) ? '1/3' : '100%'}
                >
                  {devices.map(datum => (
                    <Selector
                      key={datum.value}
                      direction="row"
                      value={datum.value}
                      icon={datum.icon}
                      title={datum.title}
                      description={datum.description}
                    />
                  ))}
                </SelectorGroup>
              </Box>
            </Box>
          </Box>
        </ContentPane>
      </PageContent>
    </Page>
  );
};
