import { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import { current, warm } from './theme';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import { Login } from './Login';
import { GlobalHeader } from './components/GlobalHeader';
import { FloatingActionButton } from './components';
import { HPEGreenLakeBadge } from './components/HPEGreenLakeBadge';
import './app.css';
import { useLoading } from './utils/skeleton';

export const BackgroundContext = createContext({});

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

  const loading = useLoading(4000);
  const contextValue = useMemo(() => ({ backgroundBack }), [backgroundBack]);
  const [activeTheme, setActiveTheme] = useState('Current theme');
  const theme = useMemo(
    () => (activeTheme === 'Current theme' ? current : warm),
    [activeTheme],
  );

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
            animation={{ type: 'fadeOut', delay: 3500, duration: 350 }}
          >
            <HPEGreenLakeBadge />
          </Box>
        ) : (
          <BackgroundContext.Provider value={contextValue}>
            <GlobalHeader
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setActiveTheme={setActiveTheme}
              activeTheme={activeTheme}
              backgroundBack={backgroundBack}
              setBackgroundBack={setBackgroundBack}
            />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/next" element={<NextDashboard />} />
              </Routes>
            </BrowserRouter>
            {window.location.pathname === '/next' ? (
              <FloatingActionButton label="Ask HPE" />
            ) : undefined}
          </BackgroundContext.Provider>
        )
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Grommet>
  );
};

export default App;
