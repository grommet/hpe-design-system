import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { Left, Right } from '@hpe-design/icons-grommet';

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
        <Button label="Button" icon={<Left />} onClick={() => {}} />
        <Button label="Button" icon={<Right />} reverse onClick={() => {}} />
        <Button a11yTitle="Next" icon={<Right />} onClick={() => {}} />
      </Box>
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
        align="center"
      >
        <Button label="Button" icon={<Left />} primary onClick={() => {}} />
        <Button
          label="Button"
          icon={<Right />}
          primary
          reverse
          onClick={() => {}}
        />
        <Button a11yTitle="Next" icon={<Right />} primary onClick={() => {}} />
      </Box>
    </Box>
  );
};
