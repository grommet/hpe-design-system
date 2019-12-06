import React, { useEffect } from 'react';
import Router from 'next/router';
import Primer from './Primer';

const Index = () => {
  useEffect(() => {
    if (Router.pathname !== '/design/primer') {
      Router.push('/design/primer');
    }
  }, []);
  return <Primer />;
};

export default Index;
