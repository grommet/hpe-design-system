import React, { Fragment, useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import Link from 'next/link';

import { ContentPreviewCard } from '../cards';
import { internalLink } from '../content';
import { nameToPath, useDarkMode } from '../../utils';
import { highlights } from '../../data';

const HighlightsLayout = () => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Grid
      pad={{ horizontal: size !== 'small' ? 'medium' : 'large' }}
      columns={size !== 'small' ? 'medium' : '100%'}
      gap="large"
      justify="center"
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
              forwardedAs="a"
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
};

export const Highlights = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box fill background="background-front">
      <Box fill gap="medium" pad={{ vertical: 'large' }} {...rest}>
        <Box
          justify="center"
          align="center"
          pad={{ horizontal: size !== 'small' ? 'xlarge' : 'large' }}
          gap="large"
        >
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
        <Box fill="horizontal" align="center" justify="center" pad="medium">
          <Link href="/showmore" passHref>
            <Button primary label="Show Me More" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
