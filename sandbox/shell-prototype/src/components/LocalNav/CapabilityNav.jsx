// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Nav } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { getCapability } from '../../data/capabilities';
import { NavDivider, NavItem, NavSectionHeading } from './NavItem';
import { NavPanelHeader } from './NavPanelHeader';

// Capability menu shown in the navigation slot when a global rail entry
// (Recent, Services, Customers, ...) is selected. Items navigate; services
// replace this panel with their own local nav, platform pages keep it.
export const CapabilityNav = ({ capabilityId, onClose }) => {
  const { activeService, activePage, dispatch } = useShell();
  const capability = getCapability(capabilityId);
  if (!capability?.menu) return null;

  const activate = item => {
    if (item.serviceId) {
      dispatch({ type: 'OPEN_SERVICE', serviceId: item.serviceId });
    } else if (item.pageId) {
      dispatch({ type: 'OPEN_PLATFORM_PAGE', pageId: item.pageId });
    } else {
      dispatch({
        type: 'SHOW_TOAST',
        title: item.label,
        message: 'This would open in a new window.',
      });
    }
    if (onClose) onClose();
  };

  const isActive = item =>
    item.pageId
      ? activeService === 'greenlake' && activePage === item.pageId
      : item.serviceId === activeService;

  return (
    <>
      <NavPanelHeader title={capability.menu.title} onClose={onClose} />
      <Nav gap="none" aria-label={`${capability.label} menu`}>
        {capability.menu.sections.map((section, index) => (
          <Fragment key={section.heading || index}>
            {index > 0 && <NavDivider />}
            {section.heading && (
              <NavSectionHeading
                label={section.heading}
                action={
                  section.headingAction && (
                    <Button
                      icon={<LinkNext aria-hidden="true" />}
                      a11yTitle={section.headingAction.label}
                      tip={section.headingAction.label}
                      size="small"
                      onClick={() => activate(section.headingAction)}
                    />
                  )
                }
              />
            )}
            <Box>
              {section.items.map(item => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  indent={Boolean(section.heading)}
                  external={item.external}
                  active={isActive(item)}
                  onClick={() => activate(item)}
                />
              ))}
            </Box>
          </Fragment>
        ))}
      </Nav>
    </>
  );
};

CapabilityNav.propTypes = {
  capabilityId: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
