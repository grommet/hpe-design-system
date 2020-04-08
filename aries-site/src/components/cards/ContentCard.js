import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Text } from 'grommet';
import { Identifier, Tile } from 'aries-core';
import { useDarkMode } from '../../utils';

export const ContentCard = forwardRef(({ topic, ...rest }, ref) => {
  const { description, name, parent, previewImage } = topic;
  const [isFocused, setIsFocused] = React.useState(false);
  const darkMode = useDarkMode();
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
        <Box
          background="background-back"
          height="small"
          round="xsmall"
          overflow="hidden"
          style={{ position: 'relative' }}
        >
          {previewImage && (
            <Image
              src={
                darkMode.value ? previewImage.src.dark : previewImage.src.light}
              alt={previewImage.alt}
              fit={previewImage.fit || 'cover'}
            />
          )}
        </Box>
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
    previewImage: PropTypes.shape({
      alt: PropTypes.string,
      fit: PropTypes.string,
      src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
    preview: PropTypes.func,
  }),
};
