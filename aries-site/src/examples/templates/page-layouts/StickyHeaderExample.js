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

export const StickyHeaderExample = () => (
    <AppContainer>
      <AppSidebar />
      <Box fill>
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
        <Box flex overflow="auto">
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
          <Footer
            background="background-front"
            fill="horizontal"
            pad="small"
            // remove dashed border in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
            // remove height="xxmsmall" in prod, for demo purposes only
            height="xxsmall"
          >
            <Text weight="bold" color="text-strong">
              Footer
            </Text>
          </Footer>
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
      // remove in prod, for demo purposes only
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
