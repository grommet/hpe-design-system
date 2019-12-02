import React, { useEffect } from 'react';
import { initialize, pageview } from 'react-ga';
import { Config } from '../../config';

import About from './start/about';

const Index = () => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  return <About />;
};

export default Index;
