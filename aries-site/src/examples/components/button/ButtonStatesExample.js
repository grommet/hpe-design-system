import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';

export const ButtonStatesExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'column' : 'row'}
      gap={!['xsmall', 'small'].includes(size) ? 'xsmall' : 'medium'}
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
      >
        <Button label="Default" onClick={() => {}} />
        <Button label="Active" active onClick={() => {}} />
        <Button label="Disabled" disabled onClick={() => {}} />
      </Box>
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
      >
        <Button label="Primary" primary onClick={() => {}} />
        <Button label="Primary active" primary active onClick={() => {}} />
        <Button label="Primary disabled" primary disabled onClick={() => {}} />
      </Box>
    </Box>
  );
};
