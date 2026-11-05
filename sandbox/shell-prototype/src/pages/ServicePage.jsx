// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Page, PageContent, PageHeader, Text } from 'grommet';
import { Add, Download } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';
import { PAGE_KIND } from '../theme';
import {
  ContentTitleBar,
  PlaceholderTable,
  ShellCard,
} from '../components/common';
import { defaultPageFor, findNavItem } from '../data/services';
import { ComputeOverview } from './ComputeOverview';
import { MarvisOverview } from './MarvisOverview';

// Primary content area for a service. The shell owns the edges (title bar,
// breadcrumbs); the service owns what is inside.
// Landing pages that are fully designed; everything else is generic.
const landingPages = {
  compute: ComputeOverview,
  'compute-eu': ComputeOverview,
  networking: MarvisOverview,
};

export const ServicePage = () => {
  const { service, activePage, dispatch } = useShell();
  const match = findNavItem(service.nav, activePage);
  const item = match?.item;
  const parent = match?.parent;
  const landingPage = defaultPageFor(service);
  const isLanding = !item || item.id === landingPage;

  // A service whose landing page is a named page (Mist AI › Marvis™) titles
  // the content area after that page; otherwise the service name is used
  // with an "Overview" crumb.
  const title = isLanding && service.defaultPage ? item.label : service.name;
  let crumbs = [];
  if (!isLanding) crumbs = [parent?.label, item.label].filter(Boolean);
  else if (!service.defaultPage) crumbs = ['Overview'];

  const Landing = landingPages[service.id] || GenericOverview;

  return (
    <Page kind={PAGE_KIND} pad={{ bottom: '3xlarge' }} flex={false}>
      <PageContent gap="medium">
        <ContentTitleBar
          title={title}
          crumbs={crumbs}
          onCrumb={() => dispatch({ type: 'SET_PAGE', pageId: landingPage })}
        />
        {isLanding ? (
          <Landing />
        ) : (
          <SectionPage title={item.label} parentLabel={parent?.label} />
        )}
      </PageContent>
    </Page>
  );
};

const GenericOverview = () => {
  const { service, dispatch } = useShell();
  return (
    <Box gap="medium" flex={false}>
      <PageHeader
        title={service.name}
        subtitle={service.description}
        pad={{ top: 'none', bottom: 'small' }}
        actions={
          <Button
            label={service.nav.primaryAction}
            icon={<Add aria-hidden="true" />}
            primary
            size="small"
            onClick={() =>
              dispatch({
                type: 'SHOW_TOAST',
                title: service.nav.primaryAction,
                message: `This would start the ${service.nav.primaryAction.toLowerCase()} flow.`,
              })
            }
          />
        }
      />
      <ShellCard
        title="Resources"
        pad={{ horizontal: 'small', bottom: 'small' }}
      >
        <PlaceholderTable seed={service.id} />
      </ShellCard>
      <Text size="small" color="text-weak">
        {service.name} is shown here with a generic overview. The Compute
        service demonstrates a fully built dashboard.
      </Text>
    </Box>
  );
};

const SectionPage = ({ title, parentLabel }) => {
  const { service, dispatch } = useShell();
  return (
    <Box gap="medium" flex={false}>
      <PageHeader
        title={title}
        subtitle={
          parentLabel ? `${parentLabel} · ${service.name}` : service.name
        }
        pad={{ top: 'none', bottom: 'small' }}
        actions={
          <Box direction="row" gap="xsmall">
            <Button
              label="Export"
              icon={<Download aria-hidden="true" />}
              size="small"
            />
            <Button
              label={service.nav.primaryAction}
              icon={<Add aria-hidden="true" />}
              primary
              size="small"
              onClick={() =>
                dispatch({
                  type: 'SHOW_TOAST',
                  title: service.nav.primaryAction,
                  message: `This would start the ${service.nav.primaryAction.toLowerCase()} flow.`,
                })
              }
            />
          </Box>
        }
      />
      <ShellCard pad={{ horizontal: 'small', vertical: 'small' }}>
        <PlaceholderTable
          seed={`${service.id}-${title.toLowerCase().replace(/\s+/g, '-')}`}
          count={8}
        />
      </ShellCard>
    </Box>
  );
};

SectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  parentLabel: PropTypes.string,
};
