import React from 'react';
import Link from 'next/link';

import { Box, Button, Grid, Heading, PageContent, Paragraph } from 'grommet';
// import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => (
  <PageContent gap="large" {...rest}>
    <Heading level={2} margin="none">
      Get started creating
    </Heading>
    <Grid columns={{ count: 'fit', size: 'small' }} gap="large">
      {featured.map(({ name, description, url, label }) => (
        <Box pad="medium" align="start" key={name}>
          <Heading
            level={2}
            size="small"
            margin={{ top: 'small', bottom: 'none' }}
          >
            {name}
          </Heading>
          <Paragraph color="text-weak">{description}</Paragraph>
          <Link passHref legacyBehavior href={nameToPath(name) || url}>
            <Button secondary label={label} />
          </Link>
        </Box>
      ))}
    </Grid>
  </PageContent>
);

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
