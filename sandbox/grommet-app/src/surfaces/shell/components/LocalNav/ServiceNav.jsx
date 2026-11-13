// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Nav } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { findNavItem, getService } from '../../data/services';
import { NavDivider, NavItem } from './NavItem';
import { NavPanelHeader } from './NavPanelHeader';

// Local side nav: navigation within the service you have entered. Owned by
// the service and replaced wholesale when you move to another capability.
export const ServiceNav = ({ serviceId, onClose }) => {
  const { activeService, activePage, dispatch } = useShell();
  const service = getService(serviceId || activeService);
  const { nav } = service;
  // Explicit user toggles; anything untouched follows the active page so the
  // parent of the current page is open by default.
  const [overrides, setOverrides] = useState({});
  const activeParentId = findNavItem(nav, activePage)?.parent?.id;
  const isExpanded = id => overrides[id] ?? id === activeParentId;

  const toggle = id =>
    setOverrides(current => ({ ...current, [id]: !isExpanded(id) }));

  if (!nav) return null;

  const menuItems = [
    {
      label: 'Service details',
      onClick: () =>
        dispatch({
          type: 'SHOW_TOAST',
          title: service.name,
          message: service.description,
        }),
    },
    { label: 'Open in new window' },
    { label: 'Manage subscription' },
  ];

  return (
    <>
      <NavPanelHeader
        title={service.name}
        pinnable
        serviceId={service.id}
        menuItems={menuItems}
        onClose={onClose}
      />
      <Button
        label={nav.primaryAction}
        icon={<Add aria-hidden="true" />}
        primary
        size="xsmall"
        alignSelf="start"
        onClick={() =>
          dispatch({
            type: 'SHOW_TOAST',
            title: nav.primaryAction,
            message: `This would start the ${nav.primaryAction.toLowerCase()} flow for ${service.name}.`,
          })
        }
      />
      <Nav gap="none" aria-label={`${service.name} navigation`}>
        {nav.groups.map((group, index) => (
          <Fragment key={group[0].id}>
            {index > 0 && <NavDivider />}
            {group.map(item => {
              const isOpen = isExpanded(item.id);
              const childActive = item.children?.some(c => c.id === activePage);
              return (
                <Box key={item.id}>
                  <NavItem
                    label={item.label}
                    active={activePage === item.id || (childActive && !isOpen)}
                    expandable={Boolean(item.children)}
                    expanded={isOpen}
                    onClick={() =>
                      item.children
                        ? toggle(item.id)
                        : dispatch({ type: 'SET_PAGE', pageId: item.id })
                    }
                  />
                  {item.children && (
                    <Collapsible open={isOpen}>
                      <Box>
                        {item.children.map(child => (
                          <NavItem
                            key={child.id}
                            label={child.label}
                            indent
                            active={activePage === child.id}
                            onClick={() =>
                              dispatch({ type: 'SET_PAGE', pageId: child.id })
                            }
                          />
                        ))}
                      </Box>
                    </Collapsible>
                  )}
                </Box>
              );
            })}
          </Fragment>
        ))}
      </Nav>
    </>
  );
};

ServiceNav.propTypes = {
  serviceId: PropTypes.string,
  onClose: PropTypes.func,
};
