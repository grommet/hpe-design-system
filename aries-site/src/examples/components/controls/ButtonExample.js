import React from 'react';
import { Box, Button } from 'grommet';
import { Next } from 'grommet-icons';

export const ButtonExample = () => {
  return (
    <Box direction="column" align="start" gap="large">
      <Button
        label="Check it out!"
        icon={<Next />}
        reverse
        primary
        onClick={() => {}}
      />
      <Box direction="row" gap="medium">
        <Button type="submit" label="Submit" primary onClick={() => {}} />
        <Button type="reset" label="Reset" disabled onClick={() => {}} />
        <Button label="Cancel" onClick={() => {}} />
      </Box>
    </Box>
  );
};
