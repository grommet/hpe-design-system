import React, { useEffect } from 'react';
import Router from 'next/router';
import Examples from './examples';

const Index = () => {
  useEffect(() => {
    if (Router.pathname !== '/resources/examples') {
      Router.push('/resources/examples');
    }
  }, []);
  return <Examples />;
};

export default Index;
