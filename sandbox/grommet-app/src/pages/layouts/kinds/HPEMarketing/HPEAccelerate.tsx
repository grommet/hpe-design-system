import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { CardTemplate } from './components/CardTemplate';

export const HPEAccelerate = () => {
  const breakpoint = useContext(ResponsiveContext);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : { count: 2, size: 'auto' };
  const rows = ['auto'];
  // trying to match what they had as far as gap
  const gap = {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  return (
    <PageContent
      pad="xlarge"
      background={{
        fill: 'horizontal',
        color: 'background-front',
      }}
    >
      <Box gap="medium">
        {/* in marketing page they have 60px heading
        even with size xlarge we are at 48px  */}
        <Heading size="xlarge" margin="none" level={2}>
          Accelerate your journey to AI at scale
        </Heading>
        <Grid columns={columns} rows={rows} gap={gap[breakpoint]}>
          <CardTemplate
            pad={null}
            border={false}
            media={
              <Image
                src="/hpe-greenlake.png"
                alt="image of hpe greenlake dashboard"
                fit="cover"
              />
            }
            title="HPE GreenLake cloud"
            description="Looking to make AI work for you? HPE GreenLake cloud gives you supercomputing access to power AI at scale."
            actions={
              <Button
                label="Explore more"
                aria-label="explore more about HPE GreenLake cloud"
                reverse
                primary
                icon={<LinkNext />}
                size={
                  ['large', 'xlarge'].includes(breakpoint) ? 'large' : undefined
                }
                alignSelf={
                  ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'start'
                }
              />
            }
          />
          <CardTemplate
            border={false}
            pad={null}
            media={
              <Image
                src="/happy-man.png"
                alt="male looking over smiling"
                fit="cover"
              />
            }
            title="HPE Financial Services"
            description="Our collaborative approach delivers asset management solutions that free up capital and maximize capacity while driving sustainability."
            actions={
              <Button
                label="Explore more"
                aria-label="explore more about HPE Financial Services"
                reverse
                primary
                icon={<LinkNext />}
                size={
                  ['large', 'xlarge'].includes(breakpoint) ? 'large' : undefined
                }
                alignSelf={
                  ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'start'
                }
              />
            }
          />
        </Grid>
      </Box>
    </PageContent>
  );
};
