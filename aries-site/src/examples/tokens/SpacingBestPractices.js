import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { dimension } from 'hpe-design-tokens/grommet';
import { Box, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';

// eslint-disable-next-line react/prop-types
export const SpacingBestPractices = ({ bestPractice = true }) => {
  const highlightBorder = { style: 'dashed', color: 'brand' };
  if (!bestPractice) {
    return (
      <Box border="border" overflow="hidden" direction="row" round>
        <Box
          width={dimension.hpe.spacing.xsmall}
          border={highlightBorder}
          height={{ min: '100%' }}
        />
        <Box height="100%" flex>
          <Box
            height={dimension.hpe.spacing.xsmall}
            border={highlightBorder}
            width="100%"
          />
          <Box gap='3xsmall' direction="row" align="center">
            <Checkmark />
            <Text>Label</Text>
          </Box>
          <Box
            height={dimension.hpe.spacing.xsmall}
            border={highlightBorder}
            width="100%"
          />
        </Box>
        <Box
          width={dimension.hpe.spacing.xsmall}
          border={highlightBorder}
          height={{ min: '100%' }}
        />
      </Box>
    );
  }

  return (
    <Box border="border" round='medium' overflow="hidden" direction="row">
      <Box
        width={dimension.hpe.spacing.small}
        border={highlightBorder}
        height={{ min: '100%' }}
      />
      <Box height="100%" flex>
        <Box
          height={dimension.hpe.spacing.small}
          border={highlightBorder}
          width="100%"
        />
        <Box gap='3xsmall'>
          <Box
            height={dimension.hpe.spacing.small}
            background="background-contrast"
            width="100%"
            round
          />
          <Box
            height={dimension.hpe.spacing.small}
            background="background-contrast"
            width="75%"
            round
          />
          <Box
            height={dimension.hpe.spacing.small}
            background="background-contrast"
            width="75%"
            round
          />
          <Box height={dimension.hpe.spacing.large} width="75%" round />
          <Box
            height={dimension.hpe.spacing.small}
            background="background-contrast"
            width="100%"
            round
          />
          <Box
            height={dimension.hpe.spacing.small}
            background="background-contrast"
            width="50%"
            round
          />
        </Box>
        <Box
          height={dimension.hpe.spacing.small}
          border={highlightBorder}
          width="100%"
        />
      </Box>
      <Box
        width={dimension.hpe.spacing.small}
        border={highlightBorder}
        height={{ min: '100%' }}
      />
    </Box>
  );
};
