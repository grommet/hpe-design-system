import React, { useContext } from 'react';
import { Box, Grid, Main, ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';
import { AppHeader } from '../../main/AppHeader';

const gridAreas = [
  ['nav', 'header'],
  ['nav', 'main'],
];

const responsiveGridAreas = {
  xsmall: [
    ['nav', 'header'],
    ['main', 'main'],
  ],
};

export const AppShell = ({
  navigationMenu,
  navOpen,
  mainContent,
  setActiveItem,
}) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Grid
      areas={responsiveGridAreas[breakpoint] || gridAreas}
      columns={['auto', 'flex']}
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
        background="background-front"
        navOpen={navOpen}
        setActiveItem={setActiveItem}
      />
      <Main
        gridArea="main"
        background="background-back"
        round={navOpen ? { corner: 'top-left', size: 'small' } : undefined}
      >
        {mainContent}
      </Main>
    </Grid>
  );
};


AppShell.propTypes = {
  navigationMenu: PropTypes.node,
  navOpen: PropTypes.bool,
  mainContent: PropTypes.node,
  setActiveItem: PropTypes.func,
};