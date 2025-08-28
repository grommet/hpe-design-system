import React, { useContext } from 'react';
import {
  Anchor,
  Header,
  Box,
  Main,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { AppIdentity } from '../../../components/content/AppIdentity';

export const BasicLayoutExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer>
      <Box flex overflow="auto">
        <Box fill>
          <Header
            border={{ color: 'border-weak', side: 'bottom' }}
            background="background"
            fill="horizontal"
            pad={{ horizontal: 'medium', vertical: 'xsmall' }}
          >
            <AppIdentity title="App Name" brand="hpe" />
          </Header>
          <Main background="background" flex={false} pad="medium">
            <Box
              direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
              gap="medium"
              wrap
            >
              <Box width={{ min: 'xsmall' }} flex>
                <Paragraph margin="none">
                  This is the main page content. It may include buttons, tables,
                  forms, or any other kind of component.
                </Paragraph>
                <Paragraph>
                  For more info on building page layouts, see our{' '}
                  <Anchor label="page layouts guidance" />.
                </Paragraph>
              </Box>
              <Box
                background="background-contrast"
                pad={{ horizontal: 'medium' }}
                round='medium'
                width={{ min: 'xsmall', max: 'medium' }}
              >
                <Paragraph>
                  Here is some text that is supplementing the main content.
                </Paragraph>
                <Paragraph>
                  It is recommended to keep these supplemental sections to a
                  minimum.
                </Paragraph>
              </Box>
            </Box>
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
      direction={['xsmall', 'small'].includes(size) ? 'column-reverse' : 'row'}
      fill
      margin="auto"
      width={{ max: '3xlarge' }}
      {...rest}
    />
  );
};
