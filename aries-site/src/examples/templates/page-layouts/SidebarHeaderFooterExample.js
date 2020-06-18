import React, { useContext } from 'react';
import {
  Header,
  Box,
  Footer,
  Main,
  ResponsiveContext,
  Sidebar,
  Text,
} from 'grommet';

export const SidebarHeaderFooterExample = () => {
  return (
    <AppContainer>
      <AppSidebar />
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }} gap="small">
          <Header
            fill="horizontal"
            height="xxsmall"
            background="green!"
            pad="small"
            round="xsmall"
          >
            <Text weight="bold" color="text-strong">
              Header
            </Text>
          </Header>
          <Main
            // height is for demonstration of scroll
            height="xlarge"
            fill={undefined}
            flex={false}
            background="orange"
            pad="small"
            round="xsmall"
          >
            <Text weight="bold">Main</Text>
          </Main>
          <Footer
            fill="horizontal"
            height="xxsmall"
            background="blue"
            pad="small"
            round="xsmall"
          >
            <Text weight="bold">Footer</Text>
          </Footer>
        </Box>
      </Box>
    </AppContainer>
  );
};

const AppSidebar = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Sidebar
      /* Sidebar should switch from column to row orientation
       * when on smaller screens */
      direction={size !== 'small' ? 'column' : 'row'}
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      background={{ color: 'purple', dark: true }}
      pad="small"
      round="xsmall"
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
      height={size === 'small' ? { max: 'large' } : '100%'}
      width={size === 'small' ? 'medium' : '100%'}
      gap={size !== 'small' ? 'small' : undefined}
      {...rest}
    />
  );
};
