import React, { useContext } from 'react';
import {
  Card,
  Header,
  Heading,
  Box,
  Grid,
  Main,
  ResponsiveContext,
  Sidebar,
  Text,
  Paragraph,
} from 'grommet';
import { AppIdentity } from '../../../components/content/AppIdentity';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const LayeredLayoutExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer>
      <AppSidebar />
      <Box flex overflow="auto">
        <Box height={{ min: '100%' }}>
          <Header
            border={{ color: 'border-weak', side: 'bottom' }}
            background="background-back"
            fill="horizontal"
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <AppIdentity title="App Name" brand="hpe" />
          </Header>
          <Main background="background-back" flex pad="small">
            <Heading color="text-strong" margin="none">
              Page title
            </Heading>
            <Paragraph>
              In a layered layout, background-back is used for the app
              background, and background-front is used on the foreground
              content, such as these Cards.
            </Paragraph>
            <Grid
              columns={size !== 'small' ? 'small' : { count: 2, size: 'auto' }}
              gap={size !== 'small' ? 'medium' : 'small'}
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
      pad="small"
      background={{ color: 'background', dark: true }}
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
