import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { Add } from 'grommet-icons';

export const StrongBackgrounds = () => {
  const theme = useContext(ThemeContext);
  console.log(theme);
  return (
    <Box gap="large">
      <Box
        background={{
          color: 'background-neutral-xstrong',
          dark: theme.dark,
        }}
        pad="medium"
        round="medium"
        gap="medium"
      >
        <Text color="text-onStrong" size="large" weight={500}>
          color.background.neutral.xstrong
        </Text>
        <Box gap="small">
          <Box direction="row" gap="small">
            <Text color="text-onStrong" weight={500}>
              Aa
            </Text>
            <Text color="text-onStrong">color.text.onStrong</Text>
          </Box>
          <Box direction="row" gap="small">
            <Add color="icon-onStrong" height="medium" />
            <Text color="text-onStrong">color.icon.onStrong</Text>
          </Box>
        </Box>
      </Box>
      <Box
        background="background-contrast"
        pad="medium"
        round="medium"
        align="center"
        gap="medium"
      >
        <Text size="large">Badge using strong and onStrong colors.</Text>
        <Button secondary label="Button" badge={2} />
      </Box>
    </Box>
  );
};
