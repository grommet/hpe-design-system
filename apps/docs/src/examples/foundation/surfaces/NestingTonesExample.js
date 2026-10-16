// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';

// TODO: replace with background.surface.* theme tokens once they land (#5969)
const SURFACE = {
  base: '#FFFFFF',
  floating: '#FFFFFF',
  tone1: '#F7F7F7',
  tone2: '#FFFFFF',
};

const SurfaceStack = ({ rootColor, rootLabel, heading, elevation }) => (
  <Box
    gap="medium"
    width={{ max: 'medium' }}
    fill="horizontal"
    margin={{ horizontal: 'auto' }}
  >
    <Text weight="bold" textAlign="center">
      {heading}
    </Text>
    <Box
      background={{ color: rootColor, dark: false }}
      elevation={elevation}
      round="xlarge"
      pad="medium"
      gap="small"
    >
      <Text
        size="small"
        textAlign="center"
        wordBreak="break-word"
        margin={{ vertical: 'xsmall' }}
      >
        {rootLabel}
      </Text>
      <Box
        background={{ color: SURFACE.tone1, dark: false }}
        round="large"
        pad="medium"
        gap="small"
      >
        <Text
          size="small"
          textAlign="center"
          wordBreak="break-word"
          margin={{ vertical: 'xsmall' }}
        >
          background.surface.tone.1
        </Text>
        <Box
          background={{ color: SURFACE.tone2, dark: false }}
          round="medium"
          pad="medium"
          gap="small"
        >
          <Text
            size="small"
            textAlign="center"
            wordBreak="break-word"
            margin={{ vertical: 'xsmall' }}
          >
            background.surface.tone.2
          </Text>
          <Box
            background={{ color: SURFACE.tone1, dark: false }}
            round="small"
            pad="medium"
            gap="small"
          >
            <Text
              size="small"
              textAlign="center"
              wordBreak="break-word"
              margin={{ vertical: 'xsmall' }}
            >
              background.surface.tone.1
            </Text>
            <Box
              background={{ color: SURFACE.tone2, dark: false }}
              round="small"
              pad="small"
            >
              <Text textAlign="center">…</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);

SurfaceStack.propTypes = {
  rootColor: PropTypes.string.isRequired,
  rootLabel: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  elevation: PropTypes.string,
};

export const NestingTonesExample = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box background="#F7F7F7" pad="medium">
      <Grid
        columns={{
          count: ['xsmall', 'small'].includes(size) ? 1 : 2,
          size: 'flex',
        }}
        gap="medium"
      >
        <SurfaceStack
          heading="Tones on a page"
          rootColor={SURFACE.base}
          rootLabel="background.surface.base"
        />
        <SurfaceStack
          heading="Tones on floating surfaces"
          rootColor={SURFACE.floating}
          rootLabel="background.surface.floating"
          elevation="medium"
        />
      </Grid>
    </Box>
  );
};