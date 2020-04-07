import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';

export const ButtonSizingExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
      <Button label="Default" />
      <Button size="small" label="Small" />
      <Button size="medium" label="Medium" />
      <Button size="large" label="Large" />
    </Box>
  );
};
