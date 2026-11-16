// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet } from 'grommet';
import { ShellProvider } from './contexts/ShellProvider';
import { Shell } from './components/Shell';
import { SurfaceContext, useSurface, variantFor } from './surfaces';
import { buildVariantTheme } from './theme';
import { Overview } from './preview/Overview';
import { PAGES } from './preview/pages';
import { PreviewBar } from './preview/PreviewBar';
import { StressTest } from './preview/StressTest';
import { usePreviewState } from './preview/usePreviewState';

// The root background is the architecture's `root` surface (decision
// 25-ii); Grommet derives light/dark from it.
const Root = ({ theme, themeMode, children }) => (
  <Grommet
    theme={theme}
    themeMode={themeMode}
    full
    background={useSurface('root')}
    options={{ box: { cssGap: true } }}
  >
    {children}
  </Grommet>
);

Root.propTypes = {
  theme: PropTypes.object.isRequired,
  themeMode: PropTypes.oneOf(['light', 'dark']).isRequired,
  children: PropTypes.node,
};

// One app for every preview. The bar on top picks the architecture, the
// page, and the annotation, page-theme and colour-mode switches; the state
// lives in the URL hash. The shell's own state sits above the page switch,
// so it survives a change of architecture or a visit to another tab.
const App = () => {
  const { state, update, hrefFor } = usePreviewState();
  const variant = variantFor(state.arch, state.grey);
  const themeMode = state.dark ? 'dark' : 'light';
  const page = PAGES.find(item => item.id === state.page) || PAGES[0];
  const theme = useMemo(() => buildVariantTheme(variant), [variant]);
  const surfaces = useMemo(
    () => ({
      arch: state.arch,
      variant,
      shell: page.shell || 'framed',
      mode: themeMode,
      grey: state.grey,
      annotate: state.notes,
    }),
    [state.arch, variant, page.shell, themeMode, state.grey, state.notes],
  );
  // The shell's own "Appearance" rail item drives the same switch.
  const setThemeMode = useCallback(
    mode => update({ dark: mode === 'dark' }),
    [update],
  );

  return (
    <SurfaceContext.Provider value={surfaces}>
      <Root theme={theme} themeMode={themeMode}>
        <ShellProvider themeMode={themeMode} setThemeMode={setThemeMode}>
          <Box fill>
            <PreviewBar state={state} update={update} hrefFor={hrefFor} />
            <Box flex overflow="hidden">
              {page.id === 'overview' && <Overview hrefFor={hrefFor} />}
              {page.shell && <Shell />}
              {page.layout && <StressTest layout={page.layout} />}
            </Box>
          </Box>
        </ShellProvider>
      </Root>
    </SurfaceContext.Provider>
  );
};

export default App;
