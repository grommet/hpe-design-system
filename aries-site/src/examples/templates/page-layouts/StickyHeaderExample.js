import React from 'react';
import { Header, Box, Footer, Main, ResponsiveContext, Text } from 'grommet';

export function StickyHeaderExample() {
  return <AppContainer>
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
  </AppContainer>;
}

function AppContainer({ ...rest }) {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      direction={['xsmall', 'small'].includes(size) ? 'column-reverse' : 'row'}
      fill
      margin="auto"
      width={{ max: 'xxlarge' }}
      {...rest}
    />
  );
}
