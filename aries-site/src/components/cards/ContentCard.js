import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Identifier, Tile } from 'aries-core';
import { aries } from '../../themes/aries';
import { useDarkMode } from '../../utils';

export const ContentCard = forwardRef(({ topic, ...rest }, ref) => {
  const { description, name, parent, preview } = topic;
  const [isFocused, setIsFocused] = React.useState(false);
  const themeMode = useDarkMode().value ? 'dark' : 'light';
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
          {preview && preview(aries, themeMode)}
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
    preview: PropTypes.func,
  }),
};
