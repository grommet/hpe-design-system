import React from 'react';
import { Header, Box, Main, ResponsiveContext, Text } from 'grommet';

export const HeaderOnlyExample = () => {
  return (
    <AppContainer>
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
      gap={size !== 'small' ? 'small' : undefined}
      margin="auto"
      width={{ max: 'xxlarge' }}
      {...rest}
    />
  );
};
