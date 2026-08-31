import { Grid, Box, Header, Main, Button, Text, ResponsiveContext } from 'grommet';
import { useDesignSystem } from './hooks/useDesignSystem';
import { useContext } from 'react';

const gridAreas = [
  ['nav', 'header', 'header'],
  ['nav', 'main', 'context-pane'],
];

const responsiveGridAreas = {
  xsmall: [
    ['nav', 'header', 'header'],
    ['main', 'main', 'context-pane'],
  ],
};

export const AppShell = ({ navigationMenu, mainContent, contextContent, setContextContent }) => {
  const ds = useDesignSystem(); // DS context for type-safe component lookups
  const breakpoint = useContext(ResponsiveContext);
  const mainRound = contextContent 
    ? { corner: 'top', size: 'small' } 
    : { corner: 'top-left', size: 'small' };

  return (
    <Grid
      areas={responsiveGridAreas[breakpoint] || gridAreas}
      columns={['auto', 'flex', 'auto']}
      rows={['auto', 'flex']}
      height="100vh"
    >
      <Box
        gridArea="nav"
        as="aside"
        aria-label="navigation"
        background="background-front"
      >
        {navigationMenu}
      </Box>
      <Header
        gridArea="header"
        height={{ min: '5xsmall' }}
        pad={{ horizontal: 'medium', vertical: '3xsmall' }}
      >
        <Button plain>
          <Text>
            <Text weight="bold">HPE</Text> Design System
          </Text>
        </Button>
        {/* Context controls go here */}
      </Header>
      <Main gridArea="main" background="background-back" round={mainRound}>
        {mainContent}
      </Main>
      {contextContent && (
        <Box
          gridArea="context-pane"
          as="aside"
          background="background-front"
          width={{ min: 'small' }}
        >
          {/* Context pane content */}
        </Box>
      )}
    </Grid>
  );
};