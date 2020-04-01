import React from 'react';
import { Box, Button } from 'grommet';

export const ButtonStatesExample = () => {
  return (
    <Box direction="row" gap="large">
      <Box align="center" gap="medium">
        <Button label="Default" onClick={() => {}} />
        <Button label="Active" active onClick={() => {}} />
        <Button label="Disabled" disabled onClick={() => {}} />
      </Box>
      <Box align="center" gap="medium">
        <Button label="Primary" primary onClick={() => {}} />
        <Button label="Primary Active" primary active onClick={() => {}} />
        <Button label="Primary Disabled" primary disabled onClick={() => {}} />
      </Box>
    </Box>
  );
};
