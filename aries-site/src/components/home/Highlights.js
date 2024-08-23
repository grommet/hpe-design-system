import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  // Image,
  PageContent,
  Paragraph,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';

import Link from 'next/link';

import { ContentPreviewCard } from '../cards';
import {
  nameToPath,
  // useDarkMode
} from '../../utils';
import { highlights } from '../../data';

const HighlightsLayout = () => {
  const size = useContext(ResponsiveContext);
  // const darkMode = useDarkMode();

  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      gap="large"
    >
      {highlights.map(
        ({
          name,
          summary,
          // image
        }) => {
          const href = nameToPath(name);
          return (
            <ThemeContext.Extend
              value={{
                card: {
                  container: {
                    elevation: 'none',
                  },
                  hover: {
                    container: {
                      elevation: 'medium',
                    },
                  },
                },
              }}
            >
              <ContentPreviewCard
                key={name}
                href={href}
                pad="medium"
                border={{ color: 'border-weak' }}
              >
                <Box direction="row" align="center" gap="medium">
                  {/* <Box width="small" round="xsmall">
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
                </Box> */}
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
            </ThemeContext.Extend>
          );
        },
      )}
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
