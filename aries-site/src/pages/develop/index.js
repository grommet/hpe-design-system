import React, { useEffect } from 'react';
import Router from 'next/router';
import Code from './code';

const Index = () => {
  useEffect(() => {
    if (Router.pathname !== '/develop/code') {
      Router.push('/develop/code');
    }
  }, []);
  return <Code />;
};

export default Index;
