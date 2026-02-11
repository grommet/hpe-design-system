import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Page, PageContent, PageHeader } from 'grommet';
import { Pin } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';
import { FilterServers, ReverseAnchor } from '../../templates';
import { ContentPane } from '../../../layouts';

export const PageHeaderActions = ({ bestPractice = true }) => (
  <Page>
    <Box align="center" pad="xsmall" background="background-front" flex={false}>
      <TextEmphasis>Global Header</TextEmphasis>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<ReverseAnchor label="Dashboard" />}
        actions={<PageActions bestPractice={bestPractice} />}
      />
      <ContentPane flex={false}>
        <FilterServers bestPractice={bestPractice} />
      </ContentPane>
    </PageContent>
  </Page>
);

PageHeaderActions.propTypes = {
  bestPractice: PropTypes.bool,
};

const PageActions = ({ bestPractice }) => (
  <Box direction="row" gap="xsmall">
    <Button a11yTitle="Pin" icon={<Pin />} />
    {!bestPractice ? <Button label="Add server" secondary /> : undefined}
  </Box>
);

PageActions.propTypes = {
  bestPractice: PropTypes.bool,
};
