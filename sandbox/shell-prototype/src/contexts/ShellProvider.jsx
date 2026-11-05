// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getService } from '../data/services';
import { ShellContext, initialState, shellReducer } from './ShellContext';

export const ShellProvider = ({ children, themeMode, setThemeMode }) => {
  const [state, dispatch] = useReducer(shellReducer, initialState);

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
};
