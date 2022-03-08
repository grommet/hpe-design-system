import React, { useContext } from 'react';

import { Box, Grid, Paragraph, ResponsiveContext, Stack, Text } from 'grommet';
import Link from 'next/link';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      pad={{
        horizontal: !['xsmall', 'small'].includes(size) ? 'xlarge' : 'large',
        bottom: 'small',
      }}
      {...rest}
    >
      <Grid columns={{ count: 'fit', size: 'small' }} gap="large">
        {featured.map(({ name, description, icon, url }) => (
          <Link href={url || nameToPath(name)} passHref key={name}>
            <ContentPreviewCard
              as="a"
              style={{ textDecoration: 'none' }}
              pad="medium"
            >
              <Box width="100%" round="xsmall">
                {icon}
              </Box>
              <Text
                weight="bold"
                size="xlarge"
                color="text-strong"
                margin={{ top: 'small' }}
              >
                {name}
              </Text>
              <Paragraph size="small">{description}</Paragraph>
            </ContentPreviewCard>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export const Featured = ({ ...rest }) => (
  <Stack guidingChild="last">
    <Box background="background-front" margin={{ top: 'xlarge' }} fill />
    <FeaturedLayout {...rest} />
  </Stack>
);
