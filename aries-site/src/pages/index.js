import React from 'react';
import Head from 'next/head';
import { Header } from 'aries-core';

const Index = () => (
  <div>
    <Head>
      <title>Aries | HPE Design System</title>
      <link rel="icon" href="/static/favicon.ico" />
    </Head>
    <Header />
  </div>
);

export default Index;
