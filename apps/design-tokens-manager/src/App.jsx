import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, Grid, Grommet, Nav } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Header } from './components';
import { Visualizer } from './routes/Visualizer';
// import { Builder } from './routes/Builder';
// import { Docs } from './routes/Docs';
import { Scaler } from './routes/Scaler/index';
import { Home, Optimize, Sidebar } from '@hpe-design/icons-grommet';
// TODO replace with DS icon package when available
import { Github } from 'grommet-icons';

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
      options={{
        box: {
          cssGap: true,
        },
      }}
    >
      <BrowserRouter>
        <Box background="background-contrast">
          <Grid columns={['auto', 'flex']}>
            <Box pad="medium" gap="medium">
              <Button icon={<Sidebar />} />
              <Nav gap="xsmall">
                <Button as={Link} icon={<Home />} tip="Home" to="/" />
                <Button
                  as={Link}
                  icon={<Optimize />}
                  tip="Scale generator"
                  to="/scaler"
                />
                <Button
                  icon={<Github />}
                  href="https://github.com/grommet/hpe-design-system/tree/design-tokens-alpha/design-tokens/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  tip="View tokens in Github"
                />
              </Nav>
            </Box>
            <Box
              background="background-back"
              round={{ corner: 'left', size: 'small' }}
              overflow="hidden"
            >
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <Routes>
                <Route path="/" element={<Visualizer />} />
                {/* <Route path="/builder" element={<Builder />} /> */}
                <Route path="/visualizer" element={<Visualizer />} />
                <Route path="/scaler" element={<Scaler />} />
              </Routes>
            </Box>
          </Grid>
        </Box>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
