import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Anchor,
  Header,
  Box,
  Main,
  Paragraph,
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
        <Box fill>
          <Header
            border={{ color: 'border-weak', side: 'bottom' }}
            background="background"
            fill="horizontal"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <AppIdentity title="App Name" brand="hpe" />
          </Header>
          <Main background="background" flex={false} pad="medium">
            <Box
              direction={size !== 'small' ? 'row' : 'column'}
              gap="medium"
              wrap
            >
              <Box width={{ min: 'small' }} flex>
                <Paragraph margin="none">
                  This is the main page content. It may include buttons, tables,
                  forms, or any other kind of component.
                </Paragraph>
                <Paragraph>
                  For more info on building page layouts, see our{' '}
                  <Anchor label="page layouts guidance" />.
                </Paragraph>
              </Box>
              <Box
                background="background-contrast"
                pad={{ horizontal: 'medium' }}
                round="small"
                width={{ min: 'small', max: 'medium' }}
              >
                <Paragraph>
                  Here is some text that is supplementing the main content.
                </Paragraph>
                <Paragraph>
                  It is recommended to keep these supplemental sections to a
                  minimum.
                </Paragraph>
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
  const theme = useContext(ThemeContext);
  return (
    <Sidebar
      /* Sidebar should switch from column to row orientation
       * when on smaller screens */
      direction={size !== 'small' ? 'column' : 'row'}
      flex={false}
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      pad="small"
      background={!theme.dark ? { color: 'background', dark: true } : 'blue'}
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
