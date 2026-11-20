// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  Paragraph,
  Tab,
  Tabs,
  Tag,
  Text,
} from 'grommet';
import { useShell } from '../../contexts/ShellContext';
import { catalog, serviceGroups } from '../../data/home';
import { Surface, SurfaceTag } from '../../components/common';

// Summary card for a service in a catalog or discovery grid.
const ServiceCard = ({ category, description, tag, title, ...rest }) => (
  <Surface
    role="card"
    component={Card}
    elevation="none"
    round="medium"
    {...rest}
  >
    <CardBody gap="xsmall">
      <Box direction="row" align="center" justify="between" gap="xsmall">
        <Box gap="5xsmall">
          <Text size="small">{category}</Text>
          <Text weight={500} color="text-strong">
            {title}
          </Text>
        </Box>
        {tag && (
          <Tag
            value={tag}
            size="xsmall"
            background="background-accent-purple-weak"
            border={false}
          />
        )}
      </Box>
      <Paragraph margin="none">{description}</Paragraph>
      <SurfaceTag role="card" />
    </CardBody>
  </Surface>
);

ServiceCard.propTypes = {
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export const DiscoverServices = () => {
  const { dispatch } = useShell();
  const [activeIndex, setActiveIndex] = useState(0);

  const open = service =>
    service.serviceId
      ? dispatch({ type: 'OPEN_SERVICE', serviceId: service.serviceId })
      : dispatch({
          type: 'SHOW_TOAST',
          title: service.title,
          message: 'This would open the service’s catalog page.',
        });

  return (
    <Box as="section" gap="small" flex={false}>
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
              {catalog
                .filter(service => service.groups.includes(id))
                .map(service => (
                  <ServiceCard
                    key={service.title}
                    category={service.category}
                    title={service.title}
                    description={service.description}
                    tag={service.tag}
                    a11yTitle={`Explore ${service.title}`}
                    onClick={() => open(service)}
                  />
                ))}
            </Grid>
          </Tab>
        ))}
      </Tabs>
    </Box>
  );
};
