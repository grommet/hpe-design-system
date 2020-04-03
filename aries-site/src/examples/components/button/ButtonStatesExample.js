import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';

export const ButtonStatesExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={size !== 'small' ? 'column' : 'row'}
      gap={size !== 'small' ? 'small' : 'medium'}
    >
      <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
        <Button label="Default" onClick={() => {}} />
        <Button label="Active" active onClick={() => {}} />
        <Button label="Disabled" disabled onClick={() => {}} />
      </Box>
      <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
        <Button label="Primary" primary onClick={() => {}} />
        <Button label="Primary Active" primary active onClick={() => {}} />
        <Button label="Primary Disabled" primary disabled onClick={() => {}} />
      </Box>
    </Box>
  );
};
