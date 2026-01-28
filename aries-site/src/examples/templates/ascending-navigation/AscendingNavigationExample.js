/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Header,
  PageContent,
  PageHeader,
} from 'grommet';
import { Left, Home } from '@hpe-design/icons-grommet';
import { HomeContent } from './components/HomeContent';
import { PageOneContent } from './components/PageOneContent';
import { PageTwoContent } from './components/PageTwoContent';
import { PageThreeContent } from './components/PageThreeContent';
import { sectionConfig } from './data/sections';

export const AscendingNavigationExample = () => {
  const [activePage, setActivePage] = useState('pageOne');

  const page = sectionConfig[activePage];

  const sectionContent = {
    home: <HomeContent onNavigate={setActivePage} />,
    pageOne: <PageOneContent onNavigate={setActivePage} />,
    pageTwo: <PageTwoContent onNavigate={setActivePage} />,
    pageThree: <PageThreeContent onNavigate={setActivePage} />,
  };

  return (
    <>
      <Header
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="background-front"
      >
        <Button
          default
          icon={<Home aria-hidden="true" />}
          onClick={() => setActivePage('home')}
          a11yTitle="Go to Home page"
        />
      </Header>
      <Box>
        <PageContent gap="small">
          <PageHeader
            title={page.label}
            subtitle={page.subtitle}
            parent={
              activePage !== 'home' ? (
                <Anchor
                  label="Home"
                  icon={<Left />}
                  onClick={() => setActivePage('home')}
                />
              ) : undefined
            }
            actions={
              activePage !== 'home' && <Button label="Primary" primary />
            }
          />
          <Box gap="small">{sectionContent[activePage]}</Box>
        </PageContent>
      </Box>
    </>
  );
};
