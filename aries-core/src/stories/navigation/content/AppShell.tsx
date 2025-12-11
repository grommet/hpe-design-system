import React, { useContext } from 'react';
import { Box, Grid, Main, ResponsiveContext } from 'grommet';
import { AppHeader } from './AppHeader';
import { Genie } from './Genie';
import { Help } from './Help';

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
      <Main
        gridArea="main"
        background="background-back"
        round={{ corner: 'top-left', size: 'medium' }}
      >
        {mainContent}
      </Main>
      {contextContent && (
        <Box gridArea="context-pane" as="aside" background="background-front">
          {contextContent === 'help' && <Help />}
          {contextContent === 'genie' && <Genie />}
        </Box>
      )}
    </Grid>
  );
};
