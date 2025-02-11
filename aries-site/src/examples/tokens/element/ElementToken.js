import React from 'react';
import PropTypes from 'prop-types';
import { Box, CheckBox, Text } from 'grommet';
// eslint-disable-next-line import/no-unresolved
import { components } from 'hpe-design-tokens/grommet';
import { Add } from 'grommet-icons';

export const ElementToken = ({ token }) => {
  let paddingX = components.hpe.element.medium.paddingX.default;
  if (token === 'paddingX.narrow') {
    paddingX = components.hpe.element.medium.paddingX.narrow;
  } else if (token === 'paddingX.wide') {
    paddingX = components.hpe.element.medium.paddingX.wide;
  }

  return (
    <Box
      background={
        token === 'minHeight' || token === 'width' || token === 'height'
          ? { color: 'brand', opacity: 'weak' }
          : undefined
      }
      border={{
        color: token === 'borderWidth' ? 'brand' : 'border',
        style: token === 'borderWidth' ? 'dashed' : 'solid',
        width: components.hpe.element.medium.borderWidth,
      }}
      round="xsmall"
      overflow="hidden"
      direction="row"
      alignSelf="start"
      width={
        token === 'width' || token === 'height'
          ? components.hpe.element.medium.width
          : undefined
      }
      height={
        token === 'width' || token === 'height'
          ? components.hpe.element.medium.width
          : undefined
      }
    >
      {token !== 'width' && token !== 'height' ? (
        <>
          <Box
            width={paddingX}
            background={token.includes('paddingX') ? 'brand' : undefined}
          />
          <Box flex>
            <Box
              height={components.hpe.element.medium.paddingY}
              background={token === 'paddingY' ? 'brand' : undefined}
            />
            <Box direction="row" align="center">
              <Box
                background={
                  token === 'icon.size'
                    ? { color: 'brand', opacity: 'weak' }
                    : undefined
                }
                border={
                  token === 'icon.size'
                    ? { color: 'brand', style: 'dashed' }
                    : undefined
                }
              >
                {token === 'textToElementX' ? <CheckBox pad="none" /> : <Add />}
              </Box>
              <Box
                width={
                  token === 'textToElementX'
                    ? components.hpe.element.medium.textToElementX
                    : components.hpe.element.medium.textToIconX
                }
                background={token.includes('textTo') ? 'brand' : undefined}
                height={components.hpe.element.medium.lineHeight}
              />
              <Box
                background={
                  token === 'lineHeight'
                    ? { color: 'brand', opacity: 'weak' }
                    : undefined
                }
                border={
                  token === 'lineHeight'
                    ? { color: 'brand', style: 'dashed' }
                    : undefined
                }
              >
                <Text>Hello world</Text>
              </Box>
            </Box>
            <Box
              height={components.hpe.element.medium.paddingY}
              background={token === 'paddingY' ? 'brand' : undefined}
            />
          </Box>
          <Box
            width={paddingX}
            background={token.includes('paddingX') ? 'brand' : undefined}
          />
        </>
      ) : undefined}
    </Box>
  );
};

ElementToken.propTypes = {
  token: PropTypes.string.isRequired,
};
