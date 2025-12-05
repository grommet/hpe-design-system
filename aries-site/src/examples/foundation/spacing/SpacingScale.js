import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

const Space = ({ token }) => {
  return (
    <Box key={token.id} align="center" gap="3xsmall" flex={false}>
      <Box
        width={token.value}
        pad={{ vertical: '3xsmall' }}
        border={{
          color: 'decorative-purple',
          side: 'vertical',
          size: 'small',
        }}
        // don't allow box and borders to shrink on small screens
        responsive={false}
      >
        <Box
          border={{
            color: 'decorative-purple',
            side: 'bottom',
            style: 'dotted',
            size: 'small',
          }}
          // don't allow box and borders to shrink on small screens
          responsive={false}
        />
      </Box>
      <Text size="small">{token.token.split('hpe.spacing.')[1]}</Text>
    </Box>
  );
};

Space.propTypes = {
  token: PropTypes.object.isRequired,
};

export const SpacingScale = () => {
  const { data: spacingTokens } = useDesignTokens('semantic.spacing');

  const spacingTokenList = Object.keys(spacingTokens).map(tokenKey => {
    const token = spacingTokens[tokenKey];

    return (
      <Space key={token.id} token={token} />
    );
  });

  return (
    <Box direction="row" gap={{ column: 'small', row: 'medium' }} wrap>
      {spacingTokenList}
    </Box>
  );
};
