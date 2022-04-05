import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  List,
  Menu,
  Paragraph,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
} from 'grommet';
import { More } from 'grommet-icons';

import { demoStyle } from './demoStyle';

export const PageWideExample = () => (
  <Page flex="grow" pad={{ vertical: 'large' }} {...demoStyle}>
    <PageContent gap="large" {...demoStyle}>
      <Heading level={1} size="small" margin="none">
        Wide Page
      </Heading>
      <SummaryMetrics />
      <Section1 />
      <Section2 />
    </PageContent>
  </Page>
);

const SummaryMetrics = () => (
  <Grid
    columns={{ count: 'fill', size: 'medium' }}
    rows="xsmall"
    gap="small"
    {...demoStyle}
  >
    {new Array(3).fill({}).map((_, index) => (
      <Card key={index} />
    ))}
  </Grid>
);

const Section1 = () => {
  const size = useContext(ResponsiveContext);
  console.log(size);

  return (
    <Box {...demoStyle}>
      <Heading level={2} size="small" margin="none">
        A Content Section
      </Heading>
      <Grid
        columns={
          ['xsmall', 'small', 'medium'].includes(size)
            ? 'auto'
            : [
                ['auto', 'flex'],
                ['small', 'medium'],
              ]
        }
        rows="auto"
        gap="medium"
        {...demoStyle}
      >
        <Box gap="medium">
          <Paragraph margin="none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            commodo gravida tincidunt. Nunc fringilla blandit tortor, id
            accumsan nisi dictum quis.
          </Paragraph>
          <Card>
            <CardBody>
              <Heading level={3} size="small" margin="none">
                Items
              </Heading>
              <List
                data={new Array(7).fill({
                  label: 'Item',
                  description: 'Description',
                })}
                pad={{ vertical: 'small' }}
                action={(item, index) => (
                  <Box key={index} direction="row" align="center" gap="medium">
                    <Text
                      weight="bold"
                      size="xsmall"
                      color={index % 3 === 0 ? 'text-weak' : null}
                    >
                      {index % 3 === 0 ? 'Inactive' : 'Active'}
                    </Text>
                    <Menu
                      icon={<More />}
                      hoverIndicator
                      items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
                    />
                  </Box>
                )}
              >
                {(datum, index) => (
                  <Box
                    key={index}
                    direction="row"
                    align="center"
                    justify="between"
                  >
                    <Box>
                      <Text
                        weight="bold"
                        color={index % 3 === 0 ? 'text-weak' : null}
                      >
                        {datum.label}
                        {index}
                      </Text>
                      <Text color={index % 3 === 0 ? 'text-weak' : null}>
                        {datum.description}
                      </Text>
                    </Box>
                  </Box>
                )}
              </List>
            </CardBody>
          </Card>
        </Box>
        <Card fill height={{ min: 'medium' }} />
      </Grid>
    </Box>
  );
};

const Section2 = () => (
  <Box {...demoStyle}>
    <Heading level={2} size="small" margin="none">
      Another Content Section
    </Heading>
    <Paragraph margin="none">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
      gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum
      quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo,
      interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc
      porta egestas. Fusce dapibus lobortis tincidunt.
    </Paragraph>
  </Box>
);
