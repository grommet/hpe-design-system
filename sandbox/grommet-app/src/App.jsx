import { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { themes } from './themes/theme';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import StickerSheet from './pages/sticker-sheet/index';
import Refresh from './pages/refresh/index';
import { Login } from './Login';
import { GlobalHeader } from './components/GlobalHeader';
import { FloatingActionButton } from './components';
import { HPEGreenLakeBadge } from './components/HPEGreenLakeBadge';
// import { useLoading } from './utils/skeleton';
import './app.css';

export const BackgroundContext = createContext({});
export const WorkspaceContext = createContext({});

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
    localStorage.getItem('backgroundBack') === 'true' || false,
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

  // const loading = useLoading(6000);
  const loading = false; // Temp disabling for sticker sheet

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
              <GlobalHeader
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setActiveTheme={setActiveTheme}
                activeTheme={activeTheme}
                backgroundBack={backgroundBack}
                setBackgroundBack={setBackgroundBack}
                workspace={workspace}
                setWorkspace={setWorkspace}
              />
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      workspace === 'Acme Production' ? (
                        <Home />
                      ) : (
                        <NextDashboard />
                      )
                    }
                  />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/sticker-sheet" element={<StickerSheet />} />
                  <Route path="/refresh" element={<Refresh />} />
                </Routes>
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
