/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Grommet,
  Header,
  Markdown,
  PageContent,
  PageHeader,
  Paragraph,
  Text,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Left, Home } from '@hpe-design/icons-grommet';

import { components } from '../../../components/content/MarkdownComponents';
import { HomeContent } from './components/HomeContent';
import { sectionConfig } from './data/sections';

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
        <Markdown components={components}>
          {`- \`Page\`, \`PageContent\`, \`PageHeader\`
- \`Box\`, \`Header\`, \`Nav\`, \`Button\`  
- \`Text\`, \`Paragraph\`, \`Anchor\``}
        </Markdown>
      </>
    ),
    help: (
      <>
        <Text weight="bold">To create this demo application:</Text>
        <Markdown components={components}>
          {
          `1. Create a React sandbox
2. Install \`grommet\`, \`grommet-theme-hpe\`, \`@hpe-design/icons-grommet\`
3. Replace your App.js with this template`
}
        </Markdown>
      </>
    ),
  };

  return (
    <Grommet theme={hpe}>
      <Box
        background="background-back"
        width="full"
        border={{ color: 'border-weak', size: 'xsmall' }}
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
    </Grommet>
  );
};
