import React from 'react';
import { ThemeMode } from '../layouts';

function App({ Component, pageProps }) {
  return (
    <ThemeMode>
      <Component {...pageProps} />
    </ThemeMode>
  );
}

export default App;
