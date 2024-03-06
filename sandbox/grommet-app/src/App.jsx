import { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Button, Grommet, Image, CheckBox, FormField } from 'grommet';
import { tokensTheme } from './theme';
import { Moon, Sun } from 'grommet-icons';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import { Login } from './Login';

export const BackgroundContext = createContext({});

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('design-tokens-demo') || false,
  );

  useEffect(() => {
    if (localStorage.getItem('design-tokens-demo')) setAuthenticated(true);
  }, []);

  const [backgroundBack, setBackgroundBack] = useState(false);
  const contextValue = useMemo(() => ({ backgroundBack }), [backgroundBack]);

  return (
    <Grommet
      theme={tokensTheme}
      background={backgroundBack ? 'background-back' : undefined}
      full="min"
      themeMode={darkMode ? 'dark' : 'light'}
      options={{
        box: {
          cssGap: true,
        },
      }}
    >
      {authenticated ? (
        <BackgroundContext.Provider value={contextValue}>
          <Box
            direction="row"
            justify="between"
            align="center"
            background="background-front"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            border={{ color: 'border-weak', side: 'bottom' }}
          >
            <Box height="32px" align="start">
              <Image
                src={`/hpe_greenlake_grn_${darkMode ? 'rev' : 'pos'}_rgb.svg`}
                fit="contain"
              />
            </Box>
            <Box align="center" direction="row" gap="small">
              <FormField>
                <CheckBox
                  label="background-back"
                  toggle
                  onChange={event => setBackgroundBack(event.target.checked)}
                />
              </FormField>
              <Button
                icon={darkMode ? <Moon /> : <Sun />}
                onClick={() => setDarkMode(!darkMode)}
              />
            </Box>
          </Box>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/next" element={<NextDashboard />} />
            </Routes>
          </BrowserRouter>
        </BackgroundContext.Provider>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Grommet>
  );
};

export default App;
