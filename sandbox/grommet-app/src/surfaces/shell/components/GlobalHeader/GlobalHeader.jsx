// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Header,
  Image,
  Menu,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import { Briefcase, Down, Search } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { SurfaceTag } from '../common';
import { PAGE_KIND } from '../../theme';
import { findWorkspace, regions, tenants } from '../../data/context';

const Brand = () => {
  const { themeMode, dispatch } = useShell();
  const src =
    themeMode === 'dark' ? '/hpe-grnlk-rev-rgb.svg' : '/hpe-grnlk-pos-rgb.svg';
  return (
    <Button
      plain
      a11yTitle="HPE GreenLake home"
      onClick={() => dispatch({ type: 'GO_HOME' })}
    >
      <Box height="32px" width="124px" justify="center">
        <Image src={src} fit="contain" alt="HPE GreenLake" />
      </Box>
    </Button>
  );
};

// Labelled name-value context selector so values such as
// "North America IT Ops" or "US-East" are self-explanatory.
const ContextSelector = ({ label, value, items }) => (
  <Menu
    a11yTitle={`${label}: ${value}. Change ${label.toLowerCase()}`}
    dropAlign={{ top: 'bottom', right: 'right' }}
    icon={<Down size="small" aria-hidden="true" />}
    label={
      <Box direction="row" align="center" gap="xsmall">
        <Box
          background="background-contrast"
          round="xsmall"
          pad={{ horizontal: '3xsmall', vertical: '5xsmall' }}
        >
          <Text size="xsmall" color="text-weak">
            {label}
          </Text>
        </Box>
        <Text size="small" color="text-strong" weight={500}>
          {value}
        </Text>
      </Box>
    }
    items={items}
  />
);

ContextSelector.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ContextSelectors = () => {
  const { workspaceId, region, contextPanel, dispatch } = useShell();
  const breakpoint = useContext(ResponsiveContext);
  const compact = ['xsmall', 'small'].includes(breakpoint);
  const current = findWorkspace(workspaceId);

  const workspaceItems = tenants.flatMap(tenant =>
    tenant.workspaces.map(workspace => ({
      label: `${workspace.name} · ${tenant.name}`,
      onClick: () =>
        dispatch({
          type: 'SET_WORKSPACE',
          workspaceId: workspace.id,
          workspaceName: workspace.name,
          region: workspace.regions[0],
        }),
    })),
  );

  const regionItems = regions.map(name => ({
    label: name,
    onClick: () => dispatch({ type: 'SET_REGION', region: name }),
  }));

  return (
    <Box direction="row" align="center" gap="xsmall" flex={false}>
      {!compact && (
        <>
          <ContextSelector label="Region" value={region} items={regionItems} />
          <Box
            border={{ side: 'left', color: 'border-weak' }}
            height="24px"
            margin={{ horizontal: '3xsmall' }}
          />
          <ContextSelector
            label="Workspace"
            value={current?.workspace.name || 'Select workspace'}
            items={workspaceItems}
          />
        </>
      )}
      <Button
        icon={<Briefcase aria-hidden="true" />}
        a11yTitle="Browse all workspaces and regions"
        tip="All workspaces & regions"
        active={contextPanel === 'hub'}
        onClick={() =>
          dispatch({
            type: contextPanel === 'hub' ? 'CLOSE_CONTEXT_PANEL' : 'OPEN_HUB',
          })
        }
      />
    </Box>
  );
};

// Global header — Context. Deliberately thin: brand (home), search, and
// labelled context selectors. Nothing a single service wants to expose.
// Page/PageContent give the header the same responsive horizontal margins
// as the page below, so the brand lines up with the content edge.
export const GlobalHeader = () => {
  const breakpoint = useContext(ResponsiveContext);
  const small = ['xsmall', 'small'].includes(breakpoint);

  return (
    <Page kind={PAGE_KIND} flex={false}>
      <PageContent>
        <Header
          as="header"
          pad={{ vertical: 'xsmall' }}
          gap="medium"
          height={{ min: '60px' }}
        >
          <Box direction="row" align="center" gap="medium" flex>
            <Brand />
            <SurfaceTag
              token="no surface"
              note="header inherits the sheet"
              flex={false}
              width={{ min: 'max-content' }}
            />
            {small ? (
              <Button icon={<Search aria-hidden="true" />} a11yTitle="Search" />
            ) : (
              <Box width={breakpoint === 'medium' ? 'medium' : 'large'}>
                <TextInput
                  icon={<Search aria-hidden="true" />}
                  size="small"
                  placeholder="Type / to search assets, docs, services, hardware, and more…"
                  a11yTitle="Search HPE GreenLake"
                />
              </Box>
            )}
          </Box>
          <ContextSelectors />
        </Header>
      </PageContent>
    </Page>
  );
};
