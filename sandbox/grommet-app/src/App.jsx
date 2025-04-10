import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet, Box, ThemeContext } from 'grommet';
import { themes } from './themes/theme';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import StickerSheet from './pages/sticker-sheet/index';
import { Layouts, routes as layoutRoutes } from './pages/layouts';
import { Login } from './Login';
import { GlobalHeader } from './components/GlobalHeader';
import { FloatingActionButton } from './components';
import { HPEGreenLakeBadge } from './components/HPEGreenLakeBadge';
import { BackgroundContext, WorkspaceContext } from './contexts';
import { useLoading } from './utils/skeleton';
import './app.css';

const appHeaderHeight = '60px';
export const appHeight = `calc(100vh - ${appHeaderHeight})`;

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('design-tokens-demo') || false,
  );
  useEffect(() => {
    if (localStorage.getItem('design-tokens-demo')) setAuthenticated(true);
  }, []);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false,
  );
  useEffect(() => {
    if (darkMode) localStorage.setItem('darkMode', 'true');
    else localStorage.setItem('darkMode', 'false');
  }, [darkMode]);

  const [backgroundBack, setBackgroundBack] = useState(
    localStorage.getItem('backgroundBack') === 'true' || true,
  );
  useEffect(() => {
    if (backgroundBack) localStorage.setItem('backgroundBack', 'true');
    else localStorage.setItem('backgroundBack', 'false');
  }, [backgroundBack]);

  const contextValue = useMemo(() => ({ backgroundBack }), [backgroundBack]);
  const [activeTheme, setActiveTheme] = useState(Object.keys(themes)[0]);
  const theme = useMemo(() => themes[activeTheme], [activeTheme]);
  const [density, setDensity] = useState('default');
  const [workspace, setWorkspace] = useState('Acme Production');
  const workspaceContextValue = useMemo(() => ({ workspace }), [workspace]);

  const loading = useLoading(6000);

  // Assess with hpe-design-tokens to mirror non-Grommet product teams
  const densityContextValue = useMemo(() => {
    if (density === 'compact')
      return {
        global: {
          edgeSize: {
            none: '0px',
            hair: '1px',
            '5xsmall': '2px',
            '4xsmall': '3px',
            '3xsmall': '4px',
            xxsmall: '6px',
            xsmall: '8px',
            small: '12px',
            medium: '16px',
            large: '24px',
            xlarge: '32px',
            xxlarge: '48px',
            '3xlarge': '64px',
            responsiveBreakpoint: 'small',
          },
        },
      };
    // else if (density === 'spacious')
    //   return {
    //     global: {
    //       edgeSize: {
    //         none: '0px',
    //         hair: '1px',
    //         '5xsmall': '4px',
    //         '4xsmall': '6px',
    //         '3xsmall': '8px',
    //         xxsmall: '12px',
    //         xsmall: '16px',
    //         small: '24px',
    //         medium: '32px',
    //         large: '48px',
    //         xlarge: '64px',
    //         xxlarge: '96px',
    //         '3xlarge': '112px', // TO DO get proper value
    //         responsiveBreakpoint: 'small',
    //       },
    //     },
    //   };
    if (density === 'default')
      return {
        global: {
          edgeSize: {
            none: '0px',
            hair: '1px',
            '5xsmall': '3px',
            '4xsmall': '4px',
            '3xsmall': '6px',
            xxsmall: '8px',
            xsmall: '12px',
            small: '16px',
            medium: '24px',
            large: '32px',
            xlarge: '48px',
            xxlarge: '64px',
            '3xlarge': '96px',
            responsiveBreakpoint: 'small',
          },
        },
      };
    return {};
  }, [density]);

  return (
    <Grommet
      theme={theme}
      background={backgroundBack ? 'background-back' : undefined}
      full="min"
      themeMode={darkMode ? 'dark' : 'light'}
      options={{
        box: {
          cssGap: true,
        },
      }}
      style={{ display: 'relative' }}
    >
      {authenticated ? (
        loading ? (
          <Box
            background="background"
            align="center"
            justify="center"
            height="100vh"
            // wait for badge animation to complete
            animation={{ type: 'fadeOut', delay: 5500, duration: 350 }}
          >
            <HPEGreenLakeBadge />
          </Box>
        ) : (
          <BackgroundContext.Provider value={contextValue}>
            <WorkspaceContext.Provider value={workspaceContextValue}>
              <BrowserRouter>
                <ThemeContext.Extend
                  value={{
                    global: {
                      edgeSize: {
                        none: '0px',
                        hair: '1px',
                        '5xsmall': '3px',
                        '4xsmall': '4px',
                        '3xsmall': '6px',
                        xxsmall: '8px',
                        xsmall: '12px',
                        small: '16px',
                        medium: '24px',
                        large: '32px',
                        xlarge: '48px',
                        xxlarge: '64px',
                        '3xlarge': '96px',
                        responsiveBreakpoint: 'small',
                      },
                    },
                  }}
                >
                  <GlobalHeader
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    setActiveTheme={setActiveTheme}
                    activeTheme={activeTheme}
                    backgroundBack={backgroundBack}
                    setBackgroundBack={setBackgroundBack}
                    workspace={workspace}
                    setWorkspace={setWorkspace}
                    density={density}
                    setDensity={setDensity}
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                </ThemeContext.Extend>
                <ThemeContext.Extend value={densityContextValue}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/sustainability"
                      element={<Sustainability />}
                    />
                    <Route path="/sticker-sheet" element={<StickerSheet />} />
                    <Route path="/layouts" element={<Layouts />}>
                      {layoutRoutes}
                    </Route>
                  </Routes>
                </ThemeContext.Extend>
              </BrowserRouter>
              {window.location.pathname === '/next' ? (
                <FloatingActionButton label="Ask HPE" />
              ) : undefined}
            </WorkspaceContext.Provider>
          </BackgroundContext.Provider>
        )
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Grommet>
  );
};

export default App;
