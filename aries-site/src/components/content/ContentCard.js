import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Text, defaultProps } from 'grommet';
import { Identifier, Tile } from 'aries-core';

const { size } = defaultProps.theme.global;
const maxCardWidth = `${parseInt(size.medium, 10) +
  parseInt(size.small, 10)}px`;

export const ContentCard = forwardRef(({ topic, ...rest }, ref) => {
  const { description, name, parent, previewImage } = topic;
  const [isFocused, setIsFocused] = React.useState(false);

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
      pad="medium"
      ref={ref}
      width={{ max: maxCardWidth }}
      {...rest}
    >
      <Box gap="large">
        <Box background="background-back" height="small" round="xsmall">
          {previewImage && (
            <Image
              src={previewImage.src}
              alt={previewImage.alt}
              fit={previewImage.fit}
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
      src: PropTypes.string,
    }),
  }),
};
