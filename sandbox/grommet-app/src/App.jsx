import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { themes } from './themes/theme';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import StickerSheet from './pages/sticker-sheet/index';
import { Layouts, routes as layoutRoutes } from './pages/layouts';
import { Login } from './Login';
import { GlobalHeader } from './components/GlobalHeader';
import { FloatingActionButton } from './components';
import { HPEGreenLakeBadge } from './components/HPEGreenLakeBadge';
import {
  BackgroundContext,
  SupportingContext,
  WorkspaceContext,
} from './contexts';
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

  const [workspace, setWorkspace] = useState('Acme Production');
  const workspaceContextValue = useMemo(() => ({ workspace }), [workspace]);

  const [showSupporting, setShowSupporting] = useState(false);
  const supportingContextValue = useMemo(
    () => ({ showSupporting, setShowSupporting }),
    [showSupporting],
  );

  const loading = useLoading(6000);

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
              <SupportingContext.Provider value={supportingContextValue}>
                <BrowserRouter>
                  <Box direction="row">
                    <Box flex>
                      <GlobalHeader
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        setActiveTheme={setActiveTheme}
                        activeTheme={activeTheme}
                        backgroundBack={backgroundBack}
                        setBackgroundBack={setBackgroundBack}
                        workspace={workspace}
                        setWorkspace={setWorkspace}
                        style={{ position: 'relative', zIndex: 1 }}
                      />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                          path="/sustainability"
                          element={<Sustainability />}
                        />
                        <Route
                          path="/sticker-sheet"
                          element={<StickerSheet />}
                        />
                        <Route path="/layouts" element={<Layouts />}>
                          {layoutRoutes}
                        </Route>
                      </Routes>
                    </Box>
                    {showSupporting ? showSupporting : undefined}
                  </Box>
                </BrowserRouter>
              </SupportingContext.Provider>
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
