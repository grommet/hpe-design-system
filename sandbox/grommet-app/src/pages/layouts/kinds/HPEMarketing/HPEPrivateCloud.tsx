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
import { LinkNext, User, Clock, Trigger, VirtualStorage } from 'grommet-icons';
import { ProductHightlight } from './ProductHighlight';

export const HPEPrivateCloud = () => {
  const breakpoint = useContext(ResponsiveContext);

  console.log(breakpoint);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : breakpoint === 'medium'
    ? {
        count: 2,
        size: 'auto',
      }
    : {
        count: 4,
        size: 'auto',
      };
  const rows = ['auto'];
  const gap = {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  const columnGap = {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'xlarge',
  };

  return (
    <PageContent
      pad={{ vertical: 'xlarge', horizontal: 'xlarge' }}
      background={{
        fill: 'horizontal',
        color: 'background',
        dark: true,
      }}
      fill="horizontal"
    >
      <Box align="center" gap={columnGap[breakpoint]}>
        {/* their heading is level 1 60px for font 
        size however this would not be semantically correct */}
        <Heading level={2} margin="none">
          Introducing HPE Private Cloud AI
        </Heading>
        <Box
          // these are not the correct sizes from the design
          width="xlarge"
          height="medium"
          background={{
            image: 'url(/privateCloud.png)',
            dark: true,
            size: 'cover',
          }}
        />
        <Text
          size={
            breakpoint === 'xlarge'
              ? 'xlarge'
              : breakpoint === 'large'
              ? 'large'
              : breakpoint === 'medium'
              ? 'xlarge'
              : 'large'
          }
          textAlign="center"
        >
          Accelerate your path to production AI with a turnkey full stack
          private cloud. Part of the NVIDIA AI Computing by HPE portfolio, this
          co-developed scalable, pre-configured, AI-ready private cloud gives AI
          and IT teams powerful tools to innovate while simplifying ops and
          keeping your data under your control.
        </Text>
        <Box gap="large" direction="row">
          <Image src="/hpe-logo-invert.svg" alt="HPE Logo" />
          <Box border={{ side: 'right', size: 'small' }} />
          <Image src="/nvidia-logo.svg" alt="HPE Logo" />
        </Box>
        <Grid
          alignSelf="center"
          columns={columns}
          rows={rows}
          gap={gap[breakpoint]}
        >
          <ProductHightlight
            desc={null}
            icon={<User size="xlarge" />}
            title="Instant AI productivity"
          />
          <ProductHightlight
            desc={null}
            icon={<Clock size="xlarge" />}
            title="Unify access to all your data"
          />
          <ProductHightlight
            desc={null}
            icon={<Trigger size="xlarge" />}
            title="Enterprise-grade confidence and control"
          />
          <ProductHightlight
            icon={<VirtualStorage size="xlarge" />}
            title="Cloud experience that keeps data private"
            desc={null}
          />
        </Grid>
        <Button
          reverse
          secondary
          alignSelf={
            ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'center'
          }
          label="Learn More"
          icon={<LinkNext color="brand" />}
          size={
            ['xsmall', 'small', 'medium'].includes(breakpoint)
              ? 'medium'
              : 'large'
          }
        />
      </Box>
    </PageContent>
  );
};
