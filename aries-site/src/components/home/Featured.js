import React from 'react';

import { Box, Grid, Heading, PageContent, Paragraph, Button } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => (
  <PageContent {...rest}>
    <Box align="center" justify="center" fill={false}>
      <Grid
        columns={['384px', '384px']}
        gap="medium"
        pad={{ bottom: '96px' }}
        fill={false}
      >
        {featured.map(({ name, description, icon, url }) => (
          <ContentPreviewCard
            key={name}
            href={url || nameToPath(name)}
            pad="xlarge"
            style={{ maxWidth: 436 }}
          >
            <Box
              width="100%"
              round="small"
              align="center"
              justify="center"
            >
              {/* Icon with background color */}
              <Box
                background="background-contrast"
                pad="medium"
                round="small"
                margin={{ bottom: 'small' }}
                align="center"
                justify="center"
              >
                {icon}
              </Box>
              <Heading
                size="small"
                level={3}
                margin={{ top: 'xsmall', bottom: 'none' }}
                textAlign="center"
              >
                {name}
              </Heading>
              <Paragraph size="xlarge" textAlign="center">
                {description}
              </Paragraph>
              <Box
                align="center"
                margin={{ top: 'medium' }}
              >
                {/* Refactored to avoid nested ternary */}
                {name === 'Design' && (
                  <Button secondary label="Start Designing" />
                )}
                {name === 'Develop' && (
                  <Button secondary label="Get the code" />
                )}
              </Box>
            </Box>
          </ContentPreviewCard>
        ))}
      </Grid>
    </Box>
  </PageContent>
);

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
