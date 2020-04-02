import React from 'react';
import { Box, Button } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

export const ButtonIconExample = () => {
  return (
    <Box direction="row" gap="large">
      <Box align="center" gap="medium">
        <Button label="Button" icon={<FormPrevious />} onClick={() => {}} />
        <Button label="Button" icon={<FormNext />} reverse onClick={() => {}} />
        <Button icon={<FormNext />} onClick={() => {}} />
      </Box>
      <Box align="center" gap="medium">
        <Button
          label="Button"
          icon={<FormPrevious />}
          primary
          onClick={() => {}}
        />
        <Button
          label="Button"
          icon={<FormNext />}
          primary
          reverse
          onClick={() => {}}
        />
        <Button icon={<FormNext />} primary onClick={() => {}} />
      </Box>
    </Box>
  );
};
