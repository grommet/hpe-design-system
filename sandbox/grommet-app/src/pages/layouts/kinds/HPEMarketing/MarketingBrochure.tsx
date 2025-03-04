import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Image,
  PageContent,
  Text,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import female from '/female.png';
import clock from '/clock.svg';
import performance from '/performance.svg';

const ContentArea = ({ alt, image, desc, title }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box align="center" gap="medium">
      <Box
        width={
          ['xsmall', 'small', 'medium'].includes(breakpoint)
            ? 'xxsmall'
            : 'xsmall'
        }
        height={
          ['xsmall', 'small', 'medium'].includes(breakpoint)
            ? 'xxsmall'
            : 'xsmall'
        }
      >
        {/* here icons did not work well they came out too small */}
        <Image fit="contain" alt={alt} src={image} />
      </Box>
      <Text size="xxlarge">{title}</Text>
      <Text>{desc}</Text>
    </Box>
  );
};

export const MarketingBrochure = () => {
  const breakpoint = useContext(ResponsiveContext);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : {
        count: 3,
        size: 'auto',
      };
  const rows = ['auto'];
  const gap = {
    xsamll: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  return (
    <PageContent
      pad={{ vertical: 'xlarge', horizontal: 'xlarge' }}
      background={{
        fill: 'horizontal',
        color: 'background-primary-strong',
        dark: true,
      }}
      fill="horizontal"
    >
      <Box gap="large">
        <Grid
          alignSelf="center"
          columns={columns}
          rows={rows}
          gap={gap[breakpoint]}
        >
          <ContentArea
            image={female}
            alt="Work with experts and develop new skill sets"
            title="People"
            desc="Work with experts and develop new skill sets"
          />
          <ContentArea
            image={clock}
            alt="Accelerate AI deployments and protect from risks"
            title="Technology"
            desc="Accelerate AI deployments and protect from risks"
          />
          <ContentArea
            image={performance}
            title="Economics"
            desc="Optimize AI costs long term"
            alt="Financial flexibility"
          />
        </Grid>
        <Button
          size={
            ['xsmall', 'small', 'medium'].includes(breakpoint)
              ? 'medium'
              : 'large'
          }
          icon={<LinkNext />}
          alignSelf={
            ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'center'
          }
          label="Read the brochure"
          // "background-contrast" styling doesn't work well here
          secondary
          reverse
        />
      </Box>
    </PageContent>
  );
};
