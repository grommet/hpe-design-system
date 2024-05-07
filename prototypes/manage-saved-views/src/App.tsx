import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Grommet, GrommetProps, Main, SkipLink, SkipLinks } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { AppHeader } from "./components";
import { router } from "./router";
import { modeTransition } from "./utils";

function App() {
  const [themeMode, setThemeMode] = useState<GrommetProps["themeMode"]>("auto");
  const [animate, setAnimate] = useState(false);

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
      full="min"
      background="background-back"
      themeMode={themeMode}
    >
      <SkipLinks>
        <SkipLink id="main" label="Skip to main content" />
      </SkipLinks>
      <AppHeader name="ACME Cloud" themeMode={{ themeMode, setThemeMode }} animation={animate && modeTransition.animation({ delay: 0 })} />
      <Main id="main" animation={animate && modeTransition.animation({ delay: 300 })}>
        <Routes>
          {router.map((route) => <Route {...route} key={route.path} />)}
        </Routes>
      </Main>
    </Grommet>
  );
}

export default App;