// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Meter,
  Notification,
  ResponsiveContext,
  Tag,
  Text,
  WorldMap,
} from 'grommet';
import { Filter, LinkNext, List, Map } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';
import { DonutMetric, Legend, ShellCard } from '../components/common';
import {
  groupsCompliance,
  iloSecurity,
  needsAttention,
  recommendedActions,
  serverMap,
  serversHealth,
  sustainabilityInsights,
} from '../data/dashboards';

const StatusCard = ({ data }) => {
  const Icon = data.icon;
  return (
    <ShellCard icon={<Icon aria-hidden="true" />} title={data.title}>
      <DonutMetric total={data.total} unit={data.unit} values={data.values} />
    </ShellCard>
  );
};

StatusCard.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.elementType,
    title: PropTypes.string,
    total: PropTypes.number,
    unit: PropTypes.string,
    values: PropTypes.array,
  }).isRequired,
};

const ComplianceCard = () => {
  const Icon = groupsCompliance.icon;
  return (
    <ShellCard
      icon={<Icon aria-hidden="true" />}
      title={groupsCompliance.title}
    >
      <Box direction="row" gap="medium" align="center" wrap>
        <Box align="center" flex={false}>
          <Text size="3xl" weight={500} color="text-strong">
            {groupsCompliance.nonCompliant}
          </Text>
          <Text size="xsmall" color="text-weak">
            Non-compliant
          </Text>
        </Box>
        <Legend values={groupsCompliance.values} />
      </Box>
      <Box direction="row" gap="small" align="center">
        <Meter
          type="bar"
          size="full"
          thickness="xsmall"
          round
          max={100}
          values={[
            {
              value: groupsCompliance.percent,
              color: 'dataVis-categorical-10',
            },
          ]}
          a11yTitle={`${groupsCompliance.percent}% compliant`}
        />
        <Box flex={false}>
          <Text size="small" color="text-strong">
            {groupsCompliance.percent}% compliant
          </Text>
        </Box>
      </Box>
    </ShellCard>
  );
};

const NeedsAttentionCard = () => {
  const Icon = needsAttention.icon;
  return (
    <ShellCard icon={<Icon aria-hidden="true" />} title={needsAttention.title}>
      <Box direction="row" wrap>
        {needsAttention.items.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <Box
              key={item.label}
              direction="row"
              gap="small"
              align="start"
              pad={{
                right: 'medium',
                left: index > 0 ? 'medium' : undefined,
                vertical: 'xsmall',
              }}
              border={
                index > 0 ? { side: 'left', color: 'border-weak' } : undefined
              }
              flex="grow"
            >
              <Box>
                <Text size="xlarge" weight={500} color="text-strong">
                  {item.value}
                </Text>
                <Text size="xsmall">{item.label}</Text>
              </Box>
              <ItemIcon color="icon-weak" aria-hidden="true" />
            </Box>
          );
        })}
      </Box>
    </ShellCard>
  );
};

const SustainabilityCard = () => {
  const Icon = sustainabilityInsights.icon;
  return (
    <ShellCard
      icon={<Icon aria-hidden="true" />}
      title={sustainabilityInsights.title}
    >
      <Box direction="row" gap="large" wrap>
        <Box>
          <Box direction="row" align="baseline" gap="xsmall">
            <Text size="xlarge" weight={500} color="text-strong">
              {sustainabilityInsights.emissions}
            </Text>
            <Text size="small">{sustainabilityInsights.emissionsUnit}</Text>
          </Box>
          <Text size="xsmall">{sustainabilityInsights.emissionsLabel}</Text>
        </Box>
        <Box>
          <Text size="xlarge" weight={500} color="text-strong">
            {sustainabilityInsights.trend}
          </Text>
          <Text size="xsmall">{sustainabilityInsights.trendLabel}</Text>
        </Box>
      </Box>
      <Box direction="row">
        <Tag
          value={sustainabilityInsights.tag}
          size="xsmall"
          background="background-accent-purple-weak"
          border={false}
        />
      </Box>
    </ShellCard>
  );
};

const RecommendedActionsCard = () => {
  const Icon = recommendedActions.icon;
  return (
    <ShellCard
      icon={<Icon aria-hidden="true" />}
      title={recommendedActions.title}
      pad={{ horizontal: 'small', bottom: 'small' }}
    >
      <Box>
        {recommendedActions.items.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && (
              <Box border={{ side: 'top', color: 'border-weak' }} />
            )}
            <Button plain hoverIndicator="background-hover">
              <Box
                direction="row"
                justify="between"
                align="center"
                gap="small"
                pad="xsmall"
                round="small"
              >
                <Box gap="xsmall" align="start">
                  <Text size="small">{item.text}</Text>
                  {item.tag && <Tag value={item.tag} size="xsmall" />}
                </Box>
                <LinkNext size="small" aria-hidden="true" />
              </Box>
            </Button>
          </Fragment>
        ))}
      </Box>
    </ShellCard>
  );
};

const ServerMapCard = () => {
  const Icon = serverMap.icon;
  return (
    <ShellCard
      icon={<Icon aria-hidden="true" />}
      title={serverMap.title}
      action={
        <Box direction="row" gap="3xsmall">
          <Button
            icon={<Filter aria-hidden="true" />}
            a11yTitle="Filter servers"
            tip="Filter"
          />
          <Button
            icon={<Map aria-hidden="true" />}
            a11yTitle="Map view"
            tip="Map view"
            active
          />
          <Button
            icon={<List aria-hidden="true" />}
            a11yTitle="List view"
            tip="List view"
          />
        </Box>
      }
    >
      <Box
        background="shell-page"
        round="small"
        pad="small"
        gap="small"
        fill
        align="center"
        justify="center"
      >
        <Notification status="info" message={serverMap.banner} />
        <Box width={{ max: 'xlarge' }} fill="horizontal">
          <WorldMap
            fill="horizontal"
            color="border-weak"
            continents={[
              { name: 'North America', color: 'dataVis-categorical-10' },
            ]}
            places={serverMap.places.map(place => ({
              name: `${place.name}: ${place.count} servers need attention`,
              location: place.location,
              color: 'status-warning',
            }))}
            a11yTitle="Compute server map"
          />
        </Box>
      </Box>
    </ShellCard>
  );
};

// Compute Ops Management overview dashboard (primary content area).
export const ComputeOverview = () => {
  const { dispatch } = useShell();
  const breakpoint = useContext(ResponsiveContext);
  const wide = ['large', 'xlarge'].includes(breakpoint);

  return (
    <Box gap="small" flex={false}>
      <Grid columns={{ count: 'fit', size: ['small', 'flex'] }} gap="small">
        <StatusCard data={serversHealth} />
        <StatusCard data={iloSecurity} />
        <ComplianceCard />
      </Grid>
      <Grid columns={wide ? ['1fr', '1.3fr'] : ['flex']} gap="small">
        <Box gap="small">
          <NeedsAttentionCard />
          <SustainabilityCard />
          <RecommendedActionsCard />
        </Box>
        <ServerMapCard />
      </Grid>
      <Box direction="row" justify="end">
        <Button
          label="View all servers"
          icon={<LinkNext aria-hidden="true" />}
          reverse
          size="small"
          onClick={() => dispatch({ type: 'SET_PAGE', pageId: 'servers-all' })}
        />
      </Box>
    </Box>
  );
};
