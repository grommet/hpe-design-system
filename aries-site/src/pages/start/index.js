import React, { useEffect } from 'react';
import Router from 'next/router';
import About from './about';

const Index = () => {
  useEffect(() => {
    if (Router.pathname !== '/start/about') {
      Router.push('/start/about');
    }
  }, []);
  return <About />;
};

export default Index;
