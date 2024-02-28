import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Button, Grommet, Image } from 'grommet';
import { tokensTheme } from './theme';
import { Moon, Sun } from 'grommet-icons';
import Sustainability from './pages/sustainability/index';
import Home from './pages/index';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Grommet
      theme={tokensTheme}
      // background="background-back"
      full="min"
      themeMode={darkMode ? 'dark' : 'light'}
    >
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
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
};

export default App;
