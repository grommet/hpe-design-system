// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  Menu,
  PageHeader,
  Select,
  Text,
} from 'grommet';
import { Surface, SurfaceTag } from '../components/common';
import { List } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';
import { regionLabel, serviceInstances } from '../data/services';

const ALL_REGIONS = 'All Regions';

const sorts = {
  'name-asc': {
    label: 'Name (A–Z)',
    compare: (a, b) => a.name.localeCompare(b.name),
  },
  'name-desc': {
    label: 'Name (Z–A)',
    compare: (a, b) => b.name.localeCompare(a.name),
  },
  category: {
    label: 'Category',
    compare: (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
  },
};

// Region groups in a stable order, each with its instances.
const groupByRegion = instances => {
  const groups = new Map();
  instances.forEach(service => {
    const label = regionLabel(service.region);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(service);
  });
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([region, services]) => ({ region, services }));
};

const ServiceInstanceCard = ({ service, onLaunch }) => (
  <Surface role="card" component={Card} elevation="none" round="medium">
    <CardBody
      direction="row"
      align="center"
      justify="between"
      gap="small"
      pad="medium"
    >
      <Box>
        <Text weight={500} color="text-strong">
          {service.name}
        </Text>
        <Text size="small">{service.category}</Text>
        <SurfaceTag role="card" />
      </Box>
      <Button
        label="Launch"
        secondary
        a11yTitle={`Launch ${service.name} in ${regionLabel(service.region)}`}
        onClick={onLaunch}
      />
    </CardBody>
  </Surface>
);

ServiceInstanceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    region: PropTypes.string,
  }).isRequired,
  onLaunch: PropTypes.func.isRequired,
};

// My services: every service instance available to the user, grouped by
// region, with a region filter and per-group sort.
export const MyServices = () => {
  const { dispatch } = useShell();
  const [region, setRegion] = useState(ALL_REGIONS);
  const [sort, setSort] = useState('name-asc');

  const groups = useMemo(() => groupByRegion(serviceInstances), []);
  const regionOptions = [ALL_REGIONS, ...groups.map(group => group.region)];
  const visible = groups.filter(
    group => region === ALL_REGIONS || group.region === region,
  );
  const compare = sorts[sort].compare;

  return (
    <>
      <PageHeader
        title="My services"
        subtitle="View your available service instances."
        pad={{ top: 'none', bottom: 'small' }}
        actions={
          <Box width="small">
            <Select
              a11yTitle="Filter by region"
              options={regionOptions}
              value={region}
              onChange={({ option }) => setRegion(option)}
            />
          </Box>
        }
      />
      <Box gap="large" flex={false}>
        {visible.map(group => (
          <Box as="section" gap="small" key={group.region}>
            <Box direction="row" justify="between" align="center" gap="small">
              <Heading level={2} size="small" margin="none">
                {group.region}
              </Heading>
              <Menu
                icon={<List aria-hidden="true" />}
                a11yTitle={`Sort ${group.region} services`}
                dropAlign={{ top: 'bottom', right: 'right' }}
                items={Object.entries(sorts).map(([id, option]) => ({
                  label: option.label,
                  onClick: () => setSort(id),
                }))}
              />
            </Box>
            {/* Cards keep a bounded width (small–medium) and sit left-
                  aligned like the Discover services grid, rather than
                  stretching to fill the row. */}
            <Grid
              columns={{ count: 'fit', size: ['small', 'medium'] }}
              gap="small"
            >
              {[...group.services].sort(compare).map(service => (
                <ServiceInstanceCard
                  key={service.id}
                  service={service}
                  onLaunch={() =>
                    dispatch({ type: 'OPEN_SERVICE', serviceId: service.id })
                  }
                />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
};
