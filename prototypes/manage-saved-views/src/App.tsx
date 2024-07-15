import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Grommet, GrommetProps, Box, SkipLink, SkipLinks } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Login } from "./Login";
import { AppHeader } from "./components";
import { router } from "./router";
import { modeTransition } from "./utils";

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(
    localStorage.getItem(import.meta.env.VITE_LOGIN_KEY) === 'true' || false);
  const [themeMode, setThemeMode] = useState<GrommetProps["themeMode"]>("auto");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOGIN_KEY)) setAuthenticated(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(false);
    }, modeTransition.duration);
    setAnimate(true);
    return () => clearTimeout(timer);
  }, [themeMode]);

  return (
    <Grommet
      theme={hpe}
      full
      background="background-back"
      themeMode={themeMode}
    >
      <SkipLinks>
        <SkipLink id="main" label="Skip to main content" />
      </SkipLinks>
      <AppHeader
        name="ACME Cloud"
        themeMode={{ themeMode, setThemeMode }}
        animation={animate ? modeTransition.animation({ delay: 0 }) : undefined}
      />
      <Box id="main" as="main" animation={animate ? modeTransition.animation({ delay: 300 }) : undefined}>
        {authenticated ? (
          <Routes>
            {router.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
          </Routes>) : (
          <Login setAuthenticated={setAuthenticated} />
        )}
      </Box>
    </ Grommet>
  );
}

export default App;