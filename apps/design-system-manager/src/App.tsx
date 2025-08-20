import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

import { router } from './router';
import { AppLayout, RequireAuth } from './components';
import { Home, SignIn, SignUp } from './pages';
import { PocketProvider } from './contexts';

function App() {
  return (
    <Grommet
      theme={hpe}
      themeMode="auto"
      background="background-front"
      full="min"
      options={{ box: { cssGap: true } }}
    >
      <PocketProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />   
                {router.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Route>
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </PocketProvider>
    </Grommet>
  );
}

export default App;
