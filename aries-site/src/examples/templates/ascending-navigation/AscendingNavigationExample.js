/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Nav,
  Anchor,
  Header,
  PageContent,
  PageHeader,
  Text,
  Paragraph,
  Button,
} from 'grommet';
import { Left, Home } from '@hpe-design/icons-grommet';

import { NavigationButton } from './components/NavigationButton';
import { HomeContent } from './components/HomeContent';
import { sections, sectionConfig } from './data/sections';

export const AscendingNavigationExample = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const config = sectionConfig[activeSection];

  const sectionContent = {
    home: <HomeContent onNavigate={setActiveSection} />,
    overview: (
      <Paragraph>
        This overview page can describe the purpose of your app or design
        system. It's a child of the Home page.
      </Paragraph>
    ),
    components: (
      <>
        <Text weight="bold">Components in use in this example:</Text>
        <Paragraph margin="none">• Page, PageContent, PageHeader</Paragraph>
        <Paragraph margin="none">• Box, Header, Nav, Button</Paragraph>
        <Paragraph margin="none">• Text, Paragraph, Anchor</Paragraph>
      </>
    ),
    help: (
      <>
        <Text weight="bold">To create this demo application:</Text>
        <Paragraph margin="none">1. Create a React sandbox.</Paragraph>
        <Paragraph margin="none">
          2. Install <code>grommet</code>, <code>grommet-theme-hpe</code>,{' '}
          <code>@hpe-design/icons-grommet</code>.
        </Paragraph>
      </>
    ),
  };

  return (
    <Box
      background="background-back"
      width="full"
      border={{ color: 'border', size: 'xsmall' }}
      pad={{ bottom: 'xlarge' }}
    >
      <Header
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="background-front"
      >
        <Button
          default
          icon={<Home />}
          onClick={() => setActiveSection('home')}
          hoverIndicator="background"
          a11yTitle="Go to Home page"
        />

        <Nav direction="row" gap="xxsmall">
          {sections.map(section => (
            <NavigationButton
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onClick={setActiveSection}
            />
          ))}
        </Nav>
      </Header>
      <Box>
        <PageContent gap="small">
          <PageHeader
            title={config.label}
            subtitle={config.subtitle}
            parent={
              activeSection !== 'home' ? (
                <Anchor
                  label="Home"
                  icon={<Left />}
                  onClick={() => setActiveSection('home')}
                />
              ) : undefined
            }
            actions={
              activeSection !== 'home' && <Button label="Primary" primary />
            }
          />
          <Box gap="small">{sectionContent[activeSection]}</Box>
        </PageContent>
      </Box>
    </Box>
  );
};
