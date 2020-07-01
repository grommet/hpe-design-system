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

export const StickyHeaderExample = () => {
  return (
    <AppContainer>
      <AppSidebar />
      <Box fill>
        <Header
          flex={false}
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
        <Box flex overflow="auto" gap="small">
          <Main
            background="orange"
            // height is for demonstration of scroll
            height="xlarge"
            fill={undefined}
            flex={false}
            pad="small"
            round="xsmall"
          >
            <Text weight="bold" color="text-strong">
              Main
            </Text>
          </Main>
          <Footer
            fill="horizontal"
            height="xxsmall"
            background={{ color: { light: 'blue', dark: 'blue!' } }}
            pad="small"
            round="xsmall"
          >
            <Text weight="bold" color="text-strong">
              Footer
            </Text>
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
      flex={false}
      /* Min height is not needed in mobile contexts */
      height={size !== 'small' ? { min: '100%' } : undefined}
      background={{ color: { light: 'purple', dark: 'purple!' }, dark: true }}
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
