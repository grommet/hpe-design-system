// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import {
  Box,
  Layer,
  Main,
  ResponsiveContext,
  SkipLink,
  SkipLinkTarget,
  SkipLinks,
} from 'grommet';
import { useShell } from '../contexts/ShellContext';
import { HomePage, PlatformPage, ServicePage } from '../pages';
import { ContextualPanel, PANEL_WIDTH } from './ContextualPanel';
import { CopilotPanel } from './ContextualPanel/CopilotPanel';
import { GlobalHeader } from './GlobalHeader';
import { GlobalRail } from './GlobalRail';
import { LocalNav, NAV_WIDTH } from './LocalNav';
import { FeedbackLayer, ShellToast } from './Overlays';
import { SlidePanel } from './SlidePanel';
import { PANEL_SIZES } from '../theme';

const MAIN_ID = 'main-content';

const CurrentPage = () => {
  const { activeService, activePage } = useShell();
  if (activeService === 'greenlake') {
    return activePage === 'home' ? <HomePage /> : <PlatformPage />;
  }
  return <ServicePage />;
};

// Shell anatomy
//   ┌──────┬──────────┬──────────────────────────────┬───────────┐
//   │ Rail │ Local    │ Global header (context)      │ Contextual│
//   │ cap. │ side nav ├──────────────────────────────┤ panel     │
//   │      │          │ Primary content area         │ (right)   │
//   │ user │          │                              │           │
//   └──────┴──────────┴──────────────────────────────┴───────────┘
// The rail is the darkest layer (contrast over the grey chrome), the local
// nav sits on the grey chrome, and header + content share a white "sheet",
// as does the contextual panel.
// Remembers the last non-empty value so a panel keeps its content while it
// slides closed. Storing the previous render's value in state (set
// conditionally during render) avoids reading refs in render.
const useLastPanel = panel => {
  const [last, setLast] = useState(panel);
  if (panel && panel !== last) setLast(panel);
  return panel || last;
};

export const Shell = () => {
  const {
    navPanel,
    navVisible,
    contextPanel,
    copilotFullscreen,
    navWidth,
    contextWidth,
    dispatch,
  } = useShell();
  const breakpoint = useContext(ResponsiveContext);
  const overlay = ['xsmall', 'small'].includes(breakpoint);
  const renderedNav = useLastPanel(navPanel);
  const renderedContext = useLastPanel(contextPanel);
  // In full screen GreenLake AI takes over the content area and the side
  // panel closes; its history stays in the navigation slot.
  const fullscreen = contextPanel === 'copilot' && copilotFullscreen;
  const contextOpen = Boolean(contextPanel) && !fullscreen;
  const setWidth = panel => width =>
    dispatch({ type: 'SET_PANEL_WIDTH', panel, width });

  return (
    <Box
      direction="row"
      height="100vh"
      background="shell-card"
      overflow="hidden"
    >
      <SkipLinks id="skip-links">
        <SkipLink id={MAIN_ID} label="Skip to main content" />
      </SkipLinks>

      <GlobalRail />

      {/* Panels slide open and closed; the outgoing panel stays rendered
          until the motion finishes. */}
      {!overlay && (
        <SlidePanel
          open={navVisible}
          side="left"
          width={navWidth}
          bounds={PANEL_SIZES.nav}
          onResize={setWidth('nav')}
          onReset={() => setWidth('nav')(PANEL_SIZES.nav.default)}
          resizeLabel="Resize navigation"
        >
          <LocalNav panel={renderedNav} />
        </SlidePanel>
      )}

      <Box
        flex
        background="shell-page"
        round={
          contextPanel && !overlay
            ? 'xlarge'
            : { corner: 'left', size: 'xlarge' }
        }
        overflow="hidden"
        responsive="container"
      >
        <GlobalHeader />
        <SkipLinkTarget id={MAIN_ID} />
        <Main flex overflow={{ vertical: 'auto' }}>
          {fullscreen ? <CopilotPanel fullscreen /> : <CurrentPage />}
        </Main>
      </Box>

      {!overlay && (
        <SlidePanel
          open={contextOpen}
          side="right"
          width={contextWidth}
          gap="small"
          bounds={PANEL_SIZES.context}
          onResize={setWidth('context')}
          onReset={() => setWidth('context')(PANEL_SIZES.context.default)}
          resizeLabel="Resize panel"
        >
          <ContextualPanel panel={renderedContext} />
        </SlidePanel>
      )}

      {overlay && navVisible && (
        <Layer
          position="left"
          full="vertical"
          onEsc={() => dispatch({ type: 'TOGGLE_NAV' })}
          onClickOutside={() => dispatch({ type: 'TOGGLE_NAV' })}
        >
          <LocalNav
            onClose={() => dispatch({ type: 'TOGGLE_NAV' })}
            background="shell-page"
            height="100%"
            width={NAV_WIDTH}
          />
        </Layer>
      )}

      {overlay && contextOpen && (
        <Layer
          position="right"
          full="vertical"
          onEsc={() => dispatch({ type: 'CLOSE_CONTEXT_PANEL' })}
          onClickOutside={() => dispatch({ type: 'CLOSE_CONTEXT_PANEL' })}
        >
          <ContextualPanel height="100%" round="none" width={PANEL_WIDTH} />
        </Layer>
      )}

      <FeedbackLayer />
      <ShellToast />
    </Box>
  );
};
