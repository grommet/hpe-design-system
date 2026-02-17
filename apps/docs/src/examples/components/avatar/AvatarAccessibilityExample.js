import React from 'react';
import { Avatar, Box, Button, Text } from 'grommet';

export const AvatarAccessibilityExample = () => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('Avatar containing initial letters J and S was clicked');
  };
  return (
    <Box align="center">
      <Button onClick={handleClick}>
        <Avatar
          size="large"
          a11yTitle="Avatar containing initial letters
          J and S when clicked an alert will pop up"
          // TODO: Consider a different background here
          background="decorative-green"
        >
          <Text size="large" color="text-strong">JS</Text>
        </Avatar>
      </Button>
    </Box>
  );
};
