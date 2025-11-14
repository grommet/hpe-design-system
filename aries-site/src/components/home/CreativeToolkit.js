import React, { useContext } from 'react';
import { Box, Heading, Image, PageContent, ResponsiveContext } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { toolkitItems } from '../../data/toolkitItems';

const CreativeToolkitLayout = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      gap="large"
      margin={{ bottom: 'large' }}
      justify="center"
      align="center"
    >
      {toolkitItems.map(({ name, href, image }) => (
        <ContentPreviewCard
          key={name}          
          href={href}
          pad="medium"
          round="xxlarge">
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
                  src={image.src}
                  alt={image.alt}
                  fit="contain"
                  width="xxsmall"
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
    pad="3xlarge"
  >
    <Box fill gap="large" {...rest}>
      <Box justify="center" align="center" gap="xlarge">
        <Heading level={2} size="small" margin="large" textAlign="center">
          Our Creative Toolkit
        </Heading>
      </Box>
      <CreativeToolkitLayout />
    </Box>
  </PageContent>
);
