import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  Heading,
  Page,
  PageContent,
  Paragraph,
  ThemeContext,
  ResponsiveContext,
} from 'grommet';
import { adjustPad } from '../../templates/Card/utils';
import { activities } from '../card/data';

const skeleton = {
  message: { start: 'Loading', end: 'Content Loaded' },
  depth: 3,
  colors: {
    light: ['transparent', 'background-front', 'background-contrast'],
    dark: ['transparent', 'background-front', 'background-contrast'],
  },
};

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto'],
};

export const DashBoardSkeletonExample = () => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  const [loading, setLoading] = useState(true);
  // needed for skeleton paragraph
  const skeletonAlign = loading ? 'none' : 'start';
  useEffect(() => {
    setTimeout(() => setLoading(!loading), 3000);
  }, [loading]);

  const placeholders = [{}, {}, {}];
  const items = loading ? placeholders : activities;

  return (
    // passing skeleton to Grid will skeletize all of the children that are
    // text, button, box, paragraph, heading
    <Page>
      <PageContent>
        <Box skeleton={loading ? skeleton : undefined}>
          <Grid columns={columns[breakpoint]} gap="medium">
            {items.map((item, index) => (
              <Card flex="grow" key={index}>
                <CardHeader
                  direction="column"
                  gap="none"
                  align="start"
                  pad={adjustPad('column', 'header', theme)}
                >
                  {/* when using icon need to create a box to 
                  simulate skeleton behavior */}
                  {!item.icon ? (
                    <Box
                      width="24px" // size of icon
                      height="24px"
                      background="background"
                      flex="grow"
                      margin={{ bottom: 'small' }}
                    />
                  ) : (
                    <Box pad={{ bottom: 'small' }}>{item?.icon}</Box>
                  )}
                  {/* adjust level according to correct semantic heading level 
                  for your layout */}
                  <Heading level={3} margin="none">
                    {item.title || ''}
                  </Heading>
                </CardHeader>
                <CardBody
                  align={skeletonAlign}
                  pad={adjustPad('column', 'body', theme)}
                >
                  <Paragraph margin="none">{item.description}</Paragraph>
                </CardBody>
                <CardFooter pad={adjustPad('column', 'footer', theme)}>
                  <Box flex={false}>
                    <Button label={item?.action?.label} secondary />
                  </Box>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Box>
      </PageContent>
    </Page>
  );
};
