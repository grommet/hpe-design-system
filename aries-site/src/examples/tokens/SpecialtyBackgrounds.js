import React from 'react';
import { Box, Button, Paragraph, Text } from 'grommet';
import { Add } from 'grommet-icons';

export const SpecialtyBackgrounds = () => {
  return (
    <Box align="center" gap='xlarge'>
      <Box
        background={{ color: 'background-primary-strong', dark: false }}
        pad="medium"
        round='xlarge'
        gap="medium"
      >
        <Text color="text-onStrong" size="large" weight={500}>
          color.background.primary.strong
        </Text>
        <Box gap='xsmall'>
          <Box direction="row" gap='xsmall'>
            <Text color="text-onStrong" weight={500}>
              Aa
            </Text>
            <Text color="text-onPrimaryStrong">color.text.onPrimaryStrong</Text>
          </Box>
          <Box direction="row" gap='xsmall'>
            <Add color="icon-onPrimaryStrong" height="medium" />
            <Text color="text-onPrimaryStrong">color.icon.onPrimaryStrong</Text>
          </Box>
        </Box>
      </Box>
      <Box
        background="background-contrast"
        pad="medium"
        round='xlarge'
        align="center"
        gap="medium"
      >
        <Paragraph size="large" margin="none">
          Button using color.background.primary.strong and
          color.text.onPrimaryStrong.
        </Paragraph>
        <Button primary label="Primary" />
      </Box>
    </Box>
  );
};
