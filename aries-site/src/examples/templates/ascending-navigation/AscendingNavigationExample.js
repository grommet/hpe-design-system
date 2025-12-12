import React, { useState } from 'react';
import {
  Grommet,
  Box,
  Card,
  Grid,
  Nav,
  Anchor,
  Header,
  Heading,
  PageContent,
  PageHeader,
  Text,
  Paragraph,
  Button,
} from 'grommet';

import { hpe } from 'grommet-theme-hpe';

// HPE Icons
import {
  Announce,
  Help,
  Left,
  LinkNext,
  Home,
  Template,
} from '@hpe-design/icons-grommet';

const sections = [
  { id: 'overview', label: 'Overview', icon: <Announce size="small" /> },
  { id: 'components', label: 'Components', icon: <Template size="small" /> },
  { id: 'help', label: 'Help', icon: <Help size="small" /> },
];

export const AscendingNavigationExample = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const isHome = activeSection === 'home';

  const activeDef = isHome
    ? { id: 'home', label: 'Home' }
    : sections.find(s => s.id === activeSection);

  return (
    <Grommet theme={hpe}>
      <Box
        background="background-back"
        width="full"
        border={{ color: 'border', size: 'xsmall' }}
        pad={{
          bottom: 'xlarge',
        }}
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
            {sections.map(section => {
              const isActive = activeSection === section.id;

              return (
                <Button
                  key={section.id}
                  default
                  icon={section.icon}
                  label={section.label}
                  active={isActive} // <-- activates Grommet active styling
                  onClick={() => setActiveSection(section.id)}
                />
              );
            })}
          </Nav>
        </Header>

        {/* Page */}
        <Box>
          <PageContent gap="small">
            <PageHeader
              title={activeDef?.label}
              subtitle={
                isHome
                  ? 'HPE Design System demo.'
                  : `This is the ${activeDef.label.toLowerCase()} section.`
              }
              // Only show parent when NOT on the home page
              parent={
                !isHome ? (
                  <Anchor
                    label="Home"
                    icon={<Left />}
                    onClick={() => setActiveSection('home')}
                  />
                ) : undefined
              }
              actions={!isHome && <Button label="Primary" primary />}
            />

            {/* SECTION CONTENT */}
            <Box gap="small">
              {/* HOME PAGE CONTENT */}
              {activeSection === 'home' && (
                <>
                  <Paragraph>
                    Use the navigation in the header or the cards below to
                    explore different sections of this demo app. While on any
                    nested page the <strong>Ascending navigation</strong> will
                    bring you home.
                  </Paragraph>
                  <Grid columns="small" gap="small">
                    {sections.map(section => {
                      const isActive = activeSection === section.id;

                      return (
                        <Card
                          key={section.id}
                          default
                          icon={section.icon}
                          label={section.label}
                          active={isActive}
                          onClick={() => setActiveSection(section.id)}
                          pad="xsmall"
                        >
                          <Box direction="row" fill justify="between">
                            <Heading
                              level="2"
                              margin={{
                                horizontal: 'none',
                                vertical: '3xsmall',
                              }}
                            >
                              {section.label}
                            </Heading>
                            <LinkNext height="xxlarge" />
                          </Box>

                          <Paragraph>
                            This leads to the {section.label} page of your HPE
                            Design System demo app.
                          </Paragraph>
                          
                        </Card>
                      );
                    })}
                  </Grid>
                </>
              )}

              {/* OVERVIEW PAGE CONTENT */}
              {activeSection === 'overview' && (
                <Paragraph>
                  This overview page can describe the purpose of your app or
                  design system. It’s a child of the Home page.
                </Paragraph>
              )}

              {/* COMPONENTS PAGE CONTENT */}
              {activeSection === 'components' && (
                <>
                  <Text weight="bold">Components in use in this example:</Text>
                  <Paragraph margin="none">
                    • Page, PageContent, PageHeader
                  </Paragraph>
                  <Paragraph margin="none">
                    • Box, Header, Nav, Button
                  </Paragraph>
                  <Paragraph margin="none">• Text, Paragraph, Anchor</Paragraph>
                </>
              )}

              {/* HELP PAGE CONTENT */}
              {activeSection === 'help' && (
                <>
                  <Text weight="bold">To create this demo application:</Text>
                  <Paragraph margin="none">
                    1. Create a React sandbox. <br />
                    2. Install <code>grommet</code>,{' '}
                    <code>grommet-theme-hpe</code>,{' '}
                    <code>@hpe-design/icons-grommet</code>. <br />
                  </Paragraph>
                </>
              )}
            </Box>
          </PageContent>
        </Box>
      </Box>
    </Grommet>
  );
};
