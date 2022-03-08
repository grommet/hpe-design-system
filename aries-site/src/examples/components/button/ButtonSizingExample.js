import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';

export const ButtonSizingExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      align="center"
      gap="medium"
    >
      <Button label="Default" primary />
      <Button size="small" label="Small" primary />
      <Button size="medium" label="Medium" primary />
      <Button size="large" label="Large" primary />
    </Box>
  );
};
