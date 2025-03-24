import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  PageContent,
  Text,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { Metric } from '../../../../components';

export const HPEArchitect = ({ size }) => {
  const breakpoint = useContext(ResponsiveContext);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : ['3/4', 'auto'];
  const gap = {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  const metricColumns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : { count: 3, size: 'auto' };

  const areasDefault = [['quotes', 'hpeBook']];

  const areasSmall = [
    ['quotes', 'unassigned'],
    ['hpeBook', 'unassigned'],
  ];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

  return (
    <PageContent
      pad="large"
      background={{
        fill: 'horizontal',
        // this is the closet color we have to what they have #00384D
        color: 'graph-1',
        dark: true,
      }}
    >
      <Grid areas={areas} columns={columns} gap={gap[breakpoint]}>
        <Box gap="xlarge" gridArea="quotes">
          {/* // this heading is not large enough can we use size or we steering away? */}
          <Box gap="medium">
            <Heading size="xlarge" margin="none" level={2}>
              Architect an AI advantage
            </Heading>
            <Text>
              Overcoming overconfidence and oversight to help leaders secure
              long-term business success.
            </Text>
          </Box>
          <Box gap="large">
            <Grid rows="auto" columns={metricColumns} gap="medium">
              {/* we do not have a text size for these values that should be in 
                the metric they should be larger  */}
              <Metric
                label="organizations have an official AI strategy in place"
                value={
                  <Text size="xxlarge" color="text-strong">
                    9 in 10
                  </Text>
                }
                reverse
                options={null}
                unit={null}
                size={size}
                alignSelf="start"
                // the color here should be teal but is coming on dark teal we need light teal
                border={{ side: 'left', color: '#82fff2', size: 'medium' }}
                pad={{ left: 'medium' }}
              />
              <Metric
                label="of IT say AI has increased their security risks"
                value={
                  <Text size="xxlarge" color="text-strong">
                    94%
                  </Text>
                }
                reverse
                options={null}
                unit={null}
                size={size}
                alignSelf="start"
                border={{ side: 'left', color: '#82fff2', size: 'medium' }}
                pad={{ left: 'medium' }}
              />
              <Metric
                label="of IT leaders are currently running their AI models on infrastructure they manage"
                value={
                  <Text size="xxlarge" color="text-strong">
                    80%
                  </Text>
                }
                reverse
                options={null}
                unit={null}
                size={size}
                alignSelf="start"
                border={{ side: 'left', color: '#82fff2', size: 'medium' }}
                pad={{ left: 'medium' }}
              />
            </Grid>
            <Button
              label="Download the full report"
              // primary looks strange on the blue color we have
              kind="primary"
              reverse
              alignSelf={
                ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'start'
              }
              size={['xlarge'].includes(breakpoint) ? 'large' : 'medium'}
              icon={<LinkNext size="small" />}
            />
          </Box>
        </Box>
        <Box gridArea="hpeBook">
          <Image
            alt="Architect an AI advantage book"
            src="/hpe_book.png"
            fit="contain"
          />
        </Box>
      </Grid>
    </PageContent>
  );
};
