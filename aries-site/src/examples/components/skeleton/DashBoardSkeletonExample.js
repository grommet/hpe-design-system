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

const skeleton = { message: { start: 'Loading', end: 'Content Loaded' } };

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
  const skeletonAlign = loading ? 'none' : 'start';
  const direction = 'row';
  useEffect(() => {
    setTimeout(() => setLoading(!loading), 3000);
  }, [loading]);

  return (
    <Page skeleton={loading ? skeleton : undefined} height="large">
      <PageContent>
        <Grid columns={columns[breakpoint]} gap="medium">
          {activities.map((activity, index) => (
            <Box>
              <Card key={index} as="section">
                <Box>
                  <CardHeader
                    direction="column"
                    gap="none"
                    align="start"
                    pad={adjustPad('column', 'header', theme)}
                  >
                    {loading ? (
                      <Box
                        width="xxsmall"
                        height="xxsmall"
                        round="small"
                        background="background"
                        flex={false}
                        margin={{ bottom: 'small' }}
                      />
                    ) : (
                      <Box pad={{ bottom: 'small' }}>{activity.icon}</Box>
                    )}
                    <Heading level={3} margin="none" size="small">
                      {activity.title}
                    </Heading>
                  </CardHeader>
                  <CardBody
                    align={skeletonAlign}
                    pad={adjustPad('column', 'body', theme)}
                  >
                    <Paragraph margin="none">{activity.description}</Paragraph>
                  </CardBody>
                </Box>
                <CardFooter
                  align={skeletonAlign}
                  pad={adjustPad('column', 'footer', theme)}
                >
                  <Box flex={false}>
                    <Button
                      label={activity.action.label}
                      href={activity.action.href}
                      secondary
                    />
                  </Box>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </Grid>
      </PageContent>
    </Page>
  );
};
