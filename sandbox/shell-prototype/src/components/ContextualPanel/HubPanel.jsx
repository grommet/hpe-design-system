// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Anchor, Box, Button, Tag, Text, TextInput } from 'grommet';
import { Close, Search } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { Selector, SelectorGroup } from '../../components/common';
import { tenants } from '../../data/context';

// Workspace / region hub ("see all"). Displays and links to context; the
// authoritative selectors stay in the global header. Workspaces are
// presented with the design system Selector pattern, one group per tenant.
export const HubPanel = () => {
  const { workspaceId, dispatch } = useShell();
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();

  const select = tenant => event => {
    // Re-selecting the current workspace toggles the Selector off; a
    // workspace is always in context, so ignore that case.
    if (!event.value) return;
    const workspace = tenant.workspaces.find(w => w.id === event.value);
    dispatch({
      type: 'SET_WORKSPACE',
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      region: workspace.regions[0],
    });
  };

  return (
    <>
      <Box
        direction="row"
        justify="between"
        align="center"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        flex={false}
      >
        <Text weight={500} color="text-strong">
          Workspaces & regions
        </Text>
        <Button
          icon={<Close aria-hidden="true" />}
          a11yTitle="Close workspaces and regions"
          onClick={() => dispatch({ type: 'CLOSE_CONTEXT_PANEL' })}
        />
      </Box>
      <Box pad={{ horizontal: 'medium' }} flex={false}>
        <TextInput
          icon={<Search aria-hidden="true" />}
          size="small"
          placeholder="Search workspaces"
          a11yTitle="Search workspaces"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Box>
      <Box flex overflow={{ vertical: 'auto' }} pad="medium" gap="medium">
        {tenants.map(tenant => {
          const workspaces = tenant.workspaces.filter(
            workspace =>
              !normalized ||
              workspace.name.toLowerCase().includes(normalized) ||
              tenant.name.toLowerCase().includes(normalized),
          );
          if (!workspaces.length) return null;
          return (
            <Box key={tenant.id} gap="xsmall" flex={false}>
              <Text
                size="xsmall"
                weight={500}
                color="text-weak"
                id={`tenant-${tenant.id}`}
              >
                {tenant.name.toUpperCase()}
              </Text>
              <SelectorGroup
                columns="flex"
                value={workspaceId}
                onSelect={select(tenant)}
                aria-labelledby={`tenant-${tenant.id}`}
              >
                {workspaces.map(workspace => (
                  <Selector
                    key={workspace.id}
                    value={workspace.id}
                    title={workspace.name}
                    description={`${workspace.services} services`}
                  >
                    <Box direction="row" gap="xsmall" wrap>
                      {workspace.regions.map(region => (
                        <Tag key={region} value={region} size="xsmall" />
                      ))}
                    </Box>
                  </Selector>
                ))}
              </SelectorGroup>
            </Box>
          );
        })}
      </Box>
      <Box pad={{ horizontal: 'medium', bottom: 'medium' }} flex={false}>
        <Anchor
          label="Manage workspaces"
          size="small"
          onClick={() =>
            dispatch({
              type: 'OPEN_PLATFORM_PAGE',
              pageId: 'customer-workspaces',
            })
          }
        />
      </Box>
    </>
  );
};
