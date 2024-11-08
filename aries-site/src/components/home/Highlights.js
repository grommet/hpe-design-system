import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  PageContent,
  Paragraph,
  ResponsiveContext,
} from 'grommet';

import Link from 'next/link';

import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';
import { highlights } from '../../data';

const HighlightsLayout = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      gap="large"
    >
      {highlights.map(({ name, summary }) => {
        const href = nameToPath(name);
        return (
          <ContentPreviewCard
            key={name}
            href={href}
            pad="medium"
            border={{ color: 'border-weak' }}
          >
            <Box direction="row" align="center" gap="medium">
              <Box gap="small">
                <Heading level={3} margin="none">
                  {name}
                </Heading>
                <Paragraph color="text-weak" margin="none">
                  {summary}
                </Paragraph>
              </Box>
            </Box>
          </ContentPreviewCard>
        );
      })}
    </Grid>
  );
};

export const Highlights = ({ ...rest }) => (
  <PageContent>
    <Box fill pad={{ vertical: 'large' }} gap="xlarge" {...rest}>
      <Heading alignSelf="center" margin="none" level={2}>
        Popular resources
      </Heading>
      <Box gap="large">
        <HighlightsLayout />
        <Link href="/components" passHref legacyBehavior>
          <Button alignSelf="center" primary label="View all components" />
        </Link>
      </Box>
    </Box>
  </PageContent>
);
