import React from 'react';

import { Box, Grid, PageContent, Paragraph, Stack, Text } from 'grommet';
import Link from 'next/link';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

function FeaturedLayout({ ...rest }) {
  return <PageContent {...rest}>
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
  </PageContent>;
}

export function Featured({ ...rest }) {
  return <Stack guidingChild="last">
    <Box background="background-front" margin={{ top: 'xlarge' }} fill />
    <FeaturedLayout {...rest} />
  </Stack>;
}
