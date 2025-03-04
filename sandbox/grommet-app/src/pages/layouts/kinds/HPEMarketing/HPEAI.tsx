import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Page,
  PageContent,
  Text,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';

export const HPEAI = () => {
  const breakpoint = useContext(ResponsiveContext);

  const columns = ['xsmall', 'small'].includes(breakpoint)
    ? ['auto']
    : ['1/2', '1/2'];
  const rows = ['auto'];
  const gap = {
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  const areasDefault = [['learn', 'hpeLogo']];

  const areasSmall = [['learn', 'unassigned']];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

  let padTop: string = 'none';
  if (['xsmall', 'small'].includes(breakpoint)) {
    padTop = 'none';
  } else if (breakpoint === 'medium') {
    padTop = 'small';
  } else if (breakpoint === 'large' || breakpoint === 'xlarge') {
    padTop = 'large';
  }
  return (
    <PageContent
      // in marketing page they have 80px padding on the sides
      // cloest we have is 96. As for the top and bottom they have 40px
      // we have 48px
      pad={{ vertical: 'large', horizontal: 'xlarge' }}
      background={
        ['xsmall', 'small'].includes(breakpoint)
          ? { color: 'background', dark: true }
          : {
              fill: 'horizontal',
              image: 'url(/public/marketing-background.png)',
              dark: true,
            }
      }
      fill="horizontal"
    >
      <Grid areas={areas} columns={columns} rows={rows} gap={gap[breakpoint]}>
        <Box
          align={['xsmall', 'small'].includes(breakpoint) ? 'center' : 'start'}
          gap="medium"
          gridArea="learn"
        >
          {/* // this is off a little for the padding on top compared to page. */}
          <Box pad={{ top: padTop }}>
            <Text weight="bold" size="small">
              Artificial Intelligence (AI) solutions
            </Text>
          </Box>
          {/* // this heading is not large enough can we use size or we steering away? */}
          <Heading margin="none" level="1">
            Learn how HPE and NVIDIA unlock AL
          </Heading>
          <Box gap="large">
            <Text
              size={
                ['xsmall', 'small'].includes(breakpoint) ? 'small' : 'xlarge'
              }
            >
              AI is everywhere, disrupting every industry and creating limitless
              opportunities. HPE and NVIDIA are collaborating to deliver
              co-developed solutions to help you accelerate the adoption of
              generative AI.
            </Text>
            {/* // alignement between text and icon is off */}
            <Button
              label="HPE ships first NVIDIA Grace Blackwell system"
              kind="cta-primary"
              alignSelf={
                ['xsmall', 'small'].includes(breakpoint) ? 'none' : 'start'
              }
              icon={<LinkNext size="small" />}
            />
          </Box>
          <Box gridArea="hpeLogo" />
        </Box>
      </Grid>
    </PageContent>
  );
};
