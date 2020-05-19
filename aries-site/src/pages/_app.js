import React from 'react';
import { ThemeMode } from '../layouts';

function App({ Component, pageProps }) {
  return (
    // need to wrap Component here so that
    // scroll position is correct when link
    // or search suggestion directs to a hash
    <ThemeMode>
      <Component {...pageProps} />
    </ThemeMode>
  );
}

export default App;
