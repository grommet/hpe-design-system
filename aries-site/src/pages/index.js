import React, { useEffect } from 'react';
import { initialize, pageview } from 'react-ga';
import { Config } from '../../config';

import About from './start/about';
// import Landing from './landing/landing';

const Index = () => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  // return <Landing />;
  return <About />;
};

export default Index;
