import React from 'react';
import { Header, Box, Footer, Main, ResponsiveContext } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const StickyHeaderExample = () => (
  <AppContainer>
    <Box fill>
      <Header
        background="background-front"
        fill="horizontal"
        pad='xsmall'
        // remove dashed border in prod, for demo purposes only
        border={{ color: 'border', style: 'dashed' }}
        // remove height="xxsmall" in prod, for demo purposes only
        height='5xsmall'
      >
        <TextEmphasis>Header</TextEmphasis>
      </Header>
      <Box flex overflow="auto">
        <Main
          fill={undefined}
          flex={false}
          pad='xsmall'
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          // remove height="xlarge" in prod, for demo purposes only
          height='xxlarge'
        >
          <TextEmphasis>Main</TextEmphasis>
        </Main>
        <Footer
          background="background-front"
          fill="horizontal"
          pad='xsmall'
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          // remove height="xxmsmall" in prod, for demo purposes only
          height='5xsmall'
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
