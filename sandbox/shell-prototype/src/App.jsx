// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import { Grommet } from 'grommet';
import { ShellProvider } from './contexts/ShellProvider';
import { Shell } from './components/Shell';
import { shellTheme } from './theme';

// themeMode lives at the Grommet root; the "Appearance" rail item toggles it.
const App = () => {
  const [themeMode, setThemeMode] = useState('light');
  return (
    <Grommet
      theme={shellTheme}
      themeMode={themeMode}
      full
      background="shell-page"
      options={{ box: { cssGap: true } }}
    >
      <ShellProvider themeMode={themeMode} setThemeMode={setThemeMode}>
        <Shell />
      </ShellProvider>
    </Grommet>
  );
};

export default App;
