// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Page, PageContent, PageHeader } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';
import { PAGE_KIND } from '../theme';
import {
  ContentTitleBar,
  PlaceholderTable,
  ShellCard,
} from '../components/common';
import { getCapability, platformPages } from '../data/capabilities';
import { MyServices } from './MyServices';

// Platform pages with a designed body; everything else gets the generic
// header + table below.
const designedPages = {
  'my-services': MyServices,
};

const GenericBody = ({ page, seed }) => {
  const { dispatch } = useShell();
  return (
    <>
      <PageHeader
        title={page.title}
        subtitle={page.description}
        pad={{ top: 'none', bottom: 'small' }}
        actions={
          <Button
            label="Add"
            icon={<Add aria-hidden="true" />}
            primary
            size="small"
            onClick={() =>
              dispatch({
                type: 'SHOW_TOAST',
                title: `Add to ${page.title.toLowerCase()}`,
                message: 'This would start the add flow.',
              })
            }
          />
        }
      />
      <Box flex={false}>
        <ShellCard pad={{ horizontal: 'small', vertical: 'small' }}>
          <PlaceholderTable seed={seed} count={8} />
        </ShellCard>
      </Box>
    </>
  );
};

GenericBody.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  seed: PropTypes.string.isRequired,
};

// A platform management page (devices, subscriptions, customers, ...).
// Treated as just another capability: the capability menu stays in the
// navigation slot and the page renders in the primary content area.
export const PlatformPage = () => {
  const { activePage, navPanel, dispatch } = useShell();
  const page = platformPages[activePage] || {
    title: activePage,
    description: '',
  };
  const capability =
    navPanel?.type === 'capability' ? getCapability(navPanel.id) : undefined;
  const Body = designedPages[activePage];

  return (
    <Page kind={PAGE_KIND} pad={{ bottom: '3xlarge' }} flex={false}>
      <PageContent gap="medium">
        <ContentTitleBar
          title="HPE GreenLake"
          crumbs={[capability?.label, page.title].filter(Boolean)}
          onCrumb={() => dispatch({ type: 'GO_HOME' })}
        />
        {Body ? <Body /> : <GenericBody page={page} seed={activePage} />}
      </PageContent>
    </Page>
  );
};
