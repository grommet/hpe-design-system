import React from 'react';
import { Box, Button } from 'grommet';
import { Previous, Next } from 'grommet-icons';

export const ButtonIconExample = () => {
  return (
    <Box direction="row" gap="large">
      <Box align="center" gap="medium">
        <Button label="Button" icon={<Previous />} onClick={() => {}} />
        <Button label="Button" icon={<Next />} reverse onClick={() => {}} />
        <Button icon={<Next />} onClick={() => {}} />
      </Box>
      <Box align="center" gap="medium">
        <Button label="Button" icon={<Previous />} primary onClick={() => {}} />
        <Button
          label="Button"
          icon={<Next />}
          primary
          reverse
          onClick={() => {}}
        />
        <Button icon={<Next />} primary onClick={() => {}} />
      </Box>
    </Box>
  );
};
