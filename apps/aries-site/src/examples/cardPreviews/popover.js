import React from 'react';
import { Button, Box, Paragraph } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';

export const PopoverPreview = () => {
  return (
    <>
      <Button icon={<Info />} a11yTitle="informational help" tabIndex={-1} />
      <Box pad="xsmall" round="xxsmall" elevation="medium">
        <Paragraph size="small" margin="none">
          This is a popover
        </Paragraph>
      </Box>
    </>
  );
};
