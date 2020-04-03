import React from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

export const ButtonIconExample = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={size !== 'small' ? 'column' : 'row'}
      gap={size !== 'small' ? 'small' : 'medium'}
    >
      <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
        <Button label="Button" icon={<FormPrevious />} onClick={() => {}} />
        <Button label="Button" icon={<FormNext />} reverse onClick={() => {}} />
        <Button icon={<FormNext />} onClick={() => {}} />
      </Box>
      <Box direction={size !== 'small' ? 'row' : 'column'} gap="medium">
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
