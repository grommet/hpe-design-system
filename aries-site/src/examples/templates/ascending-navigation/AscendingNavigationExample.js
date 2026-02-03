/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Anchor, Box, Button, PageContent, PageHeader } from 'grommet';
import { Left, Home } from '@hpe-design/icons-grommet';
import { HomeContent } from './components/HomeContent';
import { PageOneContent } from './components/PageOneContent';
import { PageTwoContent } from './components/PageTwoContent';
import { sectionConfig } from './data/sections';

export const AscendingNavigationExample = () => {
  const [activePage, setActivePage] = useState('pageOne');

  const page = sectionConfig[activePage];

  const sectionContent = {
    home: <HomeContent onNavigate={setActivePage} />,
    pageOne: <PageOneContent onNavigate={setActivePage} />,
    pageTwo: <PageTwoContent onNavigate={setActivePage} />,
  };

  return (
    <PageContent gap="xsmall" kind="full">
      <Box width="xlarge">
        <PageHeader
          title={page.label}
          subtitle={page.subtitle}
          size="large"
          parent={
            activePage !== 'home' ? (
              <Anchor
                label="Identity & access"
                icon={<Left />}
                onClick={() => setActivePage('home')}
              />
            ) : undefined
          }
          actions={
            activePage !== 'home' && <Button label="Primary action" primary />
          }
        />
        <Box gap="small">{sectionContent[activePage]}</Box>
      </Box>
    </PageContent>
  );
};
