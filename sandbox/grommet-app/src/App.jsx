import { createContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Box,
  Button,
  Grommet,
  Image,
  CheckBox,
  FormField,
  Select,
} from 'grommet';
import { current, warm } from './theme';
import { Moon, Sun } from 'grommet-icons';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import { Login } from './Login';

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
            <Box align="end" direction="row" gap="small">
              <FormField
                // label="Theme"
                contentProps={{
                  margin: { bottom: 'none', top: 'none' },
                  width: 'small',
                }}
              >
                <Select
                  options={['Current theme', 'Warm theme']}
                  value={activeTheme}
                  onChange={({ value }) => setActiveTheme(value)}
                />
              </FormField>
              <FormField
                // label="Background style"
                contentProps={{ margin: { bottom: 'none', top: 'none' } }}
              >
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
