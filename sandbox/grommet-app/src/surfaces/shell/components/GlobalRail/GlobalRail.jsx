// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { capabilities } from '../../data/capabilities';
import { getService } from '../../data/services';
import { RAIL_ICON_SIZE, RailButton, RailDivider } from './RailButton';
import { UserRail } from './UserRail';

export const RAIL_WIDTH = '72px';

// The capability list scrolls on short windows. A visible scrollbar would
// take width from the 40px column and squash the tiles, so it is hidden
// (wheel, trackpad and focus-into-view still scroll it) and `min-width`
// keeps every tile at its natural size. Neither has a Grommet prop.
const ScrollArea = styled(Box)`
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    min-width: max-content;
  }
`;

const CurrentServiceTile = () => {
  const { service, navPanel, dispatch } = useShell();
  const Icon = service.icon;
  const showingServiceNav = navPanel?.type === 'service';
  return (
    <RailButton
      icon={<Icon size={RAIL_ICON_SIZE} aria-hidden="true" />}
      label={`Current service: ${service.name}`}
      tip={service.name}
      elevated
      active={showingServiceNav}
      onClick={() =>
        service.nav
          ? dispatch({ type: 'SHOW_SERVICE_NAV' })
          : dispatch({ type: 'GO_HOME' })
      }
    />
  );
};

const CapabilityRail = () => {
  const {
    navPanel,
    navCollapsed,
    contextPanel,
    activeService,
    activePage,
    dispatch,
  } = useShell();

  const isActive = capability => {
    if (capability.behavior === 'home')
      return activeService === 'greenlake' && activePage === 'home';
    if (capability.behavior === 'copilot') return contextPanel === 'copilot';
    return (
      navPanel?.type === 'capability' &&
      navPanel.id === capability.id &&
      !navCollapsed
    );
  };

  const onSelect = capability => {
    if (capability.behavior === 'home') dispatch({ type: 'GO_HOME' });
    else if (capability.behavior === 'copilot')
      dispatch({
        type: contextPanel === 'copilot' ? 'CLOSE_COPILOT' : 'OPEN_COPILOT',
      });
    else dispatch({ type: 'OPEN_CAPABILITY', id: capability.id });
  };

  return (
    <>
      {capabilities.map(capability => {
        const Icon = capability.icon;
        return (
          <RailButton
            key={capability.id}
            icon={<Icon size={RAIL_ICON_SIZE} aria-hidden="true" />}
            label={capability.label}
            active={isActive(capability)}
            onClick={() => onSelect(capability)}
          />
        );
      })}
    </>
  );
};

// Dock-style pinned services for fast access ("get to my product fast").
const PinnedDock = () => {
  const { pinnedServices, activeService, dispatch } = useShell();
  if (!pinnedServices.length) return null;
  return (
    <>
      <RailDivider />
      {pinnedServices.map(id => {
        const pinned = getService(id);
        const Icon = pinned.icon;
        return (
          <RailButton
            key={id}
            icon={<Icon size={RAIL_ICON_SIZE} aria-hidden="true" />}
            label={`Pinned: ${pinned.name}`}
            tip={pinned.name}
            active={activeService === id}
            onClick={() => dispatch({ type: 'OPEN_SERVICE', serviceId: id })}
          />
        );
      })}
    </>
  );
};

// Global rail — Capability (top) + User (bottom).
// Persistent entry point to everything the platform can do, and everything
// about you. Identical for every user, in every service.
export const GlobalRail = ({ background = 'background-contrast', ...rest }) => {
  const { navPanel, navCollapsed, dispatch } = useShell();
  const hasNav = Boolean(navPanel);

  return (
    <Box
      as="nav"
      aria-label="Global"
      width={RAIL_WIDTH}
      flex={false}
      background={background}
      pad="small"
      justify="between"
      gap="small"
      {...rest}
    >
      <ScrollArea
        // forwardedAs: on a styled(Box), `as` would replace Box itself.
        forwardedAs="section"
        aria-label="Capabilities"
        gap="xxsmall"
        align="center"
        flex
        overflow={{ vertical: 'auto' }}
      >
        <RailButton
          icon={<Sidebar size={RAIL_ICON_SIZE} aria-hidden="true" />}
          label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          tip={
            hasNav
              ? navCollapsed
                ? 'Expand navigation'
                : 'Collapse navigation'
              : 'No local navigation on this page'
          }
          disabled={!hasNav}
          onClick={() => dispatch({ type: 'TOGGLE_NAV' })}
        />
        <CurrentServiceTile />
        <RailDivider />
        <CapabilityRail />
        <PinnedDock />
      </ScrollArea>
      <UserRail />
    </Box>
  );
};

GlobalRail.propTypes = { background: PropTypes.string };
