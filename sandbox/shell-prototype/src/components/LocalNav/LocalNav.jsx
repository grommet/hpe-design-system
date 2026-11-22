// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { PANEL_SIZES } from '../../theme';
import { useShell } from '../../contexts/ShellContext';
import { SURFACE_ROLES, useSurface } from '../../surfaces';
import { SurfaceTag } from '../common';
import { CapabilityNav } from './CapabilityNav';
import { CopilotNav } from './CopilotNav';
import { ServiceNav } from './ServiceNav';

// The navigation slot. Shows exactly one panel at a time, decided by the
// shell state: the current service's nav, a capability menu, or GreenLake AI.
// `panel` overrides the state so a closing panel can stay rendered while
// it slides out. With no `surface` the slot inherits the chrome it sits
// on; pass a role to paint it as a surface of its own (a Layer, or a
// container on the page).
export const NAV_WIDTH = `${PANEL_SIZES.nav.default}px`;

export const LocalNav = ({ onClose, panel, surface, ...rest }) => {
  const { navPanel: statePanel } = useShell();
  const background = useSurface(surface);
  const navPanel = panel || statePanel;
  if (!navPanel) return null;

  let content = null;
  if (navPanel.type === 'service')
    content = <ServiceNav serviceId={navPanel.serviceId} onClose={onClose} />;
  else if (navPanel.type === 'capability')
    content = <CapabilityNav capabilityId={navPanel.id} onClose={onClose} />;
  else if (navPanel.type === 'copilot')
    content = <CopilotNav onClose={onClose} />;

  return (
    <Box
      as="aside"
      aria-label="Local navigation"
      flex
      pad="small"
      gap="small"
      overflow={{ vertical: 'auto' }}
      background={background}
      {...rest}
    >
      <SurfaceTag role={surface || 'chrome'} />
      {content}
    </Box>
  );
};

LocalNav.propTypes = {
  onClose: PropTypes.func,
  panel: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    serviceId: PropTypes.string,
  }),
  surface: PropTypes.oneOf(SURFACE_ROLES),
};
