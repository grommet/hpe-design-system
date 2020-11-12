import React from 'react';
import { Header, Box, Footer, Main, ResponsiveContext, Text } from 'grommet';

export const HeaderFooterExample = () => {
  return (
    <AppContainer>
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            background="background-front"
            fill="horizontal"
            pad="small"
            height="xxsmall" // remove in prod, for demo purposes only
            // remove in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
          >
            <Text weight="bold" color="text-strong">
              Header
            </Text>
          </Header>
          <Main
            fill={undefined}
            flex={false}
            pad="small"
            height="xlarge" // remove in prod, for demo purposes only
            // remove in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
          >
            <Text weight="bold" color="text-strong">
              Main
            </Text>
          </Main>
          <Footer
            background="background-front"
            fill="horizontal"
            pad="small"
            // remove in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
            height="xxsmall" // remove height="xxsmall" in prod, for demo purposes only
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
