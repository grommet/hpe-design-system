import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Text } from 'grommet';
import { Identifier, Tile } from 'aries-core';
import { PreviewImageCard } from './PreviewCard';

export const ContentCard = forwardRef(({ topic, ...rest }, ref) => {
  const { description, name, parent, preview } = topic;
  const [isFocused, setIsFocused] = React.useState(false);
  // const darkMode = useDarkMode();
  // let src;
  // if (typeof preview.image !== 'undefined') {
  //   if (typeof preview.image.src === 'object') {
  //     src = darkMode.value ? preview.image.src.dark
  //     : preview.image.src.light;
  //   } else {
  //     src = preview.image.src;
  //   }
  // }
  // const testpicture = 'image-hands.png';

  return (
    <Tile
      align="start"
      background="background-front"
      elevation={isFocused ? 'medium' : 'none'}
      fill
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      pad="large"
      ref={ref}
      {...rest}
    >
      <Box gap="large">
        <PreviewImageCard background={preview && preview.background}>
          {preview &&
            (preview.image ? (
              <Image
                // src={require(`../../../public/${testpicture}`)}
                // src='/image-hands.png'
                src={preview.image.src}
                alt={preview.image.alt}
                fit={preview.image.fit || 'cover'}
              />
            ) : (
              <Box
                style={{ pointerEvents: 'none' }}
                flex
                justify={preview.justify || 'center'}
                align="center"
              >
                {preview.component()}
              </Box>
            ))}
        </PreviewImageCard>
        <Box gap="small">
          <Identifier title={name} align="start" gap="xsmall" size="xxlarge">
            {parent && parent.icon && (
              <Box direction="row" align="center" gap="xsmall">
                {parent.icon('small', parent.color)}
                <Text>{parent.name}</Text>
              </Box>
            )}
          </Identifier>
          <Text size="small">{description}</Text>
        </Box>
      </Box>
    </Tile>
  );
});

ContentCard.propTypes = {
  topic: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      color: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
    }),
    preview: PropTypes.shape({
      background: PropTypes.string,
      justify: PropTypes.string,
      component: PropTypes.func,
      image: PropTypes.shape({
        alt: PropTypes.string,
        fit: PropTypes.string,
        src: PropTypes.string,
      }),
    }),
  }),
};
