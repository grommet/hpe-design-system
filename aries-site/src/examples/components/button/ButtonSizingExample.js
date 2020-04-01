import React from 'react';
import { Box, Button } from 'grommet';

export const ButtonSizingExample = () => {
  return (
    <Box direction="row" align="center" pad="large" gap="medium">
      <Button label="Default" />
      <Button size="small" label="Small" />
      <Button size="medium" label="Medium" />
      <Button size="large" label="Large" />
    </Box>
  );
};
