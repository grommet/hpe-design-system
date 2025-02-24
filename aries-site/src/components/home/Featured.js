import React from 'react';

import { Box, Grid, Heading, PageContent, Paragraph } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => (
  <PageContent pad={{ bottom: 'large' }} {...rest}>
    <Grid columns={{ count: 'fit', size: 'small' }} gap="large">
      {featured.map(({ name, description, icon, url }) => (
        <ContentPreviewCard
          key={name}
          href={url || nameToPath(name)}
          pad="medium"
        >
          <Box width="100%" round="xsmall">
            {icon}
          </Box>
          <Heading level={2} margin={{ top: 'small', bottom: 'none' }}>
            {name}
          </Heading>
          <Paragraph size="small">{description}</Paragraph>
        </ContentPreviewCard>
      ))}
    </Grid>
  </PageContent>
);

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
