import React, { useContext } from 'react';
import {
  Box,
  Button,
  Text,
  Page,
  Card,
  PageContent,
  PageHeader,
  Paragraph,
  Heading,
  Data,
  DataSearch,
  Toolbar,
  DataFilters,
  Tag,
  List,
  Notification,
  CardBody,
  CardFooter,
} from 'grommet';
import { Apps, Close, Configure, LinkNext } from '@hpe-design/icons-grommet';
import insights from '../../../../mockData/insights.json';
import { SupportingContext } from '../../../../contexts';
import { AcccessPoints } from './AcccessPoints';

const properties = {
  title: {
    label: 'Title',
    filter: false,
  },
  description: {
    label: 'Description',
    filter: false,
  },
  'tags.severity': {
    label: 'Severity',
  },
  'tags.scope': {
    label: 'Scope',
  },
  'tags.service': {
    label: 'Service',
  },
  'tags.usage': {
    label: 'Usage',
  },
  'tags.type': {
    label: 'Type',
  },
  'tags.resource': {
    label: 'Resouce',
  },
  'tags.provider': {
    label: 'Provider',
  },
};

const ResultDetail = ({ datum }) => {
  const { setShowSupporting } = useContext(SupportingContext);
  return (
    <Box
      width="large"
      border={{ color: 'border-weak', side: 'left' }}
      round={{ corner: 'left', size: 'small' }}
      overflow="auto"
      fill="vertical"
    >
      <Box direction="row" pad="small" align="center" justify="between">
        <Box direction="row" align="center" gap="small">
          <Button
            icon={<Close />}
            onClick={() => setShowSupporting(undefined)}
          />
          <Box
            direction="row"
            align="center"
            gap="medium"
            border={{ side: 'between', color: 'border-weak' }}
          >
            <Text size="small" color="text-weak">
              GLN0020876
            </Text>
            <Text size="small" color="text-weak">
              4 min ago
            </Text>
          </Box>
        </Box>
        <Box direction="row" align="center">
          <Button icon={<Configure />} />
          <Button icon={<Apps />} />
        </Box>
      </Box>
      <Box pad="medium" gap="medium">
        <Heading level={2} margin="none">
          {datum.title}
        </Heading>
        <Paragraph margin="none">{datum.description}</Paragraph>
        <Paragraph margin="none">
          These delays are contributing to reduced QoS and may increase
          infrastructure and support costs. Potential root causes include
          storage tier misalignment, network congestion, or access point
          configuration issues. Immediate diagnostic and optimization actions
          required
        </Paragraph>
        <Box pad="medium" background="background-front" round="small">
          <AcccessPoints />
        </Box>
        <Notification
          message="Your networking expenses have increased by 23% this month."
          status="warning"
        />
        <Paragraph margin="none">
          Agent will analyze IOPS telemetry, isolate problematic access points,
          and execute targeted QoS and workload optimization actions.
        </Paragraph>
        <Box align="start" gap="small">
          <Button
            label="Run pre-deployment"
            size="large"
            icon={<LinkNext />}
            reverse
            primary
          />
          <Button
            label="Simulate in test mode"
            size="large"
            icon={<LinkNext />}
            reverse
            secondary
          />
        </Box>
        <Paragraph margin="none">
          Agent will simulate optimization scenarios to identify the most
          effective resolution with minimal disruption. It will isolate
          high-latency access points, recommend QoS adjustments, and rebalance
          workloads. Changes will be staged with rollback options if performance
          degrades. If latency persists beyond defined thresholds
          post-remediation, the agent will trigger an escalation workflow for
          human review or higher-tier intervention.”
        </Paragraph>
      </Box>
    </Box>
  );
};

export const Results = () => {
  const { setShowSupporting } = useContext(SupportingContext);
  return (
    <Page pad={{ bottom: 'large' }}>
      <PageContent>
        <PageHeader title="Insights" />
        <Data data={insights.insights} properties={properties}>
          <Box gap="medium">
            <Toolbar>
              <Box width="large">
                <DataSearch placeholder="Search insights" />
              </Box>
              <DataFilters layer />
            </Toolbar>
            <List
              defaultItemProps={{
                pad: 'none',
              }}
            >
              {(datum: { title: string; description: string; tags: {} }) => (
                <Card
                  background="none"
                  onClick={() =>
                    setShowSupporting(<ResultDetail datum={datum} />)
                  }
                >
                  <CardBody gap="small">
                    <Heading level={2} size="medium" margin="none">
                      {datum.title}
                    </Heading>
                    <Paragraph color="text-weak" margin="none" fill>
                      {datum.description}
                    </Paragraph>
                    <Box direction="row" gap="small" wrap>
                      {Object.keys(datum.tags).map(key => (
                        <Tag name={key} value={datum.tags[key]} />
                      ))}
                    </Box>
                    <Box direction="row" justify="between" gap="small">
                      <Text size="xsmall" color="text-weak">
                        4 min ago
                      </Text>
                      <Text size="xsmall" color="text-weak">
                        GLN0020876
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              )}
            </List>
          </Box>
        </Data>
      </PageContent>
    </Page>
  );
};
