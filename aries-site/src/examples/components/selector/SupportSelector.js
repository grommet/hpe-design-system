import React from 'react';

import { Box, PageContent, Text, Heading, Page, TextInput } from 'grommet';
import { Iteration, Search as SearchIcon } from 'grommet-icons';
import { SelectorGroup, Selector } from 'aries-core';

const services = [
  {
    value: 'aruba',
    title: 'Aruba Central',
  },
  {
    value: 'green lake portal',
    title: 'HPE GreenLake Portal',
  },
  {
    value: 'block storage',
    title: 'Block Storage',
  },
  {
    value: 'complete care',
    title: 'HPE Complete Care',
  },
  {
    value: 'storage management',
    title: 'Storage Management',
  },
  {
    value: 'greenlake backup',
    title: 'HPE GreenLake for Backup & Recovery',
  },
  {
    value: 'compute ops',
    title: 'Compute Ops Management',
  },
  {
    value: 'containers as a service',
    title: 'Containers as a Service',
  },
];

const devices = [
  {
    value: 'aruba',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
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
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'complete care',
    title: 'Aruba AP-635 WiFi 6E',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'storage management',
    title: 'Aruba Mobility Controller Virtual',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'greenlake backup',
    title: 'Aruba AP-585EX',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'compute ops',
    title: 'HPE Apollo 2000 Gen 10 Plus',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
  {
    value: 'containers as a service',
    title: 'HPE Apollo 2000 Gen 10 Plus',
    description: <Text size="xlarge">18</Text>,
    icon: <Iteration height="medium" />,
  },
];
export const SupportSelector = () => {
  return (
    <Page>
      <PageContent>
        <Box gap="medium">
          <Box gap="small">
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
          <Box gap="large">
            <Box gap="small">
              <Text>Services</Text>
              <SelectorGroup rows="xsmall" a11yTitle="Select service products">
                {services.map(datum => (
                  <Selector value={datum.value} title={datum.title} />
                ))}
              </SelectorGroup>
            </Box>
            <Box gap="small">
              <Text>Devices</Text>
              <SelectorGroup
                rows="small" // should we have a row default ?
                multiple
                a11yTitle="Select devices products"
              >
                {devices.map(datum => (
                  <Selector
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
      </PageContent>
    </Page>
  );
};
