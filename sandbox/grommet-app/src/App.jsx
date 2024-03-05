import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Button, Grommet, Image } from 'grommet';
import { tokensTheme } from './theme';
import { Moon, Sun } from 'grommet-icons';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';
import NextDashboard from './pages/next/index';
import { Login } from './Login';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('design-tokens-demo') || false,
  );

  useEffect(() => {
    if (localStorage.getItem('design-tokens-demo')) setAuthenticated(true);
  }, []);

  return (
    <Grommet
      theme={tokensTheme}
      // background="background-back"
      full="min"
      themeMode={darkMode ? 'dark' : 'light'}
      options={{
        box: {
          cssGap: true,
        },
      }}
    >
      {authenticated ? (
        <>
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
            <Button
              icon={darkMode ? <Moon /> : <Sun />}
              onClick={() => setDarkMode(!darkMode)}
            />
          </Box>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/next" element={<NextDashboard />} />
            </Routes>
          </BrowserRouter>
        </>
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </Grommet>
  );
};

export default App;
