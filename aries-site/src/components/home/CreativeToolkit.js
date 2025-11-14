import React, { useContext } from 'react';
import { Box, Heading, Image, PageContent, ResponsiveContext } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { useDarkMode } from '../../utils';

import { toolkitItems } from '../../data/toolkitItems';

const CreativeToolkitLayout = () => {
  const size = useContext(ResponsiveContext);
  const darkMode = useDarkMode();

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      gap="large"
      justify="center"
      align="center"
    >
      {toolkitItems.map(({ name, href, image }) => (
        <ContentPreviewCard key={name} href={href} pad="medium" round="xxlarge">
          <Box
            align="center"
            justify="center"
            gap="medium"
            height="small"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : 'large'}
          >
            <Box
              width="xxsmall"
              height="xsmall"
              align="center"
              justify="center"
            >
              {image && (
                <Image
                  src={
                    darkMode.value
                      ? image.src.dark || image.src
                      : image.src.light || image.src
                  }
                  alt={image.alt}
                  fit="contain"
                  width={image.width || 'xxsmall'}
                />
              )}
            </Box>
            <Heading level={3} margin="none" alignSelf="center">
              {name}
            </Heading>
          </Box>
        </ContentPreviewCard>
      ))}
    </Box>
  );
};

export const CreativeToolkit = ({ ...rest }) => (
  <PageContent
    background={{ fill: 'horizontal', color: 'background-back' }}
    pad="xlarge"
  >
    <Box fill gap="medium" pad={{ vertical: 'medium' }} {...rest}>
      <Box justify="center" align="center" gap="xlarge">
        <Heading size="large" level={2}>
          {/* this font does not look correct think its grabbing
           condensed from hpe pop */}
          Our Creative Toolkit
        </Heading>
      </Box>
      <CreativeToolkitLayout />
    </Box>
  </PageContent>
);
