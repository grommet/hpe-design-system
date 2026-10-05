// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Box, Grid, Heading, Tab, Tabs } from 'grommet';
import { ServiceCard } from '../../components';
import { serviceGroups, services, surfaceBackground } from './data';

export const DiscoverServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box as="section" gap="medium">
      <Heading level={2} margin="none">
        Discover services
      </Heading>
      <Tabs justify="start" activeIndex={activeIndex} onActive={setActiveIndex}>
        {serviceGroups.map(({ id, label }) => (
          <Tab key={id} title={label}>
            <Grid
              columns={{ count: 'fit', size: 'small' }}
              gap="small"
              pad={{ top: 'small' }}
            >
              {services
                .filter(service => service.groups.includes(id))
                .map(service => (
                  <ServiceCard
                    key={service.title}
                    category={service.category}
                    title={service.title}
                    description={service.description}
                    tag={service.tag}
                    background={surfaceBackground}
                  />
                ))}
            </Grid>
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
