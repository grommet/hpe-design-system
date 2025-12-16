import React, { useContext } from 'react';
import { Box, Grid, Main, ResponsiveContext } from 'grommet';
import { AppHeader } from './AppHeader';
import { ContextPane } from './ContextPane';

const gridAreas = [
  ['nav', 'header', 'context-pane'],
  ['nav', 'main', 'context-pane'],
];

const responsiveGridAreas: Record<string, string[][]> = {
  xsmall: [
    ['nav', 'header', 'context-pane'],
    ['main', 'main', 'context-pane'],
  ],
};

interface AppShellProps {
  navigationMenu: React.ReactNode;
  mainContent: React.ReactNode;
  contextContent?: string;
  setContextContent: (value: string) => void;
  setActiveItem: (value: string) => void;
}

export const AppShell = ({
  navigationMenu,
  mainContent,
  contextContent,
  setContextContent,
  setActiveItem,
}: AppShellProps) => {
  const breakpoint = useContext(ResponsiveContext);

  // Only round the top-right corner of the main content when the context pane is visible
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
      <AppHeader
        gridArea="header"
        contextContent={contextContent}
        setContextContent={setContextContent}
        setActiveItem={setActiveItem}
      />
      <Main gridArea="main" background="background-back" round={mainRound}>
        {mainContent}
      </Main>
      <ContextPane
        gridArea="context-pane"
        as="aside"
        background="background-front"
        title={contextContent || ''}
        contextContent={contextContent}
        setContextContent={setContextContent}
      />
    </Grid>
  );
};
