import React from 'react';
import { Header, Box, Main, ResponsiveContext, Text } from 'grommet';

export const HeaderOnlyExample = () => {
  return (
    <AppContainer>
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            background="background-front"
            fill="horizontal"
            pad="small"
            border="border-weak" // remove in prod, for demo purposes only
            height="xxsmall" // remove in prod, for demo purposes only
          >
            <Text weight="bold" color="text-strong">
              Header
            </Text>
          </Header>
          <Main
            fill={undefined}
            flex={false}
            pad="small"
            border="border-weak" // remove in prod, for demo purposes only
            height="xlarge" // remove in prod, for demo purposes only
          >
            <Text weight="bold" color="text-strong">
              Main
            </Text>
          </Main>
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
