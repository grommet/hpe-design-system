// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import {
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
import { Surface } from './common';
import { useSurfaceVariant } from '../surfaces';
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
// The anatomy is the same in both arrangements; the surfaces differ.
//
// Framed (#6708): chrome wraps the page. The rail is the darkest layer
// (contrast over the grey chrome), the local nav sits on the grey chrome,
// and header + content share a white "sheet", as does the contextual panel.
//
// Beside (#6635, #6660): chrome sits on the page. The page is the root and
// stays visible all round; the rail, the local nav and the contextual
// panel are rounded containers on it, inset from the window edge and from
// each other, and the header and content have no surface of their own.
const INSET = 'xsmall';
const PANEL_ROUND = 'large';
const SHEET_ROUND = 'xlarge';

// What differs between the two arrangements, part by part. Beside, the
// shell's ground and the sheet take no surface: the Grommet root already
// paints the page, and painting it again would nest a token in itself.
const ARRANGEMENTS = {
  framed: {
    ground: 'chrome',
    sheet: 'sheet',
    rail: {},
    nav: {},
    context: {},
    contextGap: 'small',
  },
  beside: {
    rail: { surface: 'chrome', round: PANEL_ROUND, margin: INSET },
    nav: {
      surface: 'chrome',
      round: PANEL_ROUND,
      margin: { vertical: INSET },
    },
    navGap: INSET,
    context: {
      round: PANEL_ROUND,
      margin: { vertical: INSET, right: INSET },
    },
    contextGap: INSET,
  },
};

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
  const { shell } = useSurfaceVariant();
  const parts = ARRANGEMENTS[shell];
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
  // Framed, the sheet is rounded where it meets the chrome. Beside, it is
  // the page itself and has no edge to round.
  let sheetRound;
  if (shell === 'framed')
    sheetRound =
      contextPanel && !overlay
        ? SHEET_ROUND
        : { corner: 'left', size: SHEET_ROUND };

  return (
    <Surface role={parts.ground} direction="row" flex overflow="hidden">
      <SkipLinks id="skip-links">
        <SkipLink id={MAIN_ID} label="Skip to main content" />
      </SkipLinks>

      <GlobalRail {...parts.rail} />

      {/* Panels slide open and closed; the outgoing panel stays rendered
          until the motion finishes. */}
      {!overlay && (
        <SlidePanel
          open={navVisible}
          side="left"
          width={navWidth}
          gap={parts.navGap}
          bounds={PANEL_SIZES.nav}
          onResize={setWidth('nav')}
          onReset={() => setWidth('nav')(PANEL_SIZES.nav.default)}
          resizeLabel="Resize navigation"
        >
          <LocalNav panel={renderedNav} {...parts.nav} />
        </SlidePanel>
      )}

      <Surface
        role={parts.sheet}
        flex
        round={sheetRound}
        overflow="hidden"
        responsive="container"
      >
        <GlobalHeader />
        <SkipLinkTarget id={MAIN_ID} />
        <Main flex overflow={{ vertical: 'auto' }}>
          {fullscreen ? <CopilotPanel fullscreen /> : <CurrentPage />}
        </Main>
      </Surface>

      {!overlay && (
        <SlidePanel
          open={contextOpen}
          side="right"
          width={contextWidth}
          gap={parts.contextGap}
          bounds={PANEL_SIZES.context}
          onResize={setWidth('context')}
          onReset={() => setWidth('context')(PANEL_SIZES.context.default)}
          resizeLabel="Resize panel"
        >
          <ContextualPanel panel={renderedContext} {...parts.context} />
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
            surface="overlayNav"
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
    </Surface>
  );
};
