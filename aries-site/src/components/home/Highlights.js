import React, { Fragment, useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  PageContent,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import Link from 'next/link';

import { ContentPreviewCard } from '../cards';
import { internalLink } from '../content';
import { nameToPath, useDarkMode } from '../../utils';
import { highlights } from '../../data';

function HighlightsLayout() {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      gap="large"
    >
      {highlights.map(({ name, summary, image }) => {
        const href = nameToPath(name);
        const isInternalLink = internalLink.test(href);
        const Wrapper = isInternalLink ? Link : Fragment;
        const wrapperProps = isInternalLink && {
          href,
          passHref: true,
        };

        return (
          <Wrapper key={name} {...wrapperProps}>
            <ContentPreviewCard
              as="a"
              style={{ textDecoration: 'none' }}
              pad="medium"
            >
              <Box direction="row" gap="medium">
                <Box width="small" round="xsmall">
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
                <Box fill>
                  <Text
                    weight="bold"
                    size="large"
                    margin={{ top: 'small' }}
                    color="text-strong"
                  >
                    {name}
                  </Text>
                  <Paragraph>{summary}</Paragraph>
                </Box>
              </Box>
            </ContentPreviewCard>
          </Wrapper>
        );
      })}
    </Grid>
  );
}

export function Highlights({ ...rest }) {
  return <PageContent background={{ fill: 'horizontal', color: 'background-front' }}>
    <Box fill gap="medium" pad={{ vertical: 'large' }} {...rest}>
      <Box justify="center" align="center" gap="large">
        <Heading margin="none" level={2} size="large">
          Highlights
        </Heading>
        <Box width="large" pad={{ bottom: 'medium' }}>
          <Paragraph size="xlarge" fill textAlign="center" margin="none">
            The HPE Design System team is committed to conducting thorough
            research so you don't have to think about it. Just find what you
            need, design and deliver quickly!
          </Paragraph>
        </Box>
      </Box>
      <HighlightsLayout />
      <Box
        fill="horizontal"
        align="center"
        justify="center"
        pad={{ vertical: 'medium' }}
      >
        <Link href="/showmore" passHref>
          <Button primary label="Show Me More" />
        </Link>
      </Box>
    </Box>
  </PageContent>;
}
