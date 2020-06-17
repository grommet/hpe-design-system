import React from 'react';
import { Header, Box, Footer, Main, ResponsiveContext, Text } from 'grommet';

export const HeaderFooterExample = () => {
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
          <Main flex="grow" background="orange" pad="small" round="xsmall">
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
