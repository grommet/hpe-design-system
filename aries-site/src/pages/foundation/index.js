import React, { useEffect } from 'react';
import Router from 'next/router';
import Primer from './primer';

const Index = () => {
  useEffect(() => {
    if (Router.pathname !== '/foundation/primer') {
      Router.push('/foundation/primer');
    }
  }, []);
  return <Primer />;
};

export default Index;
