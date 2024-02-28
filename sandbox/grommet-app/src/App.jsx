import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Box, Button, Grommet, Image } from 'grommet';
import { tokensTheme } from './theme';
import { Moon, Sun } from 'grommet-icons';

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  console.log(routes, normalizedPathName);
  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
    // @ts-ignore
    Element: pages[path].default,
    // @ts-ignore
    loader: pages[path]?.loader | undefined,
    // @ts-ignore
    action: pages[path]?.action | undefined,
    // @ts-ignore
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    // @ts-ignore
    element: <Element />,
    // @ts-ignore
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
);

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
      <RouterProvider router={router} />
    </Grommet>
  );
};

export default App;
