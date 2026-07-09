import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Avatar, Box, Button, Grid, ResponsiveContext, Text } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';

// placeholder — replace with token when
// color.background.accent.purple.strong is available
const ACCENT_PURPLE_STRONG = '#7c3aed';

export const StrongBackgrounds = () => {
  const theme = useContext(ThemeContext);
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={
        !['xsmall', 'small'].includes(size)
          ? { count: 2, size: 'flex' }
          : undefined
      }
      gap="medium"
    >
      <Box gap="medium">
        <Box
          background={{
            color: 'background-neutral-xstrong',
            dark: theme.dark,
          }}
          pad="medium"
          round="xlarge"
          gap="medium"
        >
          <Text color="text-onStrong" size="large" weight={500}>
            color.background.neutral.xstrong
          </Text>
          <Box gap="xsmall">
            <Box direction="row" gap="xsmall">
              <Text color="text-onStrong" weight={500}>
                Aa
              </Text>
              <Text color="text-onStrong">color.text.onStrong</Text>
            </Box>
            <Box direction="row" gap="xsmall">
              <Add color="icon-onStrong" height="medium" />
              <Text color="text-onStrong">color.icon.onStrong</Text>
            </Box>
          </Box>
        </Box>
        <Box
          background="background-contrast"
          pad="medium"
          round="xlarge"
          align="center"
          gap="medium"
        >
          <Text size="large">Badge using strong and onStrong colors.</Text>
          <Button secondary label="Button" badge={2} />
        </Box>
      </Box>
      <Box gap="medium">
        <Box
          background={ACCENT_PURPLE_STRONG}
          pad="medium"
          round="xlarge"
          gap="medium"
        >
          <Text color="text-onStrong" size="large" weight={500}>
            color.background.accent.purple.strong
          </Text>
          <Box gap="xsmall">
            <Box direction="row" gap="xsmall">
              <Text color="text-onStrong" weight={500}>
                Aa
              </Text>
              <Text color="text-onStrong">color.text.onStrong</Text>
            </Box>
            <Box direction="row" gap="xsmall">
              <Add color="icon-onStrong" height="medium" />
              <Text color="text-onStrong">color.icon.onStrong</Text>
            </Box>
          </Box>
        </Box>
        <Box
          background="background-contrast"
          pad="medium"
          round="xlarge"
          align="center"
          gap="medium"
        >
          <Text size="large">Avatar using strong and onStrong colors.</Text>
          <Avatar background={ACCENT_PURPLE_STRONG}>
            <Text color="text-onStrong" weight={500}>
              AN
            </Text>
          </Avatar>
        </Box>
      </Box>
    </Grid>
  );
};
