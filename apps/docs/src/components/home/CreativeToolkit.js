import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Image, PageContent, ResponsiveContext } from 'grommet';
import { ContentPreviewCard } from '../cards';
import { toolkitItems } from '../../data/toolkitItems';

const CreativeToolkitLayout = ({ level }) => {
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
                  // The image alt text is the same as the card's heading and
                  // thus redundant. Because of that, we are treating as a
                  // decorative only image.
                  alt=""
                  fit="contain"
                  width="xxsmall"
                />
              )}
            </Box>
            <Heading
              level={level}
              margin="none"
              alignSelf="center"
              size="small"
            >
              {name}
            </Heading>
          </Box>
        </ContentPreviewCard>
      ))}
    </Box>
  );
};

CreativeToolkitLayout.propTypes = {
  level: PropTypes.number.isRequired,
};

export const CreativeToolkit = ({ ...rest }) => {
  const sectionHeadingLevel = 2;

  return (
    <PageContent
      background={{ fill: 'horizontal', color: 'background-back' }}
      pad="3xlarge"
    >
      <Box fill gap="large" {...rest}>
        <Box justify="center" align="center" gap="xlarge">
          <Heading
            level={sectionHeadingLevel}
            size="small"
            margin="large"
            textAlign="center"
          >
            Creative toolkit
          </Heading>
        </Box>
        <CreativeToolkitLayout level={sectionHeadingLevel + 1} />
      </Box>
    </PageContent>
  );
};
