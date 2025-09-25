import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { Previous, Next } from 'grommet-icons';

export const ButtonIconExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'column' : 'row'}
      gap={!['xsmall', 'small'].includes(size) ? 'xsmall' : 'medium'}
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
        align="center"
      >
        <Button label="Button" icon={<Previous />} onClick={() => {}} />
        <Button label="Button" icon={<Next />} reverse onClick={() => {}} />
        <Button a11yTitle="Next" icon={<Next />} onClick={() => {}} />
      </Box>
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
        align="center"
      >
        <Button label="Button" icon={<Previous />} primary onClick={() => {}} />
        <Button
          label="Button"
          icon={<Next />}
          primary
          reverse
          onClick={() => {}}
        />
        <Button a11yTitle="Next" icon={<Next />} primary onClick={() => {}} />
      </Box>
    </Box>
  );
};
