import React from 'react';
import Head from 'next/head';
import { Header } from 'aries-core';

const Index = () => (
  <div>
    <Head>
      <title>Aries | HPE Design System</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    <Header />
  </div>
);

export default Index;
