import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  PageContent,
  Text,
  ResponsiveContext,
} from 'grommet';
import { LinkNext, User, Clock, Time } from 'grommet-icons';

const ContentArea = ({ icon, desc, title }) => {
  return (
    <Box align="center" gap="medium">
      {/* here icons did not work well they came out
         too small even with passing large size */}
      {icon}
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
            icon={<User size="large" />}
            title="People"
            desc="Work with experts and develop new skill sets"
          />
          <ContentArea
            icon={<Clock size="large" />}
            title="Technology"
            desc="Accelerate AI deployments and protect from risks"
          />
          <ContentArea
            icon={<Time size="large" />}
            title="Economics"
            desc="Optimize AI costs long term"
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
