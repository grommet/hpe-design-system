import React, { useContext } from 'react';
import { Header, Box, Main, ResponsiveContext, Sidebar, Text } from 'grommet';

export const SidebarHeaderExample = () => (
    <AppContainer>
      <AppSidebar />
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            background="background-front"
            fill="horizontal"
            pad="small"
            // remove dashed border in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
            // remove height="xxsmall" in prod, for demo purposes only
            height="xxsmall"
          >
            <Text weight="bold" color="text-strong">
              Header
            </Text>
          </Header>
          <Main
            fill={undefined}
            flex={false}
            pad="small"
            // remove dashed border in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
            // remove height="xlarge" in prod, for demo purposes only
            height="xlarge"
          >
            <Text weight="bold" color="text-strong">
              Main
            </Text>
          </Main>
        </Box>
      </Box>
    </AppContainer>
  );

const AppSidebar = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Sidebar
      /* Sidebar should switch from column to row orientation
       * when on smaller screens */
      direction={size !== 'small' ? 'column' : 'row'}
      flex={false}
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      pad="small"
      // remove dashed border in prod, for demo purposes only
      border={{ color: 'border', style: 'dashed' }}
    >
      <Text weight="bold" color="text-strong">
        Sidebar
      </Text>
    </Sidebar>
  );
};

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      direction={size === 'small' ? 'column-reverse' : 'row'}
      fill
      margin="auto"
      width={{ max: 'xxlarge' }}
      {...rest}
    />
  );
};
