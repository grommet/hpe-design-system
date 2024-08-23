import React from 'react';

import { Grid, Heading, PageContent, Paragraph } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => (
  <PageContent gap="large" {...rest}>
    <Heading alignSelf="center" level={2} margin="none">
      Get started creating
    </Heading>
    <Grid columns={{ count: 'fit', size: 'small' }} gap="large">
      {featured.map(({ name, description, url }) => (
        <ContentPreviewCard
          key={name}
          href={url || nameToPath(name)}
          pad="medium"
          align="center"
        >
          <Heading
            level={2}
            size="small"
            margin={{ top: 'small', bottom: 'none' }}
          >
            {name}
          </Heading>
          <Paragraph color="text-weak" textAlign="center">
            {description}
          </Paragraph>
        </ContentPreviewCard>
      ))}
    </Grid>
  </PageContent>
);

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
