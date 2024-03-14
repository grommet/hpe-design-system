import { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import { current, warm } from './theme';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import { Login } from './Login';
import { GlobalHeader } from './components/GlobalHeader';
import { FloatingActionButton } from './components';

export const BackgroundContext = createContext({});

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('design-tokens-demo') || false,
  );
  useEffect(() => {
    if (localStorage.getItem('design-tokens-demo')) setAuthenticated(true);
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [backgroundBack, setBackgroundBack] = useState(false);

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
        <BackgroundContext.Provider value={contextValue}>
          <GlobalHeader
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setActiveTheme={setActiveTheme}
            activeTheme={activeTheme}
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
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Grommet>
  );
};

export default App;
