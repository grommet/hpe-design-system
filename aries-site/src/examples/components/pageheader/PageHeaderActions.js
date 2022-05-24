import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import { FormPrevious, Pin } from 'grommet-icons';
import { FilterServers } from '../../templates';

export const PageHeaderActions = ({ bestPractice = true }) => (
  <Page>
    <Box align="center" pad="small" elevation="small">
      <Text weight="bold">Global Header</Text>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<Anchor label="Dashboard" icon={<FormPrevious />} />}
        actions={<PageActions bestPractice={bestPractice} />}
        pad={{ top: 'large', bottom: 'medium' }}
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
