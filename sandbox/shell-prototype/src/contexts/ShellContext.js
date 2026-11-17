// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';
import { defaultPageFor, getService } from '../data/services';
import { cannedResponse, copilotHistory } from '../data/copilot';
import { PANEL_SIZES } from '../theme';

export const ShellContext = createContext(undefined);

// Navigation slot contents. The slot shows exactly one of:
//   - the current service's local nav           { type: 'service', serviceId }
//   - a capability menu from the global rail     { type: 'capability', id }
//   - the GreenLake AI nav (session history)     { type: 'copilot' }
//   - nothing (e.g. GreenLake home)              null
// The service id travels with the descriptor so a panel sliding closed can
// keep rendering the service it was opened for.
const serviceNavFor = serviceId =>
  getService(serviceId).nav ? { type: 'service', serviceId } : null;

export const initialState = {
  activeService: 'greenlake',
  // Page within the active service, or a platform page id when the
  // active service is the platform itself.
  activePage: 'home',
  navPanel: null,
  navCollapsed: false,
  // Right-hand contextual panel: null | 'copilot' | 'hub'
  contextPanel: null,
  // GreenLake AI shown in the primary content area instead of the panel.
  copilotFullscreen: false,
  // User-resizable panel widths (px).
  navWidth: PANEL_SIZES.nav.default,
  contextWidth: PANEL_SIZES.context.default,
  pinnedServices: ['networking'],
  workspaceId: 'na-it-ops',
  region: 'United States (Texas)',
  copilotMode: 'chat',
  activeConversationId: null,
  conversations: copilotHistory,
  feedbackOpen: false,
  toast: null,
};

const newConversation = (id, prompt) => ({
  id,
  title: prompt.length > 48 ? `${prompt.slice(0, 48)}…` : prompt,
  kind: 'chat',
  when: 'Just now',
  messages: [
    { role: 'user', text: prompt },
    { role: 'assistant', text: cannedResponse(prompt) },
  ],
});

export const shellReducer = (state, action) => {
  switch (action.type) {
    case 'GO_HOME':
      return {
        ...state,
        activeService: 'greenlake',
        activePage: 'home',
        navPanel: null,
        navCollapsed: false,
      };
    case 'OPEN_SERVICE': {
      const { serviceId } = action;
      const pageId = action.pageId || defaultPageFor(getService(serviceId));
      return {
        ...state,
        activeService: serviceId,
        activePage: pageId,
        navPanel: serviceNavFor(serviceId),
        navCollapsed: false,
      };
    }
    case 'OPEN_PLATFORM_PAGE':
      // Platform pages keep the capability menu as their local nav.
      return {
        ...state,
        activeService: 'greenlake',
        activePage: action.pageId,
        navCollapsed: false,
      };
    case 'SET_PAGE':
      return { ...state, activePage: action.pageId };
    case 'OPEN_CAPABILITY': {
      const alreadyOpen =
        state.navPanel?.type === 'capability' &&
        state.navPanel.id === action.id &&
        !state.navCollapsed;
      // Clicking the open capability again returns to the service nav.
      return {
        ...state,
        navPanel: alreadyOpen
          ? serviceNavFor(state.activeService)
          : { type: 'capability', id: action.id },
        navCollapsed: false,
      };
    }
    case 'SHOW_SERVICE_NAV':
      return {
        ...state,
        navPanel: serviceNavFor(state.activeService),
        navCollapsed: false,
      };
    case 'TOGGLE_NAV':
      return { ...state, navCollapsed: !state.navCollapsed };
    case 'OPEN_COPILOT':
      return {
        ...state,
        navPanel: { type: 'copilot' },
        navCollapsed: false,
        contextPanel: 'copilot',
      };
    case 'CLOSE_COPILOT':
      return {
        ...state,
        copilotFullscreen: false,
        contextPanel:
          state.contextPanel === 'copilot' ? null : state.contextPanel,
        navPanel:
          state.navPanel?.type === 'copilot'
            ? serviceNavFor(state.activeService)
            : state.navPanel,
      };
    case 'SET_COPILOT_MODE':
      return { ...state, copilotMode: action.mode };
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        activeConversationId: action.id,
        contextPanel: 'copilot',
      };
    case 'NEW_CHAT':
      return { ...state, activeConversationId: null, contextPanel: 'copilot' };
    case 'SEND_PROMPT': {
      const { prompt } = action;
      if (state.activeConversationId) {
        return {
          ...state,
          conversations: state.conversations.map(c =>
            c.id === state.activeConversationId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    { role: 'user', text: prompt },
                    { role: 'assistant', text: cannedResponse(prompt) },
                  ],
                }
              : c,
          ),
        };
      }
      const id = `h${Date.now()}`;
      return {
        ...state,
        activeConversationId: id,
        conversations: [newConversation(id, prompt), ...state.conversations],
      };
    }
    case 'TOGGLE_COPILOT_FULLSCREEN':
      return {
        ...state,
        contextPanel: 'copilot',
        copilotFullscreen: !state.copilotFullscreen,
      };
    case 'SET_PANEL_WIDTH': {
      const bounds = PANEL_SIZES[action.panel];
      const width = Math.round(
        Math.min(bounds.max, Math.max(bounds.min, action.width)),
      );
      return action.panel === 'nav'
        ? { ...state, navWidth: width }
        : { ...state, contextWidth: width };
    }
    case 'OPEN_HUB':
      return { ...state, contextPanel: 'hub', copilotFullscreen: false };
    case 'CLOSE_CONTEXT_PANEL':
      return {
        ...state,
        contextPanel: null,
        copilotFullscreen: false,
        navPanel:
          state.navPanel?.type === 'copilot'
            ? serviceNavFor(state.activeService)
            : state.navPanel,
      };
    case 'TOGGLE_PIN': {
      const pinned = state.pinnedServices.includes(action.serviceId)
        ? state.pinnedServices.filter(id => id !== action.serviceId)
        : [...state.pinnedServices, action.serviceId];
      return { ...state, pinnedServices: pinned };
    }
    case 'SET_WORKSPACE':
      return {
        ...state,
        workspaceId: action.workspaceId,
        region: action.region || state.region,
        toast: {
          title: 'Workspace changed',
          message: `Now viewing ${action.workspaceName}.`,
        },
      };
    case 'SET_REGION':
      return { ...state, region: action.region };
    case 'OPEN_FEEDBACK':
      return { ...state, feedbackOpen: true };
    case 'CLOSE_FEEDBACK':
      return { ...state, feedbackOpen: false };
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: { title: action.title, message: action.message },
      };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    default:
      return state;
  }
};

export const useShell = () => {
  const context = useContext(ShellContext);
  if (!context) throw new Error('useShell must be used within ShellProvider');
  return context;
};
