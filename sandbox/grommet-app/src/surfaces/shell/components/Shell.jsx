// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
import { Surface } from './common';
import { useSurface } from '../surfaces';
import { TOKENS } from '../../surfaceState';
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

// `layout`: framed (chrome wraps a rounded sheet, #6708) or beside (rail and
// nav sit beside a flat page, as the overview dashboard template). `height`
// lets the shell fill a validation page instead of the viewport.
export const Shell = ({ layout = 'framed', height = '100vh' }) => {
  const beside = layout === 'beside';
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
  const overlayNavSurface = useSurface('overlayNav');

  const navPanelEl = !overlay && (
    <SlidePanel
      open={navVisible}
      side="left"
      width={navWidth}
      gap={beside ? 'small' : undefined}
      bounds={PANEL_SIZES.nav}
      onResize={setWidth('nav')}
      onReset={() => setWidth('nav')(PANEL_SIZES.nav.default)}
      resizeLabel="Resize navigation"
    >
      <LocalNav
        panel={renderedNav}
        {...(beside && {
          background: TOKENS.tone1,
          surfaceRole: 'card',
          round: 'medium',
          'data-surface-token': TOKENS.tone1,
          'data-surface-label': 'shell · nav panel',
        })}
      />
    </SlidePanel>
  );

  const contextPanelEl = !overlay && (
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
      <ContextualPanel
        panel={renderedContext}
        {...(beside && { round: 'medium' })}
      />
    </SlidePanel>
  );

  const main = (
    <Main flex overflow={{ vertical: 'auto' }}>
      {fullscreen ? <CopilotPanel fullscreen /> : <CurrentPage />}
    </Main>
  );

  const overlays = (
    <>
      {overlay && navVisible && (
        <Layer
          position="left"
          full="vertical"
          onEsc={() => dispatch({ type: 'TOGGLE_NAV' })}
          onClickOutside={() => dispatch({ type: 'TOGGLE_NAV' })}
        >
          <LocalNav
            onClose={() => dispatch({ type: 'TOGGLE_NAV' })}
            background={overlayNavSurface}
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
    </>
  );

  // Beside: the rail is docked left (tone-1); to its right the header spans
  // the page, and the nav and contextual panels are rounded tone-1
  // containers sitting on the page beside the content, like the cards.
  if (beside) {
    return (
      <Surface
        role="chrome"
        label="shell · page (beside)"
        direction="row"
        height={height}
        overflow="hidden"
      >
        <SkipLinks id="skip-links">
          <SkipLink id={MAIN_ID} label="Skip to main content" />
        </SkipLinks>
        <GlobalRail
          background={TOKENS.tone1}
          data-surface-token={TOKENS.tone1}
          data-surface-label="shell · rail"
        />
        <Box flex overflow="hidden" responsive="container">
          <GlobalHeader />
          <SkipLinkTarget id={MAIN_ID} />
          <Box
            direction="row"
            flex
            overflow="hidden"
            pad={{ horizontal: 'small', bottom: 'small' }}
          >
            {navPanelEl}
            <Surface
              role="sheet"
              label="shell · page content"
              flex
              overflow="hidden"
            >
              {main}
            </Surface>
            {contextPanelEl}
          </Box>
        </Box>
        {overlays}
      </Surface>
    );
  }

  return (
    <Surface
      role="chrome"
      label="shell · chrome"
      direction="row"
      height={height}
      overflow="hidden"
    >
      <SkipLinks id="skip-links">
        <SkipLink id={MAIN_ID} label="Skip to main content" />
      </SkipLinks>

      <GlobalRail />

      {/* Panels slide open and closed; the outgoing panel stays rendered
          until the motion finishes. */}
      {navPanelEl}

      <Surface
        role="sheet"
        label="shell · sheet"
        flex
        round={
          overlay
            ? 'none'
            : contextPanel
              ? 'xlarge'
              : { corner: 'left', size: 'xlarge' }
        }
        overflow="hidden"
        responsive="container"
      >
        <GlobalHeader />
        <SkipLinkTarget id={MAIN_ID} />
        {main}
      </Surface>

      {contextPanelEl}
      {overlays}
    </Surface>
  );
};

Shell.propTypes = {
  layout: PropTypes.oneOf(['framed', 'beside']),
  height: PropTypes.string,
};
