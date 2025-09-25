import React, { useContext } from 'react';
import {
  Button,
  Header,
  Box,
  Grid,
  Heading,
  Main,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { AppIdentity } from '../../../components/content/AppIdentity';
import { Card } from '../../templates/Card/Card';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const BasicLayoutCardsExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer>
      <Box flex overflow="auto">
        <Header
          border={{ color: 'border-weak', side: 'bottom' }}
          background="background"
          fill="horizontal"
          pad={{ horizontal: 'medium', vertical: 'xsmall' }}
        >
          <AppIdentity title="App Name" brand="hpe" />
        </Header>
        <Main background="background" pad="medium" fill={undefined}>
          <Box align="start" gap="medium">
            <Heading margin="none" color="text-strong">
              Page title
            </Heading>
            <Paragraph margin="none">
              This is the main page content. It may include buttons, tables,
              forms, or any other kind of component.
            </Paragraph>
            <Button
              label="Learn about page layouts"
              href="/templates/page-layouts"
              primary
            />
            <Grid
              columns="xsmall"
              gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall'}
              fill
            >
              {data.map((datum, index) => (
                <Card
                  background="background-front"
                  elevation="medium"
                  key={index}
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
                  }}
                  height="xsmall"
                  title={`Card ${datum + 1}`}
                  level={2}
                />
              ))}
            </Grid>
          </Box>
        </Main>
      </Box>
    </AppContainer>
  );
};

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
