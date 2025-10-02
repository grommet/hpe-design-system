import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardBody,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import {
  StatusCriticalSmall,
  StatusWarningSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';
import { FilterServers } from '../../templates/filtering';

export const CardFilteringBestPractice = ({ bestPractice = true }) => (
  <Page>
    <PageContent pad={bestPractice ? { bottom: 'xlarge' } : undefined}>
      <PageHeader title="Servers" />
      <Box gap="medium">
        <FilterBar bestPractice={bestPractice} />
        <FilterServers height="xsmall" />
      </Box>
    </PageContent>
  </Page>
);

CardFilteringBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};

const statuses = [
  {
    name: 'Critical',
    count: 5,
    icon: <StatusCriticalSmall color="status-critical" size="small" />,
  },
  {
    name: 'Warning',
    count: 4,
    icon: <StatusWarningSmall color="status-warning" size="small" />,
  },
  {
    name: 'Good',
    count: 43,
    icon: <StatusGoodSmall color="status-ok" size="small" />,
  },
  {
    name: 'Unknown',
    count: 5,
    icon: <StatusUnknownSmall color="status-unknown" size="small" />,
  },
];

const FilterBar = ({ bestPractice }) => {
  const content = (
    <Box direction="row" gap="xsmall">
      {statuses.map((status, index) => (
        <Box
          round="xsmall"
          overflow="hidden"
          key={index}
          onClick={() => {}}
          hoverIndicator
        >
          <Button hoverIndicator>
            <Box
              align="center"
              direction="row"
              gap="xsmall"
              pad={{ horizontal: 'medium', vertical: 'xsmall' }}
            >
              <Text size="3xl">{status.count}</Text>
              <Box direction="row" align="center" gap="3xsmall">
                {status.icon}
                <Text>{status.name}</Text>
              </Box>
            </Box>
          </Button>
        </Box>
      ))}
    </Box>
  );

  return bestPractice ? (
    content
  ) : (
    <Card alignSelf="start">
      <CardBody>{content}</CardBody>
    </Card>
  );
};

FilterBar.propTypes = {
  bestPractice: PropTypes.bool,
};
