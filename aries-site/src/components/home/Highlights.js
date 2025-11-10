import React, { useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as tokens from 'hpe-design-tokens/docs';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  PageContent,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';

import Link from 'next/link';

import { ContentPreviewCard } from '../cards';
import { nameToPath, useDarkMode } from '../../utils';
import { highlights } from '../../data';

const HighlightsLayout = () => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      gap="xlarge"
    >
      {highlights.map(({ name, summary, image }) => {
        const href = nameToPath(name);
        return (
          <ContentPreviewCard key={name} href={href} pad="medium">
            <Box direction="row" align="center" gap="medium">
              <Box width="xsmall" round="xsmall">
                {image && (
                  <Image
                    src={
                      darkMode.value
                        ? image.src.dark || image.src
                        : image.src.light || image.src
                    }
                    alt={image.alt}
                    fit={image.fit || 'contain'}
                  />
                )}
              </Box>
              <Box gap="3xsmall">
                <Heading level={3} margin="none">
                  {name}
                </Heading>
                <Paragraph margin="none">{summary}</Paragraph>
              </Box>
              <Box align="end" justify="start" height="xxsmall">
                <Button icon={<LinkNext />} plain a11yTitle='Learn more'/>
              </Box>
            </Box>
          </ContentPreviewCard>
        );
      })}
    </Grid>
  );
};

export const Highlights = ({ ...rest }) => (
  <PageContent
    background={{ fill: 'horizontal', color: 'background-back' }}
    pad="xxlarge"
  >
    <Box fill gap="medium" pad={{ vertical: 'xlarge' }} {...rest}>
      <Box justify="center" align="center" gap="xlarge">
        <Heading
          margin="large"
          level={3}
          style={{
            fontSize: tokens.dimension['hpe.text.4xlarge.fontSize']?.$value,
            lineHeight: tokens.dimension['hpe.text.4xlarge.lineHeight']?.$value,
          }}
        >
          System Assets
        </Heading>
      </Box>
      <HighlightsLayout />
      <Box
        fill="horizontal"
        align="center"
        justify="center"
        pad={{ vertical: 'medium' }}
      >
        <Link href="/showmore" passHref legacyBehavior>
          <Button secondary label="Show me more" />
        </Link>
      </Box>
    </Box>
  </PageContent>
);
