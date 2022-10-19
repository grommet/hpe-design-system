import React from 'react';
import { Avatar, Box, Text } from 'grommet';

export const AvatarSizePreviewExample = () => (
  <Box align="center" height="small" direction="row" gap="xlarge">
    <Box align="center" gap="small" width="small">
      <Avatar
        size="small"
        src="//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80"
        a11yTitle="Eric Soderberg image"
      />
      <Text size="small">Small avatar with profile picture</Text>
    </Box>
    <Box align="center" gap="small" width="small">
      <Avatar
        a11yTitle="Avatar containing initial letters J and S"
        background="green"
      >
        JS
      </Avatar>
      <Text size="small">Medium avatar with initials</Text>
    </Box>
    <Box align="center" gap="small" width="small">
      <Avatar
        round="medium"
        a11yTitle="shape logo"
        size="xlarge"
        src="/Shape.svg"
      />
      <Text size="small">Large avatar with logo</Text>
    </Box>
  </Box>
);
