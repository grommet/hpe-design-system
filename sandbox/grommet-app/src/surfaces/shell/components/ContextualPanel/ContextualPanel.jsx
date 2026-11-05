// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';

import { useShell } from '../../contexts/ShellContext';
import { PANEL_SIZES } from '../../theme';
import { CopilotPanel } from './CopilotPanel';
import { HubPanel } from './HubPanel';
import { Surface, SurfaceTag } from '../common';

export const PANEL_WIDTH = `${PANEL_SIZES.context.default}px`;

// Contextual panel (right): on-demand, supporting information for the
// current view. Not navigation, not context selection. `panel` overrides
// the state so a closing panel can stay rendered while it slides out.
export const ContextualPanel = ({ panel, ...props }) => {
  const { contextPanel: statePanel } = useShell();
  const contextPanel = panel || statePanel;
  if (!contextPanel) return null;
  return (
    <Surface
      role="panel"
      as="aside"
      aria-label={
        contextPanel === 'copilot' ? 'GreenLake AI' : 'Workspaces and regions'
      }
      flex
      round={{ corner: 'left', size: 'xlarge' }}
      overflow="hidden"
      {...props}
    >
      <SurfaceTag role="panel" pad={{ horizontal: 'medium', top: 'small' }} />
      {contextPanel === 'copilot' ? <CopilotPanel /> : <HubPanel />}
    </Surface>
  );
};

ContextualPanel.propTypes = {
  panel: PropTypes.oneOf(['copilot', 'hub']),
};
