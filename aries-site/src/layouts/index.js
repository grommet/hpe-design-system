import React from 'react';
import { Grommet, grommet, Box } from 'grommet';
import { AnchorGroup, Nav } from 'aries-core';
import Head from 'next/head';

export const Layout = ({ children }) => (
  <Grommet theme={grommet} full>
    <Box>
      <Head>
        <title>Aries | HPE Design System</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Nav title="Aries">
        <AnchorGroup
          items={[
            { label: 'Start' },
            { label: 'Elements' },
            { label: 'Components' },
            { label: 'Layouts' },
            { label: 'Templates' },
          ]}
        />
      </Nav>
      {children}
    </Box>
  </Grommet>
);
