import React, { useContext } from 'react';
import {
  Anchor,
  Header,
  Box,
  Main,
  ResponsiveContext,
  Sidebar,
  Text,
} from 'grommet';
import { AppIdentity } from '../../../components/content/AppIdentity';

export const BasicLayoutExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer>
      <AppSidebar />
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            border={{ color: 'border-weak', side: 'bottom' }}
            background="background"
            fill="horizontal"
            pad="small"
          >
            <AppIdentity title="App Name" brand="hpe" />
          </Header>
          <Main
            fill={undefined}
            flex={false}
            pad="small"
            // // remove height="xlarge" in prod, for demo purposes only
            // height="xlarge"
          >
            <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
              <Box gap="medium" flex>
                <Text>
                  This is the main page content. It may include buttons, tables,
                  forms, or any other kind of component.
                </Text>
                <Text>
                  For more info on building page layouts, see our{' '}
                  <Anchor label="page layouts guidance" />.
                </Text>
              </Box>
              <Box
                background="background-contrast"
                gap="medium"
                pad="medium"
                round="small"
                width="medium"
              >
                <Text>
                  Here is some text that is supplementing the main content.
                </Text>
                <Text>
                  It is recommended to keep these supplemental sections to a
                  minimum.
                </Text>
              </Box>
            </Box>
          </Main>
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
      flex={false}
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      pad="small"
      background={{ color: 'background', dark: true }}
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
