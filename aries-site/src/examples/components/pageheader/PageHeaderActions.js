import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Page, PageContent, PageHeader, Text } from 'grommet';
import { Pin } from 'grommet-icons';
import { FilterServers, ReverseAnchor } from '../../templates';

export const PageHeaderActions = ({ bestPractice = true }) => (
  <Page>
    <Box align="center" pad="small" elevation="small">
      <Text weight="bold">Global Header</Text>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<ReverseAnchor label="Dashboard" />}
        actions={<PageActions bestPractice={bestPractice} />}
      />
      <FilterServers bestPractice={bestPractice} />
    </PageContent>
  </Page>
);

PageHeaderActions.propTypes = {
  bestPractice: PropTypes.bool,
};

const PageActions = ({ bestPractice }) => (
  <Box direction="row" gap="small">
    <Button icon={<Pin />} />
    {!bestPractice ? <Button label="Add Server" secondary /> : undefined}
  </Box>
);

PageActions.propTypes = {
  bestPractice: PropTypes.bool,
};
