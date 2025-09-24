import React from 'react';
import { Header, Box, Footer, Main, ResponsiveContext } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const HeaderFooterExample = () => (
  <AppContainer>
    <Box flex overflow="auto">
      <Box height={{ min: '100%' }}>
        <Header
          background="background-front"
          fill="horizontal"
          pad="xsmall"
          // remove height="xxsmall" in prod, for demo purposes only
          height="5xsmall"
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
        >
          <TextEmphasis>Header</TextEmphasis>
        </Header>
        <Main
          fill={undefined}
          flex={false}
          pad="xsmall"
          // remove height="xlarge" in prod, for demo purposes only
          height="xxlarge"
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
        >
          <TextEmphasis>Main</TextEmphasis>
        </Main>
        <Footer
          background="background-front"
          fill="horizontal"
          pad="xsmall"
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          // remove height="xxsmall" in prod, for demo purposes only
          height="5xsmall"
        >
          <TextEmphasis>Footer</TextEmphasis>
        </Footer>
      </Box>
    </Box>
  </AppContainer>
);

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      direction={['xsmall', 'small'].includes(size) ? 'column-reverse' : 'row'}
      fill
      margin="auto"
      width={{ max: '3xlarge' }}
      {...rest}
    />
  );
};
