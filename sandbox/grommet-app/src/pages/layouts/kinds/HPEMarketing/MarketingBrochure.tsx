import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Image,
  Heading,
  PageContent,
  Text,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import female from '/female.png';
import clock from '/clock.svg';
import performance from '/performance.svg';

const ContentArea = ({ alt, image, desc, title }) => {
  return (
    <Box align="center" gap="medium">
      <Box width="xsmall" height="xsmall">
        <Image fit="contain" alt={alt} src={image} />
      </Box>
      <Heading margin="none" level={4}>
        {title}
      </Heading>
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
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  return (
    <PageContent
      pad={{ vertical: 'xlarge' }}
      background={{ fill: 'horizontal', color: 'green', dark: true }}
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
            alt=""
            title="People"
            desc="Work with experts and develop new skill sets"
          />
          <ContentArea
            image={clock}
            alt=""
            title="Technology"
            desc="Accelerate AI deployments and protect from risks"
          />
          <ContentArea
            image={performance}
            title="Economics"
            desc="Optimize AI costs long term"
            alt=""
          />
        </Grid>
        <Button
          size="large"
          icon={<LinkNext />}
          label="Read the brochure"
          alignSelf="center"
        />
      </Box>
    </PageContent>
  );
};
