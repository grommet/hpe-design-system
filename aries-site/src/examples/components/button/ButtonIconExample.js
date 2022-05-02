import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

export function ButtonIconExample() {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={!['xsmall', 'small'].includes(size) ? 'column' : 'row'}
      gap={!['xsmall', 'small'].includes(size) ? 'small' : 'medium'}
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
        align="center"
      >
        <Button label="Button" icon={<FormPrevious />} onClick={() => {}} />
        <Button label="Button" icon={<FormNext />} reverse onClick={() => {}} />
        <Button icon={<FormNext />} onClick={() => {}} />
      </Box>
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        gap="medium"
        align="center"
      >
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
}
