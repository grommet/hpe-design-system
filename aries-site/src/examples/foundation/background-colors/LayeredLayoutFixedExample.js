import React, { useContext } from 'react';
import {
  Card,
  Header,
  Heading,
  Box,
  Grid,
  Main,
  ResponsiveContext,
  Paragraph,
} from 'grommet';
import { AppIdentity } from '../../../components/content/AppIdentity';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function LayeredLayoutFixedExample() {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer>
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            border={{ color: 'border-weak', side: 'bottom' }}
            background="background-front"
            fill="horizontal"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <AppIdentity title="App Name" brand="hpe" />
          </Header>
          <Main background="background-back" flex pad="medium">
            <Heading color="text-strong" margin="none">
              Page title
            </Heading>
            <Paragraph>
              In a layered layout, background-back is used for the app
              background, and background-front is used on the foreground
              content, such as these Cards.
            </Paragraph>
            <Grid
              columns={
                !['xsmall', 'small'].includes(size)
                  ? 'small'
                  : { count: 2, size: 'auto' }
              }
              gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'small'}
            >
              {data.map((datum, index) => (
                <Card
                  background="background-front"
                  key={index}
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
                  }}
                  height="small"
                />
              ))}
            </Grid>
          </Main>
        </Box>
      </Box>
    </AppContainer>
  );
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
