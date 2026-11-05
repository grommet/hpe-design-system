// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getService } from '../data/services';
import { ShellContext, initialState, shellReducer } from './ShellContext';

// `initialActions`: actions applied to the initial state before first
// render, so a design can open with its panels showing.
export const ShellProvider = ({
  children,
  themeMode,
  setThemeMode,
  initialActions = [],
}) => {
  const [state, dispatch] = useReducer(shellReducer, initialState, start =>
    initialActions.reduce(shellReducer, start),
  );

  const value = useMemo(
    () => ({
      ...state,
      themeMode,
      setThemeMode,
      dispatch,
      service: getService(state.activeService),
      activeConversation:
        state.conversations.find(c => c.id === state.activeConversationId) ||
        null,
      navVisible: Boolean(state.navPanel) && !state.navCollapsed,
    }),
    [state, themeMode, setThemeMode],
  );

  return (
    <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
  );
};

ShellProvider.propTypes = {
  children: PropTypes.node,
  themeMode: PropTypes.oneOf(['light', 'dark']).isRequired,
  setThemeMode: PropTypes.func.isRequired,
  initialActions: PropTypes.arrayOf(PropTypes.object),
};
