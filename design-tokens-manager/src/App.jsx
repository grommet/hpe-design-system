import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Grommet, Header, Button, Box, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import tokens from 'design-tokens/tree';
import { Github, Moon, Sun } from 'grommet-icons';
import { Visualizer } from './routes/Visualizer';
import { Builder } from './routes/Builder';
import { Docs } from './routes/Docs';

const tokensArr = [];
Object.keys(tokens).forEach(mode => {
  Object.keys(tokens[mode]).forEach(token =>
    tokensArr.push({
      name: token,
      mode: mode,
      ...tokens[mode][token],
    }),
  );
});

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false,
  );
  useEffect(() => {
    if (darkMode) localStorage.setItem('darkMode', 'true');
    else localStorage.setItem('darkMode', 'false');
  }, [darkMode]);

  return (
    <Grommet
      background="background-back"
      theme={hpe}
      themeMode={darkMode ? 'dark' : 'light'}
      full="min"
    >
      <BrowserRouter>
        <Header
          background="background-front"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          border={{ side: 'bottom', color: 'border-weak' }}
        >
          <Button as={Link} to="/">
            <Text weight={500} color="text-strong">
              Design Token Manager
            </Text>
          </Button>
          <Box direction="row" gap="xsmall">
            <Button as={Link} to="/visualizer" label="Token Visualizer" />
            <Button as={Link} to="/builder" label="Token builder" />
            <Button
              icon={<Github />}
              href="https://github.com/grommet/hpe-design-system/tree/design-tokens-alpha/design-tokens/tokens"
              target="_blank"
              rel="noopener noreferrer"
              tip="View tokens in Github"
            />
            <Button
              icon={darkMode ? <Moon /> : <Sun />}
              onClick={() => setDarkMode(!darkMode)}
              tip={`Swith to ${darkMode ? 'light' : 'dark'} mode`}
            />
          </Box>
        </Header>
        <Routes>
          <Route path="/" element={<Docs />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/visualizer" element={<Visualizer />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;