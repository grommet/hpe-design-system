import React from 'react';

import { Box, Grid, Heading, PageContent, Paragraph, Button } from 'grommet';
import { featured } from '../../data';

const FeaturedLayout = ({ ...rest }) => (
  <PageContent {...rest}>
    <Box align="center" justify="center" fill={false}>
      <Grid
        columns={['medium', 'medium']}
        gap="medium"
        pad={{ bottom: '3xlarge' }}
        fill={false}
      >
        {featured.map(({ name, description, icon }) => (
          <Box
            key={name}
            width="100%"
            round="small"
            align="center"
            justify="center"
            pad="xlarge"
            background="background-front"
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
              {/* Only buttons are clickable now */}
              {name === 'Design' && (
                <Button
                  secondary
                  label="Start Designing"
                  href='/foundation/designer-guidance'
                />
              )}
              {name === 'Develop' && (
                <Button
                  secondary
                  label="Get the code"
                  href='/foundation/developer-guidance'
                />
              )}
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  </PageContent>
);

export const Featured = ({ ...rest }) => <FeaturedLayout {...rest} />;
