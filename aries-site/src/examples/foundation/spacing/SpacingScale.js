import React from 'react';
import { Box, Text } from 'grommet';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

export const SpacingScale = () => {
  const { data: spacingTokens } = useDesignTokens('semantic.spacing');
  console.log(spacingTokens);

  const spacingTokenList = Object.keys(spacingTokens).map(tokenKey => {
    const token = spacingTokens[tokenKey];

    return (
      <Box
        key={token.id}
        // direction="row"
        align="center"
        gap="3xsmall"
        margin={{ bottom: 'xsmall' }}
      >
        <Box
          width={token.value}
          pad={{ vertical: 'xxsmall' }}
          border={{
            color: 'decorative-purple',
            side: 'vertical',
            size: 'small',
          }}
        >
          <Box
            border={{
              color: 'decorative-purple',
              side: 'bottom',
              style: 'dashed',
              size: 'small',
            }}
          />
        </Box>
        <Text size="small">{token.token.split('hpe.spacing.')[1]}</Text>
      </Box>
    );
  });

  return (
    <Box direction="row" gap="small">
      {spacingTokenList}
    </Box>
  );
};
