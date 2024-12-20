import React from 'react';
import { medium } from 'hpe-design-tokens';
import { Box, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';

// eslint-disable-next-line react/prop-types
export const SpacingBestPractices = ({ bestPractice = true }) => {
  const highlightBorder = { style: 'dashed', color: 'brand' };
  if (!bestPractice) {
    return (
      <Box border="border" overflow="hidden" direction="row" round>
        <Box
          width={medium.hpe.spacing.xsmall}
          border={highlightBorder}
          height={{ min: '100%' }}
        />
        <Box height="100%" flex>
          <Box
            height={medium.hpe.spacing.xsmall}
            border={highlightBorder}
            width="100%"
          />
          <Box gap="xsmall" direction="row" align="center">
            <Checkmark />
            <Text>Label</Text>
          </Box>
          <Box
            height={medium.hpe.spacing.xsmall}
            border={highlightBorder}
            width="100%"
          />
        </Box>
        <Box
          width={medium.hpe.spacing.xsmall}
          border={highlightBorder}
          height={{ min: '100%' }}
        />
      </Box>
    );
  }

  return (
    <Box border="border" round="small" overflow="hidden" direction="row">
      <Box
        width={medium.hpe.spacing.small}
        border={highlightBorder}
        height={{ min: '100%' }}
      />
      <Box height="100%" flex>
        <Box
          height={medium.hpe.spacing.small}
          border={highlightBorder}
          width="100%"
        />
        <Box gap="xsmall">
          <Box
            height={medium.hpe.spacing.small}
            background="background-contrast"
            width="100%"
            round
          />
          <Box
            height={medium.hpe.spacing.small}
            background="background-contrast"
            width="75%"
            round
          />
          <Box
            height={medium.hpe.spacing.small}
            background="background-contrast"
            width="75%"
            round
          />
          <Box height={medium.hpe.spacing.large} width="75%" round />
          <Box
            height={medium.hpe.spacing.small}
            background="background-contrast"
            width="100%"
            round
          />
          <Box
            height={medium.hpe.spacing.small}
            background="background-contrast"
            width="50%"
            round
          />
        </Box>
        <Box
          height={medium.hpe.spacing.small}
          border={highlightBorder}
          width="100%"
        />
      </Box>
      <Box
        width={medium.hpe.spacing.small}
        border={highlightBorder}
        height={{ min: '100%' }}
      />
    </Box>
  );
};
